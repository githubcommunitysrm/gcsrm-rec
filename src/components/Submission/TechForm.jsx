import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

function TechForm({ participantData = {}, tasks = [] }) {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	// Normalize year checks (handles values like "2nd Year", "2", "Second Year")
	const isSecondYear =
		participantData.year &&
		/\b2(?:nd)?\b/i.test(String(participantData.year));
	const isFirstYear =
		participantData.year &&
		/\b1(?:st)?\b/i.test(String(participantData.year));

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);

		// Prepare data object
		const selectedTaskId = formData.get('selectedTask');
		const selectedTaskObj = tasks.find(
			(t) =>
				String(t._id) === String(selectedTaskId) ||
				t._id === selectedTaskId ||
				t.title === selectedTaskId
		);
		const selectedTaskTitle = selectedTaskObj?.title || selectedTaskId;

		const data = {
			name: participantData.name,
			registrationNumber:
				participantData.regNo || participantData.registrationNumber,
			email: participantData.email,
			phone: participantData.phone,
			year: participantData.year,
			selectedTask: selectedTaskId,
			selectedTaskTitle,
			githubLink: formData.get('githubLink'),
			deployedLink: formData.get('deployedLink'),
			demoVideo: formData.get('demoVideo'),
			domain: 'Technical',
		};

		try {
			const response = await fetch('/api/sheet', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const text = await response.text();
			try {
				const json = JSON.parse(text);
				if (response.ok) {
					alert(json.result || 'Form submitted successfully!');
					setIsOpen(false);
				} else {
					alert(
						json.error ||
							json.message ||
							text ||
							'Error submitting form.'
					);
				}
			} catch (e) {
				// Not JSON
				if (response.ok) {
					alert(text || 'Form submitted successfully!');
					setIsOpen(false);
				} else {
					alert(text || 'Error submitting form.');
				}
			}
		} catch (error) {
			console.error('Submission error:', error);
			alert('Error submitting form. Please try again.');
		}
	};

	return (
		<>
			{/* Mario-styled Submit Button */}
			<button
				onClick={handleOpen}
				className="inline-block font-bold text-black text-xl bg-gradient-to-b from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 rounded-full py-4 px-8 border-4 border-black transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-[8px_8px_0px_0px_#000]"
				style={{
					fontFamily: 'Arial Black, sans-serif',
					textShadow: '2px 2px 0 #fff, 3px 3px 0 #ccc',
					boxShadow:
						'0 0 25px rgba(255, 230, 0, 0.8), 0 8px 16px rgba(0, 0, 0, 0.3)',
				}}>
				Submit Tech Task
			</button>

			{/* Mario-themed Modal */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
					style={{
						backgroundImage: `
                            radial-gradient(circle at 20% 20%, rgba(138, 43, 226, 0.3) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(255, 20, 147, 0.3) 0%, transparent 50%),
                            radial-gradient(circle at 40% 40%, rgba(30, 144, 255, 0.2) 0%, transparent 50%)
                        `,
					}}>
					<form
						onSubmit={handleSubmit}
						className="bg-gradient-to-br from-blue-100 via-white to-blue-50 mx-3 md:mx-10 my-3 p-6 md:p-10 rounded-2xl space-y-4 flex flex-col w-full max-w-xs sm:max-w-sm md:max-w-2xl relative border-4 border-black shadow-[12px_12px_0px_0px_#000]"
						style={{
							backgroundImage: `
                                repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.05) 20px, rgba(0,0,0,0.05) 40px),
                                linear-gradient(135deg, #f0f8ff 0%, #ffffff 50%, #e6f3ff 100%)
                            `,
						}}>
						{/* Close Button */}
						<button
							type="button"
							onClick={handleClose}
							className="absolute top-4 right-4 text-3xl text-red-600 hover:text-red-800 hover:scale-110 transition-all duration-200 bg-white rounded-full p-2 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
							<AiOutlineClose />
						</button>

						{/* Mario-themed Header */}
						<div className="text-center mb-6">
							<h2
								className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-green-600 mb-2"
								style={{
									fontFamily: 'Arial Black, sans-serif',
									textShadow:
										'3px 3px 0 #fff, 4px 4px 0 #ccc',
								}}>
								TECH TASK SUBMISSION
							</h2>
						</div>

						{/* Participant Information - included as hidden fields (do not display to user) */}
						<div className="sr-only">
							<input
								type="hidden"
								name="name"
								value={participantData.name || ''}
							/>
							<input
								type="hidden"
								name="registrationNumber"
								value={
									participantData.regNo ||
									participantData.registrationNumber ||
									''
								}
							/>
							<input
								type="hidden"
								name="email"
								value={participantData.email || ''}
							/>
							<input
								type="hidden"
								name="phone"
								value={participantData.phone || ''}
							/>
							<input
								type="hidden"
								name="year"
								value={participantData.year || ''}
							/>
						</div>

						{/* Task Selection */}
						<div className="bg-white p-4 rounded-xl border-3 border-black shadow-[6px_6px_0px_0px_#000] mb-4">
							<div className="flex flex-col space-y-2 w-full">
								<label className="text-sm sm:text-base md:text-lg font-bold text-gray-800 flex items-center">
									🎯 Select Task:
								</label>
								<select
									name="selectedTask"
									className="rounded-lg px-3 py-3 text-sm sm:text-base md:text-lg bg-gray-50 text-black border-2 border-black focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
									required>
									<option value="">-- Select Task --</option>
									{tasks.map((task, index) => (
										<option
											key={task._id || index}
											value={task._id || index}>
											{task.title || `Task ${index + 1}`}
										</option>
									))}
								</select>
							</div>
						</div>

						{/* Task Submission Form */}
						<div className="bg-white p-4 rounded-xl border-3 border-black shadow-[6px_6px_0px_0px_#000] space-y-4">
							<h3 className="font-bold text-lg text-gray-800 mb-3 text-center flex items-center justify-center">
								Task Details
							</h3>

							<div className="flex flex-col space-y-2 w-full">
								<label className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 flex items-center">
									Github Link:
								</label>
								<input
									name="githubLink"
									className="rounded-lg px-3 py-3 text-sm sm:text-base md:text-lg bg-gray-50 text-black placeholder:text-gray-400 border-2 border-black focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
									placeholder="Repository Link"
									required
								/>
							</div>

							<div className="flex flex-col space-y-2 w-full">
								<label className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 flex items-center">
									Deployed Link:
									{isSecondYear && (
										<span className="ml-2 text-red-500 text-sm">
											*Required for 2nd years
										</span>
									)}
									{isFirstYear && (
										<span className="ml-2 text-gray-500 text-sm">
											(Optional for 1st years)
										</span>
									)}
								</label>
								<input
									name="deployedLink"
									className="rounded-lg px-3 py-3 text-sm sm:text-base md:text-lg bg-gray-50 text-black placeholder:text-gray-400 border-2 border-black focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
									placeholder={
										isSecondYear
											? 'Required for 2nd year students'
											: '(optional)'
									}
									required={isSecondYear}
								/>
							</div>

							<div className="flex flex-col space-y-2 w-full">
								<label className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 flex items-center">
									Demo Video:
									<span className="ml-2 text-red-500 text-sm">
										*Required for all years
									</span>
								</label>
								<input
									name="demoVideo"
									className="rounded-lg px-3 py-3 text-sm sm:text-base md:text-lg bg-gray-50 text-black placeholder:text-gray-400 border-2 border-black focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
									placeholder="Public Drive link (required)"
									required
								/>
							</div>
						</div>

						{/* Mario-styled Submit Button */}
						<div className="mt-8 flex justify-center">
							<button
								type="submit"
								className="w-full max-w-sm font-bold text-white py-3 px-6 text-base sm:text-lg md:text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full border-4 border-black transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-[8px_8px_0px_0px_#000]"
								style={{
									fontFamily: 'Arial Black, sans-serif',
									textShadow: '2px 2px 0 rgba(0,0,0,0.3)',
								}}>
								SUBMIT TASK
							</button>
						</div>
					</form>
				</div>
			)}
		</>
	);
}

export default TechForm;
