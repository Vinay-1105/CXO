import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
	isValidPhoneNumber,
	getCountries,
	getCountryCallingCode,
} from "libphonenumber-js/min";
import { supabase } from '@/lib/supabaseClient';
const JoinExpert = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
        reset
	} = useForm();
    const [loading, setLoading] = useState(false);

	// Custom Phone Validation State
	const [selectedCountry, setSelectedCountry] = useState("IN");
	const [phoneVal, setPhoneVal] = useState("");
	const [phoneError, setPhoneError] = useState("");

	const countries = getCountries()
		.map((country) => ({
			country,
			countryName: new Intl.DisplayNames(["en"], { type: "region" }).of(
				country,
			),
			callingCode: getCountryCallingCode(country),
		}))
		.sort((a, b) => a.countryName.localeCompare(b.countryName));

	const handlePhoneChange = (e) => {
		const val = e.target.value;
		setPhoneVal(val);

		// Attempt validation
		if (val) {
			try {
				const fullNumber = `+${getCountryCallingCode(selectedCountry)}${val}`;
				if (!isValidPhoneNumber(fullNumber, selectedCountry)) {
					// E.g. India requires 10 digits
					if (selectedCountry === "IN" && val.length !== 10) {
						setPhoneError(
							"In India, the mobile number must be exactly 10 digits long.",
						);
					} else {
						setPhoneError("Phone number is invalid for the selected country.");
					}
				} else {
					setPhoneError(""); // Valid
				}
			} catch (err) {
				setPhoneError("Phone number format is wrong.");
			}
		} else {
			setPhoneError("Phone number is required");
		}
	};

	const onSubmit = async (data) => {
		setLoading(true);

		try {
			// Re-verify phone (your existing code)
			const fullNumber = `+${getCountryCallingCode(selectedCountry)}${phoneVal}`;
			if (!isValidPhoneNumber(fullNumber, selectedCountry)) {
				setPhoneError("Please fix the phone number before submitting.");
				return;
			}

			// 1. Upload Resume
			const resumeFile = data.resume[0];
			const resumeFileName = `${Date.now()}-${resumeFile.name}`;
			const { error: resumeError } = await supabase.storage
				.from("resumes")
				.upload(resumeFileName, resumeFile);

			if (resumeError) throw resumeError;

			const resume_url = supabase.storage
				.from("resumes")
				.getPublicUrl(resumeFileName).data.publicUrl;

			// 2. Save to database
			const { error: dbError } = await supabase
				.from("expert_applications")
				.insert([
					{
						full_name: data.fullName,
						email: data.email,
						phone: fullNumber,
						linkedin: data.linkedin,
						role: data.role,
						experience: parseInt(data.experience),
						resume_url: resume_url,
					},
				]);

			if (dbError) throw dbError;

			alert("Expert profile submitted for verification! ✅");
			reset();
		} catch (error) {
			console.error(error);
			alert("Error submitting profile: " + error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="form-container">
			<div className="form-header">
				<h2>Expert Professional Application</h2>
				<p>Join the premier network for CXOs, Directors, PMOs, and Advisors.</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form-group">
					<label>Full Name *</label>
					<input
						className="form-control"
						{...register("fullName", { required: "Name is required" })}
					/>
					{errors.fullName && (
						<span className="error-text">{errors.fullName.message}</span>
					)}
				</div>

				<div className="form-group">
					<label>Email Address *</label>
					<input
						type="email"
						className="form-control"
						{...register("email", {
							required: "Email is required",
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: "invalid email address",
							},
						})}
					/>
					{errors.email && (
						<span className="error-text">{errors.email.message}</span>
					)}
				</div>

				<div className="form-group">
					<label>Phone Number *</label>
					<div className="phone-input-group">
						<select
							className="form-control phone-code"
							value={selectedCountry}
							onChange={(e) => {
								setSelectedCountry(e.target.value);
								setPhoneError(""); // reset error on country switch
							}}
						>
							{countries.map((c) => (
								<option key={c.country} value={c.country}>
									{c.country} (+{c.callingCode})
								</option>
							))}
						</select>
						<input
							type="tel"
							className="form-control phone-number"
							placeholder="Enter phone number..."
							value={phoneVal}
							onChange={handlePhoneChange}
						/>
					</div>
					{phoneError && (
						<div
							className="error-text"
							style={{ position: "relative", marginTop: "5px" }}
						>
							{phoneError}
						</div>
					)}
				</div>

				<div className="form-group" style={{ marginTop: "30px" }}>
					<label>LinkedIn Profile URL *</label>
					<input
						className="form-control"
						placeholder="https://linkedin.com/in/..."
						{...register("linkedin", {
							required: "LinkedIn URL is required to verify your profile",
						})}
					/>
					{errors.linkedin && (
						<span className="error-text">{errors.linkedin.message}</span>
					)}
				</div>

				<div className="form-group">
					<label>Professional Role / Title *</label>
					<select
						className="form-control"
						{...register("role", { required: "Role is required" })}
					>
						<option value="">Select Role...</option>
						<option value="CEO">Chief Executive Officer (CEO)</option>
						<option value="CTO">Chief Technology Officer (CTO)</option>
						<option value="CFO">Chief Financial Officer (CFO)</option>
						<option value="CMO">Chief Marketing Officer (CMO)</option>
						<option value="Director">Director</option>
						<option value="PMO">PMO Lead / Project Manager</option>
						<option value="Advisor">Advisor / Consultant</option>
					</select>
					{errors.role && (
						<span className="error-text">{errors.role.message}</span>
					)}
				</div>

				<div className="form-group">
					<label>Years of Experience *</label>
					<input
						type="number"
						className="form-control"
						min="0"
						{...register("experience", {
							required: "Experience is required",
							min: {
								value: 5,
								message:
									"We typically require senior professionals with 5+ years experience.",
							},
						})}
					/>
					{errors.experience && (
						<span className="error-text">{errors.experience.message}</span>
					)}
				</div>

				<div className="form-group">
					<label>Resume / CV *</label>
					<input
						type="file"
						className="form-control"
						accept=".pdf,.doc,.docx"
						{...register("resume", {
							required: "Resume is required for profile vetting",
						})}
					/>
					<small style={{ color: "#666", marginTop: "5px", display: "block" }}>
						Max file size: 5MB
					</small>
					{errors.resume && (
						<span className="error-text">{errors.resume.message}</span>
					)}
				</div>

				<div style={{ textAlign: "center", marginTop: "40px" }}>
					<button
						type="submit"
						className="btn-primary"
						style={{ width: "100%" }}
						disabled={loading}
					>
						{loading ? "SUBMITTING..." : "SUBMIT PROFILE FOR VERIFICATION"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default JoinExpert;
