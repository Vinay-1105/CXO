import React from 'react';
import { useForm as useHookForm } from 'react-hook-form';

const JoinCompany = () => {
    const { register, handleSubmit, formState: { errors } } = useHookForm();

    const onSubmit = (data) => {
        console.log(data);
        alert('Company application submitted successfully!');
    };

    return (
        <div className="form-container">
            <div className="form-header">
                <h2>Company Application</h2>
                <p>Register your Startup, SME, or Enterprise to connect with top-tier talent.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Company Name *</label>
                    <input className="form-control" {...register("companyName", { required: "Company Name is required" })} />
                    {errors.companyName && <span className="error-text">{errors.companyName.message}</span>}
                </div>

                <div className="form-group">
                    <label>Website *</label>
                    <input className="form-control" placeholder="https://" {...register("website", {
                        required: "Website is required",
                        pattern: {
                            value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                            message: "Enter a valid URL"
                        }
                    })} />
                    {errors.website && <span className="error-text">{errors.website.message}</span>}
                </div>

                <div className="form-group">
                    <label>Industry *</label>
                    <select className="form-control" {...register("industry", { required: "Industry is required" })}>
                        <option value="">Select Industry...</option>
                        <option value=" فناوری اطلاعات (IT)">Technology / IT</option>
                        <option value="Finance">Finance & Banking</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Retail">Retail & E-commerce</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.industry && <span className="error-text">{errors.industry.message}</span>}
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label>Organization Size *</label>
                        <select className="form-control" {...register("orgSize", { required: "Organization Size is required" })}>
                            <option value="">Select Size...</option>
                            <option value="1-10">1-10 Employees</option>
                            <option value="11-50">11-50 Employees</option>
                            <option value="51-200">51-200 Employees</option>
                            <option value="201-500">201-500 Employees</option>
                            <option value="500+">500+ Employees</option>
                        </select>
                        {errors.orgSize && <span className="error-text">{errors.orgSize.message}</span>}
                    </div>

                    <div className="form-group" style={{ flex: 1 }}>
                        <label>Organization Type *</label>
                        <select className="form-control" {...register("orgType", { required: "Organization Type is required" })}>
                            <option value="">Select Type...</option>
                            <option value="Startup">Startup</option>
                            <option value="SME">SME</option>
                            <option value="Enterprise">Enterprise</option>
                            <option value="NGO">NGO / Non-Profit</option>
                        </select>
                        {errors.orgType && <span className="error-text">{errors.orgType.message}</span>}
                    </div>
                </div>

                <div className="form-group">
                    <label>Tagline</label>
                    <input className="form-control" {...register("tagline")} placeholder="A brief slogan for your company" />
                </div>

                <div className="form-group">
                    <label>About Company *</label>
                    <textarea className="form-control" rows="4" {...register("about", { required: "About section is required" })}></textarea>
                    {errors.about && <span className="error-text">{errors.about.message}</span>}
                </div>

                <div className="form-group">
                    <label>Company Logo *</label>
                    <input type="file" className="form-control" accept="image/*" {...register("logo", { required: "Logo is required" })} />
                    {errors.logo && <span className="error-text">{errors.logo.message}</span>}
                </div>

                <div className="form-group">
                    <label>Proof of Ownership / Certificate of Incorporation (CoI) *</label>
                    <input type="file" className="form-control" accept=".pdf,.png,.jpg,.jpeg" {...register("coi", { required: "Certificate of Incorporation is required" })} />
                    {errors.coi && <span className="error-text">{errors.coi.message}</span>}
                </div>

                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>SUBMIT APPLICATION</button>
                </div>
            </form>
        </div>
    );
};

export default JoinCompany;
