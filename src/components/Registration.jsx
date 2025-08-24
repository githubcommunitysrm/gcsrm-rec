'use client';

import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';

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

	const validateForm = () => {
		const newErrors = {};
		const emailRegex = /^[a-zA-Z]{2}\d{4}@srmist\.edu\.in$/;
		const phoneRegex = /^\d{10}$/;
		const raRegex = /^RA\w{13}$/;

		if (!formData.name.trim()) newErrors.name = 'Name is required!';
		if (!formData.phone.trim()) {
			newErrors.phone = 'Phone number is required!';
		} else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
			newErrors.phone = 'Please enter a valid 10-digit phone number!';
		}
		if (!formData.email.trim()) {
			newErrors.email = 'Email address is required!';
		} else if (!emailRegex.test(formData.email.trim())) {
			newErrors.email = 'Please enter a SRM email address';
		}
		if (!formData.registrationNumber.trim()) {
			newErrors.registrationNumber = 'Registration number is required!';
		} else if (!raRegex.test(formData.registrationNumber.trim())) {
			newErrors.registrationNumber =
				'Please enter a valid registration number (Format: RA24XXXXXXXX or RA25XXXXXXXX)!';
		}
		if (!formData.year) newErrors.year = 'Please select your college year!';
		if (!formData.domain) newErrors.domain = 'Please choose your domain!';

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
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

		if (!validateForm()) {
			toast.error('Please fix the errors before submitting!');
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await fetch('/api/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			const result = await response.json();

			if (response.ok) {
				toast.success(
					`🎉 Welcome to GCSRM, ${formData.name}! Your adventure begins now! 🚀`,
					{
						duration: 6000,
						style: {
							background: '#10b981',
							color: '#fff',
							fontSize: '16px',
							fontWeight: 'bold',
						},
					}
				);
				setFormData({
					name: '',
					phone: '',
					domain: '',
					registrationNumber: '',
					year: '',
					degree: '',
					email: '',
				});
			} else {
				toast.error(`Registration failed: ${result.error}`, {
					duration: 5000,
					style: {
						background: '#ef4444',
						color: '#fff',
						fontSize: '16px',
					},
				});
			}
		} catch (error) {
			toast.error('Network error. Please try again.', {
				duration: 5000,
				style: {
					background: '#ef4444',
					color: '#fff',
					fontSize: '16px',
				},
			});
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
				@keyframes cloudFloat {
					0% {
						transform: translateY(0);
					}
					50% {
						transform: translateY(-18px);
					}
					100% {
						transform: translateY(0);
					}
				}
				.cloud-float {
					animation: cloudFloat 4s ease-in-out infinite;
				}
				.cloud-float-delayed {
					animation: cloudFloat 4s ease-in-out infinite;
					animation-delay: 2s;
				}
				input,
				select,
				button {
					min-height: 44px;
					font-size: 16px;
				}
			`}</style>

			{/* Floating Clouds - Responsive positioning with better mobile spacing */}
			<div className="absolute top-8 left-2 sm:top-12 sm:left-8 md:top-16 md:left-16 w-32 sm:w-40 md:w-48 h-20 sm:h-26 md:h-32 opacity-90 cloud-float">
				<Image
					src="/cloud-1.png"
					alt="Cloud"
					fill
					className="object-contain"
				/>
			</div>
			<div className="absolute top-12 right-2 sm:top-18 sm:right-12 md:top-24 md:right-20 w-36 sm:w-44 md:w-52 h-24 sm:h-30 md:h-36 opacity-90 cloud-float-delayed">
				<Image
					src="/cloud-2.png"
					alt="Cloud"
					fill
					className="object-contain"
				/>
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

			{/* Toast Notifications */}
			<Toaster
				position="top-center"
				reverseOrder={false}
				gutter={8}
				containerClassName=""
				containerStyle={{}}
				toastOptions={{
					// Define default options
					className: '',
					duration: 4000,
					style: {
						background: '#363636',
						color: '#fff',
						fontSize: '16px',
						fontWeight: '600',
						borderRadius: '8px',
						boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
					},
					// Default options for specific types
					success: {
						duration: 6000,
						iconTheme: {
							primary: '#10b981',
							secondary: '#fff',
						},
					},
					error: {
						duration: 5000,
						iconTheme: {
							primary: '#ef4444',
							secondary: '#fff',
						},
					},
				}}
			/>

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
