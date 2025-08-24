'use client';

import React, { useState, useEffect } from 'react';

const RegistrationForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		domain: '',
		registrationNumber: '',
		year: '',
		degree: '',
		subdomain: '',
		email: '',
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState({});
	const [message, setMessage] = useState('');

	// Pre-fill domain if selected from domain page
	useEffect(() => {
		const selectedDomain = sessionStorage.getItem('selectedDomain');
		if (selectedDomain) {
			setFormData((prev) => ({
				...prev,
				domain: selectedDomain,
			}));
			sessionStorage.removeItem('selectedDomain');
		}
	}, []);

	const subdomainOptions = {
		// Removed subdomain options as per request
	};

	const validateForm = () => {
		const newErrors = {};
		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
		const phoneRegex = /^\d{10}$/;

		if (!formData.name.trim()) newErrors.name = 'Name is required!';
		if (!formData.phone.trim()) {
			newErrors.phone = 'Phone number is required!';
		} else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
			newErrors.phone = 'Please enter a valid 10-digit phone number!';
		}
		if (!formData.email.trim()) {
			newErrors.email = 'Email address is required!';
		} else if (!emailRegex.test(formData.email.trim())) {
			newErrors.email = 'Please enter a valid email address';
		}
		if (!formData.registrationNumber.trim())
			newErrors.registrationNumber = 'Registration number is required!';
		if (!formData.year) newErrors.year = 'Please select your college year!';
		if (!formData.domain) newErrors.domain = 'Please choose your domain!';
		// Removed subdomain validation

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
			// Removed subdomain reset logic
		}));

		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: '',
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) return;

		setIsSubmitting(true);
		setMessage('');

		try {
			const response = await fetch('/api/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			const result = await response.json();

			if (response.ok) {
				setMessage(
					`🎉 Welcome to GCSRM, ${formData.name}! 🎉\n\nDomain: ${formData.domain}\nYear: ${formData.year}\nEmail: ${formData.email}\n\nYour adventure begins now! 🚀`
				);
				setFormData({
					name: '',
					phone: '',
					domain: '',
					registrationNumber: '',
					year: '',
					degree: '',
					subdomain: '',
					email: '',
				});
			} else {
				setMessage(`❌ Error: ${result.error}`);
			}
		} catch (error) {
			setMessage('❌ Network error. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	const inputClasses = (fieldName, hasValue = false) =>
		`w-full px-2 sm:px-3 py-2 sm:py-2.5 text-sm sm:text-base border-2 sm:border-3 rounded focus:outline-none focus:ring-2 transition-all ${
			hasValue ? 'text-black' : 'text-gray-500'
		} ${
			errors[fieldName]
				? 'border-red-500 focus:ring-red-400'
				: 'border-black focus:ring-blue-400'
		}`;

	return (
		<div
			id="registration-section"
			className="min-h-screen relative overflow-hidden flex items-center justify-center py-6 sm:py-8 lg:py-20 px-4 sm:px-6 lg:px-24"
			style={{ backgroundColor: '#33a1fd' }}>
			<style jsx>{`
				input::placeholder,
				select {
					color: #6b7280;
					opacity: 1;
				}
				@keyframes gentleFloat {
					0%,
					100% {
						transform: translateY(0px);
					}
					50% {
						transform: translateY(-8px);
					}
				}
				.animate-gentle-float {
					animation: gentleFloat 8s ease-in-out infinite;
				}
				input,
				select,
				button {
					min-height: 44px;
					font-size: 16px;
				}
			`}</style>

			{/* Floating Clouds */}
			<div className="absolute top-8 left-8 w-24 h-16 opacity-40 animate-gentle-float hidden sm:block">
				<div className="w-full h-full bg-white/30 rounded-full"></div>
			</div>
			<div
				className="absolute top-12 right-12 w-28 h-18 opacity-40 animate-gentle-float hidden sm:block"
				style={{ animationDelay: '2s' }}>
				<div className="w-full h-full bg-white/30 rounded-full"></div>
			</div>

			{/* Main Content */}
			<div className="text-center z-20 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl px-2 sm:px-4 -mt-8 sm:-mt-12 md:-mt-16">
				<div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
					<div className="bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-lg border-2 sm:border-3 md:border-4 border-black shadow-xl sm:shadow-2xl p-3 sm:p-4 md:p-5">
						<form
							onSubmit={handleSubmit}
							className="space-y-2 sm:space-y-3">
							{/* Name Field */}
							<div>
								<input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
									required
									className={inputClasses(
										'name',
										formData.name
									)}
									placeholder="Enter your full name"
								/>
								{errors.name && (
									<p className="text-red-600 text-xs font-bold mt-1">
										❌ {errors.name}
									</p>
								)}
							</div>

							{/* Phone Field */}
							<div>
								<input
									type="tel"
									name="phone"
									value={formData.phone}
									onChange={handleChange}
									required
									className={inputClasses(
										'phone',
										formData.phone
									)}
									placeholder="Enter your phone number"
								/>
								{errors.phone && (
									<p className="text-red-600 text-xs font-bold mt-1">
										❌ {errors.phone}
									</p>
								)}
							</div>

							{/* Email Field */}
							<div>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									required
									className={inputClasses(
										'email',
										formData.email
									)}
									placeholder="Enter your email address"
								/>
								{errors.email && (
									<p className="text-red-600 text-xs font-bold mt-1">
										❌ {errors.email}
									</p>
								)}
							</div>

							{/* Degree Field */}
							<div>
								<input
									type="text"
									name="degree"
									value={formData.degree}
									onChange={handleChange}
									className={inputClasses(
										'degree',
										formData.degree
									)}
									placeholder="Degree (e.g. B.Tech - CSE)"
								/>
								{errors.degree && (
									<p className="text-red-600 text-xs font-bold mt-1">
										❌ {errors.degree}
									</p>
								)}
							</div>

							{/* Registration Number Field */}
							<div>
								<input
									type="text"
									name="registrationNumber"
									value={formData.registrationNumber}
									onChange={handleChange}
									required
									className={inputClasses(
										'registrationNumber',
										formData.registrationNumber
									)}
									placeholder="Enter registration number"
								/>
								{errors.registrationNumber && (
									<p className="text-red-600 text-xs font-bold mt-1">
										❌ {errors.registrationNumber}
									</p>
								)}
							</div>

							{/* Year Field - Dropdown */}
							<div>
								<select
									name="year"
									value={formData.year}
									onChange={handleChange}
									required
									className={`w-full px-2 sm:px-3 py-2 sm:py-2.5 text-sm sm:text-base border-2 sm:border-3 rounded focus:outline-none focus:ring-2 transition-all ${
										errors.year
											? 'border-red-500 focus:ring-red-400'
											: 'border-black focus:ring-blue-400'
									}`}
									style={{ backgroundColor: '#f6c100' }}>
									<option value="">Select your year</option>
									<option value="1st Year">1st Year</option>
									<option value="2nd Year">2nd Year</option>
								</select>
								{errors.year && (
									<p className="text-red-600 text-xs font-bold mt-1">
										❌ {errors.year}
									</p>
								)}
							</div>

							{/* Domain Field - Dropdown */}
							<div>
								<select
									name="domain"
									value={formData.domain}
									onChange={handleChange}
									required
									className={`w-full px-2 sm:px-3 py-2 sm:py-2.5 text-sm sm:text-base border-2 sm:border-3 rounded focus:outline-none focus:ring-2 transition-all ${
										errors.domain
											? 'border-red-500 focus:ring-red-400'
											: 'border-black focus:ring-blue-400'
									}`}
									style={{ backgroundColor: '#f4bb00' }}>
									<option value="">Select your domain</option>
									<option value="Technical">Technical</option>
									<option value="Creative">Creative</option>
									<option value="Corporate">Corporate</option>
								</select>
								{errors.domain && (
									<p className="text-red-600 text-xs font-bold mt-1">
										❌ {errors.domain}
									</p>
								)}
							</div>

							{/* Submit Button */}
							<div className="pt-2">
								<button
									type="submit"
									disabled={isSubmitting}
									className={`w-full font-bold py-3 sm:py-3.5 px-4 rounded border-2 sm:border-3 border-black shadow-lg transition-all duration-200 text-sm sm:text-base ${
										isSubmitting
											? 'bg-gray-400 cursor-not-allowed'
											: 'bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 active:scale-95 transform hover:scale-105'
									}`}
									style={{
										fontFamily: 'Arial Black, sans-serif',
										minHeight: '44px',
									}}>
									{isSubmitting
										? 'JOINING...'
										: 'JOIN THE ADVENTURE!'}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>

			{/* Success/Error Message Modal */}
			{message && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
						<div className="text-center">
							<pre className="whitespace-pre-wrap text-sm text-gray-800 mb-4">
								{message}
							</pre>
							<button
								onClick={() => setMessage('')}
								className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors">
								Close
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Bottom Brick Ground */}
			<div
				className="absolute bottom-0 left-0 right-0 h-8 sm:h-12 md:h-16 z-5 bg-gradient-to-b from-amber-600 to-amber-800"
				style={{
					backgroundImage:
						'repeating-linear-gradient(90deg, transparent, transparent 32px, rgba(0,0,0,0.1) 32px, rgba(0,0,0,0.1) 34px)',
					backgroundSize: '32px 100%',
				}}
			/>
		</div>
	);
};

export default RegistrationForm;
