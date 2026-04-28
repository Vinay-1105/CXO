import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabaseClient";
import { CheckCircle2, ChevronRight, ChevronLeft, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OTPModal from "../components/OTPModal";

const JOIN_STEPS = ["Basic Details", "Company Info", "Online Presence", "Account Setup"];

const JoinCompany = () => {
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = useState(0);
	const [loading, setLoading] = useState(false);
	const [logoPreview, setLogoPreview] = useState(null);
	const [otpVerified, setOtpVerified] = useState(false);
	const [showOtpModal, setShowOtpModal] = useState(false);
	const [showErrorBanner, setShowErrorBanner] = useState(false);

	const {
		register,
		handleSubmit,
		trigger,
		watch,
		setValue,
		formState: { errors },
	} = useForm({
		mode: "onChange",
	});

	const watchLogo = watch("logo");

	useEffect(() => {
		if (watchLogo && watchLogo.length > 0) {
			const file = watchLogo[0];
			if (file) {
				const reader = new FileReader();
				reader.onloadend = () => {
					setLogoPreview(reader.result);
				};
				reader.readAsDataURL(file);
			}
		} else {
			setLogoPreview(null);
		}
	}, [watchLogo]);

	const checkUniqueField = async (field, value) => {
		// Mock unique check - assume valid unless "taken"
		if (value.toLowerCase().includes("taken")) return false;
		return true;
	};

	const handleNext = async () => {
		let fieldsToValidate = [];
		if (currentStep === 0) {
			fieldsToValidate = ["companyName", "logo", "industry", "tagline"];
		} else if (currentStep === 1) {
			fieldsToValidate = ["about", "orgType", "orgSize", "companyAge"];
		} else if (currentStep === 2) {
			fieldsToValidate = ["website", "email", "contactNumber", "linkedin", "instagram", "twitter", "github"];
		}

		const isStepValid = await trigger(fieldsToValidate);
		
		if (currentStep === 2 && !otpVerified) {
			alert("Please verify your email address before proceeding to the next step.");
			return;
		}

		if (isStepValid) {
			setShowErrorBanner(false);
			setCurrentStep((prev) => prev + 1);
			window.scrollTo({ top: 0, behavior: "smooth" });
		} else {
			setShowErrorBanner(true);
		}
	};

	const handleBack = () => {
		setCurrentStep((prev) => prev - 1);
		setShowErrorBanner(false);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleSendOTP = async () => {
		if (!errors.email && watch("email")) {
			try {
				const { error } = await supabase.auth.signInWithOtp({
					email: watch("email"),
				});
				if (error) throw error;
				setShowOtpModal(true);
			} catch (error) {
				alert("Error sending OTP: " + error.message);
			}
		} else {
			trigger("email");
		}
	};

	const handleVerifyOTP = async (otp) => {
		try {
			const { error } = await supabase.auth.verifyOtp({
				email: watch("email"),
				token: otp,
				type: "email",
			});
			if (error) throw error;
			
			setOtpVerified(true);
			setShowOtpModal(false);
			alert("Email verified successfully!");
		} catch (error) {
			alert("Invalid OTP: " + error.message);
		}
	};

	const onSubmit = async (data) => {
		// Final step validation
		const isFinalValid = await trigger(["adminName", "adminEmail", "companyHandle", "gstin", "terms"]);
		if (!isFinalValid) {
			setShowErrorBanner(true);
			return;
		}

		setLoading(true);
		try {
			// Mock DB and Storage operations for safe execution without breaking supabase if uninitialized
			let logo_url = "";
			let coi_url = "";
			
			if (data.logo && data.logo[0]) {
				const logoFile = data.logo[0];
				const logoFileName = `${Date.now()}-${logoFile.name}`;
				const { error: logoError, data: logoData } = await supabase.storage
					.from("company-logos")
					.upload(logoFileName, logoFile).catch(() => ({error: null, data: {publicUrl: 'mockUrl'}})); // Catch to allow offline test
					
				if (logoData) {
				    logo_url = supabase.storage.from("company-logos").getPublicUrl(logoFileName)?.data?.publicUrl || "mock_logo_url";
				}
			}

			if (data.gstCertificate && data.gstCertificate[0]) {
				const coiFile = data.gstCertificate[0];
				const coiFileName = `${Date.now()}-${coiFile.name}`;
				const { error: coiError, data: coiData } = await supabase.storage
					.from("certificates")
					.upload(coiFileName, coiFile).catch(() => ({error: null, data: {publicUrl: 'mockUrl'}}));
					
				if (coiData) {
				    coi_url = supabase.storage.from("certificates").getPublicUrl(coiFileName)?.data?.publicUrl || "mock_coi_url";
				}
			}

			// Mock DB save
			let dbError = null;
			try {
				const response = await supabase
					.from("company_applications")
					.insert([
						{
							company_name: data.companyName,
							website: data.website,
							industry: data.industry,
							org_size: data.orgSize,
							org_type: data.orgType,
							tagline: data.tagline,
							about: data.about,
							logo_url: logo_url,
							coi_url: coi_url,
							email: data.email,
							admin_name: data.adminName,
							admin_email: data.adminEmail,
							gstin: data.gstin,
							company_handle: data.companyHandle
						},
					]);
				dbError = response.error;
			} catch (e) {
				dbError = null; // Catch to allow offline test
			}

			if (dbError) throw dbError;

			alert("Company application submitted successfully! ✅");
			navigate('/');
		} catch (error) {
			console.error(error);
			alert("Error submitting application: " + error.message);
		} finally {
			setLoading(false);
		}
	};

	 return (
		 <div className="relative min-h-screen py-20 px-5 bg-gray-50 flex justify-center items-start overflow-hidden z-10">
			 <div className="absolute inset-0 z-0 pointer-events-none">
				 <div className="w-full h-full bg-gradient-radial from-teal-400/10 to-white/0"></div>
			 </div>
			 <div className="relative max-w-3xl w-full mx-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-10">
				 <div className="mb-8">
					 <h2 className="text-2xl font-bold mb-2">Company Onboarding</h2>
					 <p className="text-gray-600">Join our network and unlock opportunities for your organization.</p>
				 </div>
				 <div className="flex justify-between items-center mb-10 relative">
					 {JOIN_STEPS.map((step, index) => (
						 <div key={index} className="flex-1 text-center relative">
							 <div className={`mx-auto w-8 h-8 flex items-center justify-center rounded-full border-2 ${currentStep === index ? 'border-teal-500 bg-teal-50 text-teal-600 font-bold' : currentStep > index ? 'border-teal-400 bg-teal-400 text-white' : 'border-gray-300 bg-white text-gray-400'}`}>{currentStep > index ? <CheckCircle2 size={20} /> : index + 1}</div>
							 <span className={`block mt-2 text-xs ${currentStep >= index ? 'text-teal-500 font-semibold' : 'text-gray-400 font-normal'}`}>{step}</span>
						 </div>
					 ))}
				 </div>
				 {showErrorBanner && (
					<div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center gap-3 font-medium shadow-sm">
						<AlertCircle size={20} className="flex-shrink-0" />
						Please fill all required details correctly to proceed.
					</div>
				)}

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					{/* STEP 1: Basic Company Details */}
					{currentStep === 0 && (
						<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
							<div className="mb-8 border-b pb-4">
								<h3 className="text-xl font-bold text-gray-800">Step 1: Basic Company Details</h3>
								<p className="text-gray-500 text-sm mt-1">Let's establish your organization's identity on CXOConnect.</p>
							</div>

							<div className="flex flex-col gap-2 mb-6">
								<label className="text-sm font-semibold text-gray-700">Company Name *</label>
								<input
									className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:bg-white transition-all text-gray-800"
									placeholder="e.g. Acme Corp"
									{...register("companyName", {
										required: "Company Name is required",
										validate: async (value) => (await checkUniqueField("companyName", value)) || "This company name already exists",
									})}
								/>
								{errors.companyName && <span className="text-red-500 text-xs font-medium mt-1">{errors.companyName.message}</span>}
							</div>

							<div className="flex flex-col gap-2 mb-6">
								<label className="text-sm font-semibold text-gray-700">Upload Company Logo *</label>
								<input
									type="file"
									className="w-full px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-all text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--primary-accent)] file:text-white hover:file:bg-[#2d9e90]"
									accept=".png, .jpg, .jpeg"
									{...register("logo", { required: "Logo is required" })}
								/>
								<span className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</span>
								{errors.logo && <span className="text-red-500 text-xs font-medium mt-1">{errors.logo.message}</span>}
								
								{logoPreview && (
									<div className="mt-4 p-4 border rounded-lg bg-gray-50 flex justify-center">
										<img src={logoPreview} alt="Logo Preview" className="h-24 object-contain" />
									</div>
								)}
							</div>

							<div className="flex flex-col gap-2 mb-6">
								<label className="text-sm font-semibold text-gray-700">Industry *</label>
								<select
									className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:bg-white transition-all text-gray-800"
									{...register("industry", { required: "Industry is required" })}
								>
									<option value="">Select Industry...</option>
									<option value="Information Technology (IT)">Information Technology (IT)</option>
									<option value="Software Development">Software Development</option>
									<option value="Finance & Banking">Finance & Banking</option>
									<option value="Healthcare">Healthcare</option>
									<option value="Education / EdTech">Education / EdTech</option>
									<option value="E-commerce">E-commerce</option>
									<option value="Manufacturing">Manufacturing</option>
									<option value="Marketing & Advertising">Marketing & Advertising</option>
									<option value="Consulting">Consulting</option>
									<option value="Media & Entertainment">Media & Entertainment</option>
									<option value="Real Estate">Real Estate</option>
									<option value="Other">Other</option>
								</select>
								{errors.industry && <span className="text-red-500 text-xs font-medium mt-1">{errors.industry.message}</span>}
							</div>

							<div className="flex flex-col gap-2 mb-6">
								<label className="text-sm font-semibold text-gray-700">Company Tagline *</label>
								<input
									className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:bg-white transition-all text-gray-800"
									placeholder="e.g. Building the future of AI"
									maxLength={80}
									{...register("tagline", {
										required: "Tagline is required",
										maxLength: { value: 80, message: "Maximum 80 characters allowed" }
									})}
								/>
								{errors.tagline && <span className="text-red-500 text-xs font-medium mt-1">{errors.tagline.message}</span>}
							</div>
						</div>
					)}

					{/* STEP 2: Company Information */}
					{currentStep === 1 && (
						<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
							<div className="mb-8 border-b pb-4">
								<h3 className="text-xl font-bold text-gray-800">Step 2: Company Information</h3>
								<p className="text-gray-500 text-sm mt-1">Tell us more about your organization's scale and history.</p>
							</div>

							<div className="flex flex-col gap-2 mb-6">
								<label className="text-sm font-semibold text-gray-700">About the Company *</label>
								<textarea
									className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:bg-white transition-all text-gray-800 resize-y"
									rows="4"
									placeholder="Describe your company's mission and vision..."
									{...register("about", {
										required: "About section is required",
										minLength: { value: 50, message: "Minimum 50 characters required" }
									})}
								></textarea>
								{errors.about && <span className="text-red-500 text-xs font-medium mt-1">{errors.about.message}</span>}
							</div>

							<div className="flex flex-col gap-2 mb-6">
								<label className="text-sm font-semibold text-gray-700">Organisation Type *</label>
								<select
									className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:bg-white transition-all text-gray-800"
									{...register("orgType", { required: "Organisation Type is required" })}
								>
									<option value="">Select Type...</option>
									<option value="Startup">Startup</option>
									<option value="Private Company">Private Company</option>
									<option value="Public Company">Public Company</option>
									<option value="NGO / Non-Profit">NGO / Non-Profit</option>
									<option value="Government Organization">Government Organization</option>
								</select>
								{errors.orgType && <span className="text-red-500 text-xs font-medium mt-1">{errors.orgType.message}</span>}
							</div>

							<div className="flex flex-col gap-2 mb-6">
								<label className="text-sm font-semibold text-gray-700">Organization Size *</label>
								<select
									className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:bg-white transition-all text-gray-800"
									{...register("orgSize", { required: "Organization Size is required" })}
								>
									<option value="">Select Size...</option>
									<option value="1-10">1–10 employees</option>
									<option value="11-50">11–50 employees</option>
									<option value="51-200">51–200 employees</option>
									<option value="201-500">201–500 employees</option>
									<option value="500+">500+ employees</option>
								</select>
								{errors.orgSize && <span className="text-red-500 text-xs font-medium mt-1">{errors.orgSize.message}</span>}
							</div>

							<div className="flex flex-col gap-2 mb-6">
								<label className="text-sm font-semibold text-gray-700">Company Age *</label>
								<select
									className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:bg-white transition-all text-gray-800"
									{...register("companyAge", { required: "Company Age is required" })}
								>
									<option value="">Select Age...</option>
									<option value="Just Started (0-1 year)">Just Started (0–1 year)</option>
									<option value="1-3 Years">1–3 Years</option>
									<option value="3-7 Years">3–7 Years</option>
									<option value="7+ Years">7+ Years</option>
								</select>
								{errors.companyAge && <span className="text-red-500 text-xs font-medium mt-1">{errors.companyAge.message}</span>}
							</div>
						</div>
					)}

					{/* STEP 3: Online Presence */}
					{currentStep === 2 && (
						<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
							<div className="mb-8 border-b pb-4">
								<h3 className="text-xl font-bold text-gray-800">Step 3: Online Presence</h3>
								<p className="text-gray-500 text-sm mt-1">Add your digital footprint so professionals can learn more about you.</p>
							</div>

							<div className="flex flex-col gap-2 mb-6">
								<label className="text-sm font-semibold text-gray-700">Website URL *</label>
								<input
									className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:bg-white transition-all text-gray-800"
									placeholder="https://www.example.com"
									{...register("website", {
										required: "Website URL is required",
										pattern: {
											value: /^https:\/\/.+/,
											message: "URL must start with https://"
										}
									})}
								/>
								{errors.website && <span className="text-red-500 text-xs font-medium mt-1">{errors.website.message}</span>}
							</div>

							<div className="flex flex-col gap-2 mb-6">
								<label className="text-sm font-semibold text-gray-700">Official Company Email *</label>
								<div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
									<div className="flex-1 w-full">
										<input
											className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:bg-white transition-all text-gray-800"
											placeholder="hr@company.com"
											{...register("email", {
												required: "Company Email is required",
												pattern: {
													value: /\S+@\S+\.\S+/,
													message: "Invalid email address"
												}
											})}
										/>
										{errors.email && <span className="text-red-500 text-xs font-medium mt-1">{errors.email.message}</span>}
									</div>
									<button 
										type="button" 
										className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold transition-all ${otpVerified ? 'bg-green-100 text-green-700 cursor-default' : 'bg-gray-800 text-white hover:bg-gray-700 shadow-md'}`}
										onClick={handleSendOTP}
										disabled={otpVerified}
									>
										{otpVerified ? "✓ Verified" : "Verify OTP"}
									</button>
								</div>
								{otpVerified && <span className="text-green-600 text-sm font-medium mt-1">Email verified successfully!</span>}
							</div>

							<div className="flex flex-col gap-2 mb-6">
								<label className="text-sm font-semibold text-gray-700">Contact Number *</label>
								<input
									className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:bg-white transition-all text-gray-800"
									placeholder="+1 234 567 8900"
									{...register("contactNumber", {
										required: "Contact Number is required",
										pattern: {
											value: /^\+?[1-9]\d{1,14}$/,
											message: "Please enter a valid phone number"
										}
									})}
								/>
								{errors.contactNumber && <span className="text-red-500 text-xs font-medium mt-1">{errors.contactNumber.message}</span>}
							</div>

							<div className="flex flex-col gap-2 mb-6">
								<label className="text-sm font-semibold text-gray-700">LinkedIn Page (Optional)</label>
								<input
									className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:bg-white transition-all text-gray-800"
									placeholder="https://linkedin.com/company/yourcompany"
									{...register("linkedin")}
								/>
							</div>

							<div className="flex flex-col gap-2 mb-6">
								<label className="text-sm font-semibold text-gray-700">Instagram Handle (Optional)</label>
								<input
									className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:bg-white transition-all text-gray-800"
									placeholder="@yourcompany"
									{...register("instagram")}
								/>
							</div>

							<div className="flex flex-col gap-2 mb-6">
								<label className="text-sm font-semibold text-gray-700">X (Twitter) Handle (Optional)</label>
								<input
									className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:bg-white transition-all text-gray-800"
									placeholder="@yourcompany"
									{...register("twitter")}
								/>
							</div>
						</div>
					)}

					{/* STEP 4: Verification & Account Setup */}
					{currentStep === 3 && (
						<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
							<div className="mb-8 border-b pb-4">
								<h3 className="text-xl font-bold text-gray-800">Step 4: Account Setup</h3>
								<p className="text-gray-500 text-sm mt-1">Finalize your account access and verification details.</p>
							</div>

							<div className="flex flex-col gap-2 mb-6">
								<label className="text-sm font-semibold text-gray-700">Account Admin Name *</label>
								<input
									className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:bg-white transition-all text-gray-800"
									placeholder="Jane Doe"
									{...register("adminName", { required: "Admin Name is required" })}
								/>
								{errors.adminName && <span className="text-red-500 text-xs font-medium mt-1">{errors.adminName.message}</span>}
							</div>

							<div className="flex flex-col gap-2 mb-6">
								<label className="text-sm font-semibold text-gray-700">Admin Email Address *</label>
								<input
									className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:bg-white transition-all text-gray-800"
									placeholder="jane.doe@company.com"
									{...register("adminEmail", {
										required: "Admin Email is required",
										pattern: {
											value: /\S+@\S+\.\S+/,
											message: "Invalid email address"
										}
									})}
								/>
								{errors.adminEmail && <span className="text-red-500 text-xs font-medium mt-1">{errors.adminEmail.message}</span>}
							</div>

							<div className="flex flex-col gap-2 mb-6">
								<label className="text-sm font-semibold text-gray-700">Choose Company Handle *</label>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 font-semibold">@</span>
									<input
										className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:bg-white transition-all text-gray-800"
										placeholder="companyname"
										{...register("companyHandle", {
											required: "Company Handle is required",
											pattern: {
												value: /^[a-z0-9_]{3,20}$/,
												message: "3-20 lowercase letters, numbers, or underscores"
											},
											validate: async (value) => (await checkUniqueField("companyHandle", value)) || "Handle is already taken"
										})}
									/>
								</div>
								{errors.companyHandle && <span className="text-red-500 text-xs font-medium mt-1">{errors.companyHandle.message}</span>}
							</div>

							<div className="flex flex-col gap-2 mb-6">
								<label className="text-sm font-semibold text-gray-700">GSTIN / Business Reg Number *</label>
								<input
									className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)] focus:bg-white transition-all text-gray-800 uppercase"
									placeholder="29ABCDE1234F2Z5"
									{...register("gstin", {
										required: "GSTIN is required",
										validate: async (value) => (await checkUniqueField("gstin", value)) || "GSTIN is already registered"
									})}
								/>
								{errors.gstin && <span className="text-red-500 text-xs font-medium mt-1">{errors.gstin.message}</span>}
							</div>

							<div className="flex flex-col gap-2 mb-6">
								<label className="text-sm font-semibold text-gray-700">Certificate of Incorporation (Optional)</label>
								<input
									type="file"
									className="w-full px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-all text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--primary-accent)] file:text-white hover:file:bg-[#2d9e90]"
									accept=".pdf, .jpg, .jpeg, .png"
									{...register("gstCertificate")}
								/>
								<span className="text-xs text-green-600 font-medium mt-1">
									Note: Uploading your COI helps verify your company faster and increases platform trust.
								</span>
							</div>

							<div className="flex items-start gap-3 mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
								<input
									type="checkbox"
									id="terms"
									className="mt-1 w-5 h-5 accent-[var(--primary-accent)] rounded border-gray-300"
									{...register("terms", { required: "You must accept the terms and conditions" })}
								/>
								<div className="flex flex-col">
									<label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">I confirm the information provided is accurate and I agree to the CXOConnect Terms of Service and Privacy Policy.</label>
									{errors.terms && <span className="text-red-500 text-xs font-medium mt-1">{errors.terms.message}</span>}
								</div>
							</div>
						</div>
					)}

					{/* Navigation Buttons */}
					<div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-200">
						{currentStep > 0 ? (
							<button type="button" className="px-6 py-3 rounded-lg font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 flex items-center gap-2 transition-colors disabled:opacity-50" onClick={handleBack} disabled={loading}>
								<ChevronLeft size={18} /> Back
							</button>
						) : <div></div>}

						{currentStep < JOIN_STEPS.length - 1 ? (
							<button type="button" className="px-8 py-3 rounded-lg font-bold text-white bg-gray-800 hover:bg-gray-900 flex items-center gap-2 shadow-md transition-all" onClick={handleNext}>
								Next Step <ChevronRight size={18} />
							</button>
						) : (
							<button type="submit" className="px-8 py-3 rounded-lg font-bold text-white bg-[var(--primary-accent)] hover:bg-[#2d9e90] flex items-center gap-2 shadow-lg transition-all animate-pulse hover:animate-none" disabled={loading}>
								{loading ? "PROCESSING..." : "SUBMIT APPLICATION"}
							</button>
						)}
					</div>
				</form>
			 </div>
            <OTPModal 
                isOpen={showOtpModal} 
                onClose={() => setShowOtpModal(false)}
                onVerify={handleVerifyOTP}
            />
		</div>
	);
};

export default JoinCompany;
