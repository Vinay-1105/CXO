import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabaseClient";
import { CheckCircle2, ChevronRight, ChevronLeft, AlertCircle } from "lucide-react";
import "./JoinExpert.css";
import { useNavigate } from "react-router-dom";

const JOIN_STEPS = ["Basic Info", "Background", "Expertise", "Portfolio", "Account Setup"];

const JoinExpert = () => {
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = useState(0);
	const [loading, setLoading] = useState(false);
	const [profilePreview, setProfilePreview] = useState(null);
	const [otpVerified, setOtpVerified] = useState(false);
	const [showErrorBanner, setShowErrorBanner] = useState(false);
	const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: "", colorClass: "" });

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

	const watchProfilePic = watch("profilePicture");
	const watchPassword = watch("password");

	useEffect(() => {
		if (watchProfilePic && watchProfilePic.length > 0) {
			const file = watchProfilePic[0];
			if (file) {
				const reader = new FileReader();
				reader.onloadend = () => {
					setProfilePreview(reader.result);
				};
				reader.readAsDataURL(file);
			}
		} else {
			setProfilePreview(null);
		}
	}, [watchProfilePic]);

	useEffect(() => {
		if (watchPassword) {
			calculatePasswordStrength(watchPassword);
		} else {
			setPasswordStrength({ score: 0, text: "", colorClass: "" });
		}
	}, [watchPassword]);

	const calculatePasswordStrength = (pwd) => {
		let score = 0;
		if (pwd.length >= 8) score += 1;
		if (/[A-Z]/.test(pwd)) score += 1;
		if (/[0-9]/.test(pwd)) score += 1;
		if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

		if (score === 0 || score === 1) setPasswordStrength({ score, text: "Weak", colorClass: "weak" });
		else if (score === 2) setPasswordStrength({ score, text: "Fair", colorClass: "fair" });
		else if (score === 3) setPasswordStrength({ score, text: "Good", colorClass: "good" });
		else if (score === 4) setPasswordStrength({ score, text: "Strong", colorClass: "strong" });
	};

	const checkUniqueField = async (field, value) => {
		// Mock unique check
		if (value.toLowerCase().includes("taken")) return false;
		return true;
	};

	const handleNext = async () => {
		let fieldsToValidate = [];
		if (currentStep === 0) {
			fieldsToValidate = ["fullName", "profilePicture", "headline", "primaryDomain"];
		} else if (currentStep === 1) {
			fieldsToValidate = ["yearsOfExperience", "currentRole", "currentCompany", "previousExperience"];
		} else if (currentStep === 2) {
			fieldsToValidate = ["keySkills", "toolsTechnologies", "servicesOffered", "hourlyRate"];
		} else if (currentStep === 3) {
            fieldsToValidate = ["portfolioWebsite", "linkedin", "github", "resume", "workSamples"];
        }

		const isStepValid = await trigger(fieldsToValidate);
		
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

	const handleSendOTP = () => {
		if (!errors.email && watch("email")) {
			alert("OTP sent to your email!");
			setTimeout(() => {
				setOtpVerified(true);
				alert("Email verified successfully!");
			}, 1500);
		} else {
			trigger("email");
		}
	};

	const onSubmit = async (data) => {
		const isFinalValid = await trigger(["email", "phone", "password", "confirmPassword", "govId", "terms"]);
		if (!isFinalValid) {
			setShowErrorBanner(true);
			return;
		}

		setLoading(true);
		try {
			let profile_url = "";
			let resume_url = "";
            let gov_id_url = "";
			
			if (data.profilePicture && data.profilePicture[0]) {
				const file = data.profilePicture[0];
				const fileName = `${Date.now()}-${file.name}`;
				const { data: fileData } = await supabase.storage
					.from("expert-profiles")
					.upload(fileName, file).catch(() => ({data: {publicUrl: 'mockUrl'}}));
					
				if (fileData) {
				    profile_url = supabase.storage.from("expert-profiles").getPublicUrl(fileName)?.data?.publicUrl || "mock_profile_url";
				}
			}

			if (data.resume && data.resume[0]) {
				const file = data.resume[0];
				const fileName = `${Date.now()}-${file.name}`;
				const { data: fileData } = await supabase.storage
					.from("expert-resumes")
					.upload(fileName, file).catch(() => ({data: {publicUrl: 'mockUrl'}}));
					
				if (fileData) {
				    resume_url = supabase.storage.from("expert-resumes").getPublicUrl(fileName)?.data?.publicUrl || "mock_resume_url";
				}
			}

            if (data.govId && data.govId[0]) {
				const file = data.govId[0];
				const fileName = `${Date.now()}-${file.name}`;
				const { data: fileData } = await supabase.storage
					.from("expert-verification")
					.upload(fileName, file).catch(() => ({data: {publicUrl: 'mockUrl'}}));
					
				if (fileData) {
				    gov_id_url = supabase.storage.from("expert-verification").getPublicUrl(fileName)?.data?.publicUrl || "mock_govid_url";
				}
			}

			// Mock DB save
			const { error: dbError } = await supabase
				.from("expert_applications")
				.insert([
					{
						full_name: data.fullName,
                        headline: data.headline,
                        primary_domain: data.primaryDomain,
                        years_experience: data.yearsOfExperience,
                        current_role: data.currentRole,
                        current_company: data.currentCompany,
                        key_skills: data.keySkills,
                        services_offered: data.servicesOffered,
                        hourly_rate: data.hourlyRate,
						email: data.email,
                        phone: data.phone,
						profile_url: profile_url,
						resume_url: resume_url,
						gov_id_url: gov_id_url
					},
				]).catch(() => ({error: null})); 

			if (dbError) throw dbError;

			alert("Expert application submitted successfully! 🎉\nWelcome to CXOConnect.");
			navigate('/');
		} catch (error) {
			console.error(error);
			alert("Error submitting application: " + error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="wizard-page-wrapper">
			<div className="wizard-container">
				<div className="form-header">
					<h2>Expert Onboarding</h2>
					<p>Join our premium network of verified professionals and unlock fractional, full-time, and advisory opportunities.</p>
				</div>

				<div className="wizard-progress">
					{JOIN_STEPS.map((step, index) => (
						<div key={index} style={{ textAlign: "center", flex: 1, position: "relative" }}>
							<div
								className={`progress-step ${currentStep === index ? "active" : ""} ${currentStep > index ? "completed" : ""}`}
								style={{ margin: "0 auto" }}
							>
								{currentStep > index ? <CheckCircle2 size={20} /> : index + 1}
							</div>
							<span style={{ fontSize: "0.85rem", marginTop: "10px", display: "block", color: currentStep >= index ? "var(--primary-accent)" : "#94a3b8", fontWeight: currentStep >= index ? "600" : "400", transition: "all 0.3s" }}>
								{step}
							</span>
						</div>
					))}
				</div>

				{showErrorBanner && (
					<div className="error-banner">
						<AlertCircle size={20} />
						Please fill all required details correctly to proceed.
					</div>
				)}

				<form onSubmit={handleSubmit(onSubmit)}>
					{/* STEP 1: Basic Information */}
					{currentStep === 0 && (
						<div className="wizard-step">
							<div className="step-header">
								<h3>Step 1: Basic Information</h3>
								<p>Let's start by capturing your professional identity.</p>
							</div>

							<div className="form-group">
								<label>Full Name *</label>
								<input
									className="form-control"
									placeholder="John Doe"
									{...register("fullName", { required: "Full Name is required" })}
								/>
								{errors.fullName && <span className="error-text">{errors.fullName.message}</span>}
							</div>

							<div className="form-group">
								<label>Upload Profile Picture *</label>
								<input
									type="file"
									className="form-control"
									accept=".png, .jpg, .jpeg"
									{...register("profilePicture", { required: "Profile Picture is required" })}
								/>
								<span style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "4px", display: "block" }}>Professional headshot recommended (PNG, JPG up to 2MB)</span>
								{errors.profilePicture && <span className="error-text">{errors.profilePicture.message}</span>}
								
								{profilePreview && (
									<div className="logo-preview-container" style={{ borderRadius: "50%" }}>
										<img src={profilePreview} alt="Profile Preview" />
									</div>
								)}
							</div>

                            <div className="form-group">
								<label>Professional Headline *</label>
								<input
									className="form-control"
									placeholder="e.g. Full Stack Developer | React | Node.js"
									maxLength={100}
									{...register("headline", {
										required: "Headline is required",
										maxLength: { value: 100, message: "Maximum 100 characters allowed" }
									})}
								/>
								{errors.headline && <span className="error-text">{errors.headline.message}</span>}
							</div>

							<div className="form-group">
								<label>Primary Domain / Expertise *</label>
								<select
									className="form-control"
									{...register("primaryDomain", { required: "Domain is required" })}
								>
									<option value="">Select Domain...</option>
									<option value="Software Development">Software Development</option>
									<option value="Data Science / AI / ML">Data Science / AI / ML</option>
									<option value="Cybersecurity">Cybersecurity</option>
									<option value="Cloud Computing">Cloud Computing</option>
									<option value="UI/UX Design">UI/UX Design</option>
									<option value="Marketing / Digital Marketing">Marketing / Digital Marketing</option>
									<option value="Finance / Consulting">Finance / Consulting</option>
									<option value="Product Management">Product Management</option>
									<option value="Content Writing">Content Writing</option>
                                    <option value="Legal / Compliance">Legal / Compliance</option>
									<option value="Other">Other</option>
								</select>
								{errors.primaryDomain && <span className="error-text">{errors.primaryDomain.message}</span>}
							</div>
						</div>
					)}

					{/* STEP 2: Professional Background */}
					{currentStep === 1 && (
						<div className="wizard-step">
							<div className="step-header">
								<h3>Step 2: Professional Background</h3>
								<p>Tell companies about your recent roles and overall experience.</p>
							</div>

							<div className="form-group">
								<label>Years of Experience *</label>
								<select
									className="form-control"
									{...register("yearsOfExperience", { required: "Years of Experience is required" })}
								>
									<option value="">Select Experience...</option>
									<option value="0-1 years">0–1 years</option>
									<option value="1-3 years">1–3 years</option>
									<option value="3-5 years">3–5 years</option>
									<option value="5-10 years">5–10 years</option>
									<option value="10+ years">10+ years</option>
								</select>
								{errors.yearsOfExperience && <span className="error-text">{errors.yearsOfExperience.message}</span>}
							</div>

                            <div className="form-group">
								<label>Current Role / Job Title *</label>
								<input
									className="form-control"
									placeholder="e.g. Senior Software Engineer"
									{...register("currentRole", { required: "Current Role is required" })}
								/>
								{errors.currentRole && <span className="error-text">{errors.currentRole.message}</span>}
							</div>

                            <div className="form-group">
								<label>Current Company / Organization *</label>
								<input
									className="form-control"
									placeholder="e.g. Acme Corp (or Independent Consultant)"
									{...register("currentCompany", { required: "Current Company is required" })}
								/>
								{errors.currentCompany && <span className="error-text">{errors.currentCompany.message}</span>}
							</div>

							<div className="form-group">
								<label>Previous Experience (Optional)</label>
								<textarea
									className="form-control"
									rows="4"
									placeholder="Briefly highlight your past roles, major achievements, etc..."
									{...register("previousExperience")}
								></textarea>
							</div>
						</div>
					)}

					{/* STEP 3: Skills & Expertise */}
					{currentStep === 2 && (
						<div className="wizard-step">
							<div className="step-header">
								<h3>Step 3: Skills & Expertise</h3>
								<p>Highlight the specific skills and services you can offer.</p>
							</div>

                            <div className="form-group">
								<label>Key Skills (Separate with commas) *</label>
								<input
									className="form-control"
									placeholder="e.g. React, Python, Product Strategy"
									{...register("keySkills", {
										required: "Key skills are required",
                                        validate: (val) => {
                                            const skills = val.split(',').map(s => s.trim()).filter(s => s.length > 0);
                                            return skills.length >= 3 || "Please provide at least 3 skills separated by commas";
                                        }
									})}
								/>
								{errors.keySkills && <span className="error-text">{errors.keySkills.message}</span>}
							</div>

                            <div className="form-group">
								<label>Tools & Technologies (Optional)</label>
								<input
									className="form-control"
									placeholder="e.g. Figma, Docker, TensorFlow, Jira"
									{...register("toolsTechnologies")}
								/>
							</div>

                            <div className="form-group">
								<label>Services Offered (Select all that apply) *</label>
                                <div className="checkbox-grid">
                                    <div className="form-group checkbox-group">
                                        <input type="checkbox" id="srv_mentorship" value="Mentorship" {...register("servicesOffered", { required: "Select at least one service" })} />
                                        <label htmlFor="srv_mentorship">Mentorship</label>
                                    </div>
                                    <div className="form-group checkbox-group">
                                        <input type="checkbox" id="srv_freelancing" value="Freelancing" {...register("servicesOffered")} />
                                        <label htmlFor="srv_freelancing">Freelancing</label>
                                    </div>
                                    <div className="form-group checkbox-group">
                                        <input type="checkbox" id="srv_consulting" value="Consulting" {...register("servicesOffered")} />
                                        <label htmlFor="srv_consulting">Consulting</label>
                                    </div>
                                    <div className="form-group checkbox-group">
                                        <input type="checkbox" id="srv_fulltime" value="Full-time Opportunities" {...register("servicesOffered")} />
                                        <label htmlFor="srv_fulltime">Full-time Opportunities</label>
                                    </div>
                                    <div className="form-group checkbox-group">
                                        <input type="checkbox" id="srv_contract" value="Contract Work" {...register("servicesOffered")} />
                                        <label htmlFor="srv_contract">Contract Work</label>
                                    </div>
                                </div>
								{errors.servicesOffered && <span className="error-text">{errors.servicesOffered.message}</span>}
							</div>

                            <div className="form-group">
								<label>Hourly Rate / Pricing (Optional)</label>
								<input
									className="form-control"
									placeholder="e.g. $100/hr or Negotiable"
									{...register("hourlyRate")}
								/>
							</div>
						</div>
					)}

                    {/* STEP 4: Online Presence & Portfolio */}
					{currentStep === 3 && (
						<div className="wizard-step">
							<div className="step-header">
								<h3>Step 4: Online Presence & Portfolio</h3>
								<p>Showcase your previous work, profiles, and resume.</p>
							</div>

							<div className="form-group">
								<label>Portfolio Website (Optional)</label>
								<input
									className="form-control"
									placeholder="https://www.yourportfolio.com"
									{...register("portfolioWebsite", {
										pattern: {
											value: /^https:\/\/.+/,
											message: "Must be a valid URL starting with https://"
										}
									})}
								/>
								{errors.portfolioWebsite && <span className="error-text">{errors.portfolioWebsite.message}</span>}
							</div>

							<div className="form-group">
								<label>LinkedIn Profile URL (Optional)</label>
								<input
									className="form-control"
									placeholder="https://linkedin.com/in/yourprofile"
									{...register("linkedin")}
								/>
							</div>

							<div className="form-group">
								<label>GitHub / Behance / Dribbble URL (Optional)</label>
								<input
									className="form-control"
									placeholder="https://github.com/yourusername"
									{...register("github")}
								/>
							</div>

                            <div className="form-group">
								<label>Resume Upload (PDF) *</label>
								<input
									type="file"
									className="form-control"
									accept=".pdf"
									{...register("resume", { required: "Resume upload is required" })}
								/>
								{errors.resume && <span className="error-text">{errors.resume.message}</span>}
							</div>

                            <div className="form-group">
								<label>Work Samples / Projects (Optional)</label>
								<textarea
									className="form-control"
									rows="3"
									placeholder="Share links or brief descriptions of notable projects..."
									{...register("workSamples")}
								></textarea>
							</div>
						</div>
					)}

					{/* STEP 5: Verification & Account Setup */}
					{currentStep === 4 && (
						<div className="wizard-step">
							<div className="step-header">
								<h3>Step 5: Account Setup</h3>
								<p>Finalize your account access and verification details.</p>
							</div>

							<div className="form-group">
								<label>Email Address *</label>
								<div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
									<div style={{ flex: 1 }}>
										<input
											className="form-control"
											placeholder="you@example.com"
											{...register("email", {
												required: "Email is required",
												pattern: {
													value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
													message: "Invalid email address"
												},
                                                validate: async (value) => (await checkUniqueField("email", value)) || "This email is already in use",
											})}
										/>
										{errors.email && <span className="error-text">{errors.email.message}</span>}
									</div>
									<button 
										type="button" 
										className="otp-btn"
										style={{ marginTop: 0, padding: "14px 20px" }}
										onClick={handleSendOTP}
										disabled={otpVerified}
									>
										{otpVerified ? "✓ Verified" : "Verify OTP"}
									</button>
								</div>
								{otpVerified && <span className="valid-text">Email verified successfully!</span>}
							</div>

                            <div className="form-group">
								<label>Phone Number *</label>
								<input
									className="form-control"
									placeholder="+1 234 567 8900"
									{...register("phone", {
                                        required: "Phone number is required",
										pattern: {
											value: /^\+?[1-9]\d{1,14}$/,
											message: "Please enter a valid phone number"
										}
									})}
								/>
								{errors.phone && <span className="error-text">{errors.phone.message}</span>}
							</div>

							<div style={{ display: "flex", gap: "20px" }}>
								<div className="form-group" style={{ flex: 1 }}>
									<label>Create Password *</label>
									<input
										type="password"
										className="form-control"
										placeholder="••••••••"
										{...register("password", {
											required: "Password is required",
											pattern: {
												value: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
												message: "Requires min 8 chars, 1 uppercase, 1 number, 1 special char"
											}
										})}
									/>
									{watchPassword && (
										<div className="password-strength-container">
											{[1, 2, 3, 4].map((level) => (
												<div key={level} className={`strength-bar ${passwordStrength.score >= level ? passwordStrength.colorClass : ""}`}></div>
											))}
										</div>
									)}
									{watchPassword && <span className="password-strength-text" style={{ color: `var(--${passwordStrength.colorClass})` }}>Strength: {passwordStrength.text}</span>}
									{errors.password && <span className="error-text">{errors.password.message}</span>}
								</div>

								<div className="form-group" style={{ flex: 1 }}>
									<label>Confirm Password *</label>
									<input
										type="password"
										className="form-control"
										placeholder="••••••••"
										{...register("confirmPassword", {
											required: "Please confirm password",
											validate: (val) => val === watchPassword || "Passwords do not match"
										})}
									/>
									{errors.confirmPassword && <span className="error-text">{errors.confirmPassword.message}</span>}
								</div>
							</div>

							<div className="form-group">
								<label>Government ID Upload (Optional)</label>
								<input
									type="file"
									className="form-control"
									accept=".pdf, .jpg, .jpeg, .png"
									{...register("govId")}
								/>
								<span style={{ fontSize: "0.8rem", color: "#10b981", marginTop: "4px", display: "block" }}>
									Note: Uploading a valid ID helps verify your profile and increases trust rating.
								</span>
							</div>

							<div className="form-group checkbox-group" style={{ marginTop: "30px" }}>
								<input
									type="checkbox"
									id="terms"
									{...register("terms", { required: "You must accept the terms and conditions" })}
								/>
								<label htmlFor="terms">I confirm the information provided is accurate and I agree to the CXOConnect Terms of Service and Privacy Policy.</label>
							</div>
							{errors.terms && <span className="error-text" style={{ marginLeft: "25px" }}>{errors.terms.message}</span>}
						</div>
					)}

					{/* Navigation Buttons */}
					<div className="wizard-buttons">
						{currentStep > 0 ? (
							<button type="button" className="btn-wizard btn-back" onClick={handleBack} disabled={loading}>
								<ChevronLeft size={18} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} /> Back
							</button>
						) : <div></div>}

						{currentStep < JOIN_STEPS.length - 1 ? (
							<button type="button" className="btn-wizard btn-next" onClick={handleNext}>
								Next <ChevronRight size={18} style={{ display: "inline", verticalAlign: "middle", marginLeft: "4px" }} />
							</button>
						) : (
							<button type="submit" className="btn-wizard btn-submit" disabled={loading}>
								{loading ? "PROCESSING..." : "FINISH REGISTRATION"}
							</button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

export default JoinExpert;
