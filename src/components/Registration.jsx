'use client';

import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import confetti from 'canvas-confetti';
import Image from 'next/image';

const RegistrationForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		domain: '',
		registrationNumber: '',
		year: '',
		degreeWithBranch: '',
		subdomain: '',
		email: '',
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState({});
	const [now, setNow] = useState(() => new Date());

	const startDate = new Date(2025, 7, 25, 0, 0, 0); // August 25, 2025 at 00:00:00
	const endDate = new Date(2025, 7, 29, 23, 59, 59); // August 29, 2025 at 23:59:59

	// Check if registration is closed
	const isRegistrationClosed = now.getTime() > endDate.getTime();
	const isRegistrationOpen = now.getTime() >= startDate.getTime() && now.getTime() <= endDate.getTime();

	// Update current time every second
	useEffect(() => {
		const timer = setInterval(() => setNow(new Date()), 1000);
		return () => clearInterval(timer);
	}, []);

	// Mario-themed confetti function
	const fireMarioConfetti = () => {
		// First burst - Mario colors (red and blue)
		confetti({
			particleCount: 50,
			spread: 60,
			origin: { y: 0.7, x: 0.3 },
			colors: ['#ff4757', '#3742fa', '#ffa502', '#2ed573'],
			shapes: ['square', 'circle'],
			scalar: 1.2,
		});

		// Second burst - from other side
		setTimeout(() => {
			confetti({
				particleCount: 50,
				spread: 60,
				origin: { y: 0.7, x: 0.7 },
				colors: ['#ff4757', '#3742fa', '#ffa502', '#2ed573'],
				shapes: ['square', 'circle'],
				scalar: 1.2,
			});
		}, 200);

		// Final burst - center top
		setTimeout(() => {
			confetti({
				particleCount: 30,
				spread: 80,
				origin: { y: 0.5, x: 0.5 },
				colors: ['#ffdd59', '#ff6b6b', '#4ecdc4', '#45b7d1'],
				shapes: ['circle'],
				scalar: 0.8,
			});
		}, 400);
	};

	// Mario-themed toast messages
	const getMarioSuccessMessage = (name) => {
		const messages = [
			`Wahoo! Welcome to the adventure, ${name}! Your quest begins now!`,
			`Mamma mia! ${name}, you've joined the crew! Let's-a-go!`,
			`Yahoo! ${name}, you're officially part of GCSRM! Time to level up!`,
			`It's-a-me, welcoming ${name} to the team! Your journey starts here!`,
			`Woohoo! ${name}, you've powered up and joined GCSRM! Ready for adventure?`,
		];
		return messages[Math.floor(Math.random() * messages.length)];
	};

	const getMarioErrorMessage = (error) => {
		// Handle duplicate key errors specifically
		if (error.includes('E11000') || error.includes('duplicate key')) {
			if (error.includes('registrationNumber')) {
				return "Oops! That registration number is already registered! Looks like you've already joined our adventure or someone beat you to it!";
			}
			if (error.includes('email')) {
				return 'Hold up! That email is already registered! Did you forget you already signed up for this epic quest?';
			}
			return 'Whoa there! That information is already registered! Double-check your details, hero!';
		}

		// Default Mario-themed error messages for other errors
		const errorMessages = [
			`Oops! Looks like we hit a ? block! ${error}`,
			`Mamma mia! Something went wrong: ${error}`,
			`Houston, we have a problem! ${error}`,
			`Hold up! We've got a small hiccup: ${error}`,
			`Uh oh! Time to call Luigi for help: ${error}`,
		];
		return errorMessages[Math.floor(Math.random() * errorMessages.length)];
	};

	const getValidationErrorMessage = () => {
		const messages = [
			"Hold on there, speedster! Let's fix those details first!",
			'Whoa there! Mario needs all the info to start your adventure!',
			'Slow down, hero! Complete your profile to join the quest!',
			'Almost there! Just need to polish those details!',
			'Hey, looks like some fields need your attention!',
		];
		return messages[Math.floor(Math.random() * messages.length)];
	};

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
		if (!formData.degreeWithBranch.trim()) {
			newErrors.degreeWithBranch = 'Degree with branch is required!';
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

		if (isRegistrationClosed || !isRegistrationOpen) {
			toast.error('Registration period has ended!', {
				duration: 5000,
				style: {
					background: '#ef4444',
					color: '#fff',
					fontSize: '16px',
				},
			});
			return;
		}


		if (!validateForm()) {
			toast.error(getValidationErrorMessage(), {
				duration: 4000,
				style: {
					background: '#fc8e2d',
					color: '#000',
					fontSize: '14px',
					fontWeight: '800',
					fontFamily: 'ArcadeClassic',
					border: '4px solid #000',
					borderRadius: '0px',
					padding: '16px 20px',
					boxShadow: '8px 8px 0px #000',
					textTransform: 'uppercase',
					letterSpacing: '1px',
				},
				icon: '🎯',
			});
			return;
		}

		setIsSubmitting(true);

		// Show loading toast
		const loadingToastId = toast.loading(
			'🎮 Processing your adventure request...',
			{
				style: {
					background: '#fc8e2d',
					color: '#000',
					fontSize: '14px',
					fontWeight: '800',
					fontFamily: 'ArcadeClassic',
					border: '4px solid #000',
					borderRadius: '0px',
					padding: '16px 20px',
					boxShadow: '8px 8px 0px #000',
					textTransform: 'uppercase',
					letterSpacing: '1px',
				},
			}
		);

		try {
			// Double-check on server side as well
			const currentTime = new Date().getTime();
			if (currentTime > endDate.getTime()) {
				toast.error('Registration period has ended!', {
					duration: 5000,
					style: {
						background: '#ef4444',
						color: '#fff',
						fontSize: '16px',
					},
				});
				setIsSubmitting(false);
				return;
			}

			const response = await fetch('/api/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					...formData,
					submissionTime: currentTime, // Send timestamp for server validation
				}),
			});

			const result = await response.json();

			// Dismiss loading toast
			toast.dismiss(loadingToastId);

			if (response.ok) {
				// Fire confetti first
				fireMarioConfetti();

				// Then show success toast
				toast.success(getMarioSuccessMessage(formData.name), {
					duration: 7000,
					style: {
						background: '#fc8e2d',
						color: '#000',
						fontSize: '15px',
						fontWeight: '800',
						fontFamily: 'ArcadeClassic',
						border: '4px solid #000',
						borderRadius: '0px',
						padding: '18px 22px',
						boxShadow: '10px 10px 0px #000',
						textAlign: 'center',
						maxWidth: '450px',
						textTransform: 'uppercase',
						letterSpacing: '1px',
					},
					icon: '🎮',
					iconTheme: {
						primary: '#000',
						secondary: '#fc8e2d',
					},
				});

				// Reset form
				setFormData({
					name: '',
					phone: '',
					domain: '',
					registrationNumber: '',
					year: '',
					degreeWithBranch: '',
					email: '',
				});
			} else {
				toast.error(getMarioErrorMessage(result.error), {
					duration: 6000,
					style: {
						background: '#fc8e2d',
						color: '#000',
						fontSize: '14px',
						fontWeight: '800',
						fontFamily: 'ArcadeClassic',
						border: '4px solid #000',
						borderRadius: '0px',
						padding: '16px 20px',
						boxShadow: '8px 8px 0px #000',
						textTransform: 'uppercase',
						letterSpacing: '1px',
					},
					icon: '🔧',
				});
			}
		} catch (error) {
			// Dismiss loading toast
			toast.dismiss(loadingToastId);

			toast.error(
				'🛠️ Oops! The connection pipe seems blocked! Try again, brave adventurer!',
				{
					duration: 5000,
					style: {
						background: '#fc8e2d',
						color: '#000',
						fontSize: '14px',
						fontWeight: '800',
						fontFamily: 'ArcadeClassic',
						border: '4px solid #000',
						borderRadius: '0px',
						padding: '16px 20px',
						boxShadow: '8px 8px 0px #000',
						textTransform: 'uppercase',
						letterSpacing: '1px',
					},
					icon: '📡',
				}
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const inputClasses = (fieldName, hasValue = false) =>
		`w-full px-2 sm:px-3 py-2 sm:py-2.5 text-sm sm:text-base border-2 sm:border-3 rounded focus:outline-none focus:ring-2 transition-all ${hasValue ? 'text-black' : 'text-gray-500'
		} ${errors[fieldName]
			? 'border-red-500 focus:ring-red-400'
			: 'border-black focus:ring-blue-400'
		}`;

	return (
		<div
			id="registration-section"
			className="min-h-screen relative overflow-hidden flex items-center justify-center py-6 sm:py-8 lg:py-20 px-4 sm:px-6 lg:px-24"
			style={{ backgroundColor: '#33a1fd' }}>
			<style jsx>{`
				@font-face {
					font-family: 'SuperMario256';
					src: url('/SuperMario256.ttf') format('truetype');
					font-display: swap;
				}
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
				{/* Mario-styled heading above the form */}
				<div className="flex justify-center pt-6 sm:pt-8 md:pt-8 lg:pt-8 mb-6 sm:mb-10 md:mb-12">
					<div className="text-center z-20">
						<h1
							style={{
								fontFamily: 'SuperMario256, Arial, sans-serif',
								fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
								WebkitTextStroke: 'min(2vw, 3px) #000',
								margin: 0,
								display: 'flex',
								justifyContent: 'center',
								lineHeight: 1.1,
								wordBreak: 'break-word',
								whiteSpace: 'nowrap',
								overflowX: 'auto',
							}}
							className="mx-auto heading-responsive">
							<span
								style={{
									color: '#D42000',
									textShadow:
										'4px 4px 0 #3b3b3b, 8px 8px 0 #E67A00',
									marginRight: '0.3em',
								}}>
								FILL
							</span>
							<span
								style={{
									color: '#47A63E',
									textShadow:
										'4px 4px 0 #3b3b3b, 8px 8px 0 #E67A00',
									marginRight: '0.3em',
								}}>
								THE
							</span>
							<span
								style={{
									color: '#ffe600',
									textShadow:
										'4px 4px 0 #3b3b3b, 8px 8px 0 #E67A00',
								}}>
								FORM
							</span>
						</h1>
					</div>
				</div>
				<div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
					{isRegistrationClosed ? (
						/* Registration Closed Message */
						<div className="bg-gradient-to-b from-gray-400 to-gray-600 rounded-lg border-2 sm:border-3 md:border-4 border-black shadow-xl sm:shadow-2xl p-6 sm:p-8 md:p-10">
							<div className="text-center">
								<div className="text-4xl mb-4">⏰</div>
								<h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Arial Black, sans-serif' }}>
									REGISTRATION CLOSED!
								</h2>
								<p className="text-white text-sm sm:text-base mb-4">
									The registration period ended on August 29, 2025 at 23:59:59
								</p>
								<p className="text-gray-200 text-xs sm:text-sm">
									Thank you for your interest in GitHub Community SRM!
								</p>
							</div>
						</div>
					) : (
						/* Registration Form */
						<div className={`bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-lg border-2 sm:border-3 md:border-4 border-black shadow-xl sm:shadow-2xl p-3 sm:p-4 md:p-5 ${!isRegistrationOpen ? 'opacity-50 pointer-events-none' : ''}`}>
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
										disabled={!isRegistrationOpen}
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
										disabled={!isRegistrationOpen}
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
										disabled={!isRegistrationOpen}
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
										name="degreeWithBranch"
										value={formData.degreeWithBranch}
										onChange={handleChange}
										required
										disabled={!isRegistrationOpen}
										className={inputClasses(
											'degreeWithBranch',
											formData.degreeWithBranch
										)}
										placeholder="Degree with Branch (e.g. B.Tech - CSE)"
									/>
									{errors.degreeWithBranch && (
										<p className="text-red-600 text-xs font-bold mt-1">
											❌ {errors.degreeWithBranch}
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
										disabled={!isRegistrationOpen}
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
										disabled={!isRegistrationOpen}
										className={`w-full px-2 sm:px-3 py-2 sm:py-2.5 text-sm sm:text-base border-2 sm:border-3 rounded focus:outline-none focus:ring-2 transition-all ${errors.year
											? 'border-red-500 focus:ring-red-400'
											: 'border-black focus:ring-blue-400'
											} ${!isRegistrationOpen ? 'bg-gray-300 cursor-not-allowed' : ''}`}
										style={{ backgroundColor: isRegistrationOpen ? '#f6c100' : '#d1d5db' }}>
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
										disabled={!isRegistrationOpen}
										className={`w-full px-2 sm:px-3 py-2 sm:py-2.5 text-sm sm:text-base border-2 sm:border-3 rounded focus:outline-none focus:ring-2 transition-all ${errors.domain
											? 'border-red-500 focus:ring-red-400'
											: 'border-black focus:ring-blue-400'
											} ${!isRegistrationOpen ? 'bg-gray-300 cursor-not-allowed' : ''}`}
										style={{ backgroundColor: isRegistrationOpen ? '#f4bb00' : '#d1d5db' }}>
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
										disabled={isSubmitting || !isRegistrationOpen}
										className={`w-full font-bold py-3 sm:py-3.5 px-4 rounded border-2 sm:border-3 border-black shadow-lg transition-all duration-200 text-sm sm:text-base ${isSubmitting || !isRegistrationOpen
											? 'bg-gray-400 cursor-not-allowed'
											: 'bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 active:scale-95 transform hover:scale-105'
											}`}
										style={{
											fontFamily: 'Arial Black, sans-serif',
											minHeight: '44px',
										}}>
										{!isRegistrationOpen
											? 'REGISTRATION CLOSED'
											: isSubmitting
												? ' LOADING ADVENTURE...'
												: ' START MY QUEST!'}
									</button>
								</div>
							</form>
						</div>
					)}
				</div>
			</div>
			{/* Question Blocks - Left and Right, closer together - Hidden on mobile */}
			<div
				className="absolute left-20 w-16 h-16 z-20 hidden md:block"
				style={{ bottom: '300px' }}>
				<Image
					src="/block_question.png"
					alt="Question Block"
					fill
					className="object-contain hover:scale-110 transition-transform cursor-pointer"
				/>
			</div>
			<div
				className="absolute w-16 h-16 z-20 hidden md:block"
				style={{ bottom: '300px', right: '288px' }}>
				<Image
					src="/block_question-2.png"
					alt="Question Block"
					fill
					className="object-contain hover:scale-110 transition-transform cursor-pointer"
				/>
			</div>
			<div className="absolute bottom-0 right-2 w-24 sm:w-28 md:w-36 z-10 flex items-end h-64 sm:h-72 md:h-80">
				<Image
					src="/flag.png"
					alt="Flag"
					width={220}
					height={630}
					className="object-contain h-full w-auto"
				/>
			</div>

			{/* Toast Notifications */}
			<Toaster
				position="top-center"
				reverseOrder={false}
				gutter={16}
				containerClassName=""
				containerStyle={{
					zIndex: 9999,
				}}
				toastOptions={{
					// Define default options with retro pixel theme
					className: '',
					duration: 5000,
					style: {
						background: '#fc8e2d',
						color: '#000',
						fontSize: '14px',
						fontWeight: '800',
						fontFamily: 'ArcadeClassic',
						borderRadius: '0px',
						border: '4px solid #000',
						padding: '16px 20px',
						boxShadow: '8px 8px 0px #000',
						textAlign: 'center',
						textTransform: 'uppercase',
						letterSpacing: '1px',
					},
					// Enhanced options for specific types
					success: {
						duration: 7000,
						style: {
							background: '#fc8e2d',
							color: '#000',
							fontSize: '15px',
							fontWeight: '800',
							fontFamily: 'ArcadeClassic',
							border: '4px solid #000',
							borderRadius: '0px',
							padding: '18px 22px',
							boxShadow: '10px 10px 0px #000',
							textTransform: 'uppercase',
							letterSpacing: '1px',
							maxWidth: '450px',
						},
						iconTheme: {
							primary: '#000',
							secondary: '#fc8e2d',
						},
					},
					error: {
						duration: 6000,
						style: {
							background: '#fc8e2d',
							color: '#000',
							fontSize: '14px',
							fontWeight: '800',
							fontFamily: 'ArcadeClassic',
							border: '4px solid #000',
							borderRadius: '0px',
							padding: '16px 20px',
							boxShadow: '8px 8px 0px #000',
							textTransform: 'uppercase',
							letterSpacing: '1px',
						},
						iconTheme: {
							primary: '#000',
							secondary: '#fc8e2d',
						},
					},
					loading: {
						style: {
							background: '#fc8e2d',
							color: '#000',
							fontSize: '14px',
							fontWeight: '800',
							fontFamily: 'ArcadeClassic',
							border: '4px solid #000',
							borderRadius: '0px',
							padding: '16px 20px',
							boxShadow: '8px 8px 0px #000',
							textTransform: 'uppercase',
							letterSpacing: '1px',
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
