import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import OTPBox from "../components/OTPBox";

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
	const [otp, setOtp] = useState("");
	const [showOtp, setShowOtp] = useState(false);
	const [resolvedEmail, setResolvedEmail] = useState("");

	const verifyOtp = async (otp) => {
		const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: resolvedEmail,
				otp,
				role,
			}),
		});

		const data = await res.json();

		if (res.ok) {
			localStorage.setItem("token", data.token);
			navigate("/dashboard");
		} else {
			setError(data.error);
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

				// 2. Try exact match on company_handle
				let query = supabase.from("company_applications").select("admin_email");

				if (searchValue.startsWith("@")) {
					query = query.eq("company_handle", searchValue);
				} else {
					query = query.eq("gstin", searchValue);
				}

				const { data, error } = await query.maybeSingle();

				console.log("Exact match result:", data);
				console.log("Exact match error:", error);

				if (error || !data) {
  throw new Error("Company not found");
}

				const targetEmail = data.admin_email;
setResolvedEmail(targetEmail);

				const res = await fetch("http://localhost:5000/api/auth/send-otp", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: targetEmail }),
});

const dataRes = await res.json();

if (!res.ok) throw new Error(dataRes.error);

				setMessage(`✅ OTP sent to ${targetEmail}`);
				setShowOtp(true);
			} else {
				// Expert part remains same
				// 👨‍💼 EXPERT LOGIN
				if (loginMethod === "otp") {
					// ✅ Use YOUR backend OTP
					const res = await fetch("http://localhost:5000/api/auth/send-otp", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email: identifier }),
					});

					const data = await res.json();

					if (!res.ok) throw new Error(data.error);

					setMessage(`✅ OTP sent to ${identifier}`);
					  setShowOtp(true);
				} else {
					// ✅ Use Supabase for magic link
					const { error } = await supabase.auth.signInWithOtp({
						email: identifier,
						options: {
							emailRedirectTo: window.location.origin,
						},
					});
				}
				  if (error) throw error;
				setMessage(`✅ Magic link sent to ${identifier}`);
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
						onChange={(e) => setIdentifier(e.target.value)}
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
			{showOtp && (
  <OTPBox
  email={role === "company" ? resolvedEmail : identifier}
    role={role}
    onSuccess={() => navigate("/dashboard")}
  />
)}
		</div>
		
	);
};

export default SignIn;
