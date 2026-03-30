import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

const SignIn = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const role = queryParams.get("role") || "company";

	const [identifier, setIdentifier] = useState("");
	const [loginMethod, setLoginMethod] = useState("otp"); // for experts
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const verifyOtp = async (email, token) => {
		const { data, error } = await supabase.auth.verifyOtp({
			email,
			token,
			type: "email",
		});

		if (error) {
			alert("Invalid OTP");
		} else {
			alert("Login successful");
		}
	};

	const handleSendOTP = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setMessage("");

		try {
			if (role === "company") {
				const searchValue = identifier.trim();
				console.log("🔍 Searching for:", `"${searchValue}"`);

				// 1. Get ALL rows to see if we can read the table at all
				const { data: allRows, error: allError } = await supabase
					.from("company_applications")
					.select("*");

				console.log("All rows in table:", allRows);
				console.log("Error fetching all rows:", allError);

				// 2. Try exact match on company_handle
				const { data, error } = await supabase
					.from("company_applications")
					.select("company_name, company_handle, gstin, admin_email")
					.eq("company_handle", searchValue)
					.maybeSingle();

				console.log("Exact match result:", data);
				console.log("Exact match error:", error);

				if (allError) throw allError;
				if (error) throw error;

				if (!data) {
					throw new Error(
						`No match found for "${searchValue}". Check console for all rows.`,
					);
				}

				const targetEmail = data.admin_email;
				if (!targetEmail) throw new Error("No admin email found.");

				const { error: otpError } = await supabase.auth.signInWithOtp({
					email: targetEmail
				});

				if (otpError) throw otpError;

				setMessage(`✅ OTP sent to ${targetEmail}`);
			} else {
				// Expert part remains same
				const { error: authError } = await supabase.auth.signInWithOtp({
					email: identifier,
					options: {
						emailRedirectTo: `${window.location.origin}/`,
						shouldCreateUser: false,
					},
				});

				if (authError) throw authError;
				setMessage(`✅ Sent to ${identifier}`);
			}
		} catch (err) {
			console.error("SignIn Error:", err);
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="form-container signin-container">
			<div className="form-header">
				<h2>Sign In as {role === "company" ? "Company" : "Expert"}</h2>
				<p>
					{role === "company"
						? "Enter your Company Handle or GSTIN"
						: "Enter your registered email"}
				</p>
			</div>

			<form onSubmit={handleSendOTP}>
				<div className="form-group">
					<label>
						{role === "company"
							? "Company Handle (@companyname) or GSTIN *"
							: "Registered Email Address *"}
					</label>
					<input
						type="text"
						className="form-control"
						placeholder={
							role === "company"
								? "@companyhandle or 29ABCDE1234F2Z5"
								: "you@example.com"
						}
						value={identifier}
						onChange={(e) => setIdentifier(e.target.value.trim())}
						required
					/>
				</div>

				{role === "expert" && (
					<div className="form-group">
						<label>Login Method</label>
						<div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
							<label>
								<input
									type="radio"
									name="method"
									value="otp"
									checked={loginMethod === "otp"}
									onChange={() => setLoginMethod("otp")}
								/>{" "}
								Send OTP
							</label>
							<label>
								<input
									type="radio"
									name="method"
									value="magiclink"
									checked={loginMethod === "magiclink"}
									onChange={() => setLoginMethod("magiclink")}
								/>{" "}
								Send Magic Link
							</label>
						</div>
					</div>
				)}

				{error && <span className="error-text">{error}</span>}
				{message && (
					<span className="valid-text" style={{ whiteSpace: "pre-line" }}>
						{message}
					</span>
				)}

				<div style={{ marginTop: "30px" }}>
					<button
						type="submit"
						className="btn-primary"
						style={{ width: "100%" }}
						disabled={loading || !identifier}
					>
						{loading
							? "SENDING..."
							: role === "company"
								? "SEND OTP"
								: loginMethod === "magiclink"
									? "SEND MAGIC LINK"
									: "SEND OTP"}
					</button>
				</div>
			</form>

			<p style={{ marginTop: "25px", textAlign: "center", fontSize: "0.9rem" }}>
				New here?{" "}
				<a
					href={role === "company" ? "/join-company" : "/join-expert"}
					style={{ color: "var(--primary-accent)" }}
				>
					Join as {role === "company" ? "Company" : "Expert"}
				</a>
			</p>
		</div>
	);
};

export default SignIn;
