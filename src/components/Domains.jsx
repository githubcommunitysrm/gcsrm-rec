'use client';
import React from 'react';
import Image from 'next/image';

const Domain = () => {
	return (
		<div className="relative min-h-screen bg-gradient-to-b from-sky-400 to-blue-500 overflow-hidden">
			<style jsx>{`
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
			`}</style>

			{/* Floating Clouds */}
			<div className="absolute top-8 sm:top-12 left-8 sm:left-16 w-20 sm:w-24 md:w-28 lg:w-32 h-auto z-10 cloud-float">
				<Image
					src="/cloud-1.png"
					alt="Cloud 1"
					width={120}
					height={80}
					className="object-contain w-full h-auto"
				/>
			</div>

			<div className="absolute top-8 sm:top-12 right-8 sm:right-16 w-20 sm:w-24 md:w-28 lg:w-32 h-auto z-10 cloud-float-delayed">
				<Image
					src="/cloud-2.png"
					alt="Cloud 2"
					width={120}
					height={80}
					className="object-contain w-full h-auto"
				/>
			</div>

			{/* Choose Your Path Title */}
			<div className="flex justify-center pt-8 sm:pt-10 md:pt-10 lg:pt-10 mb-8 sm:mb-12 md:mb-16">
				<div className="w-64 sm:w-80 md:w-96 lg:w-[14rem] xl:w-[16rem] h-auto z-20">
					<Image
						src="/choose-your-path.png"
						alt="Choose Your Path"
						width={448}
						height={200}
						className="object-contain w-full h-auto"
						priority
					/>
				</div>
			</div>

			{/* Cards Section */}
			<div className="flex flex-col md:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-3 lg:px-12 px-4 sm:px-6 md:px-8 pb-32">
				{/* Tech Card */}
				<div className="w-full max-w-sm sm:max-w-md md:max-w-xs lg:max-w-sm xl:max-w-md h-auto z-40">
					<Image
						src="/techCard.svg"
						alt="Technical Skills - The Creative Powerhouse of GCSRM! This is the team that brings the visual magic! From sleek GFX and eye-catching posters to cinematic VFX and motion edits, they power up every project. Bold, fresh, and unforgettable - that's their game!"
						width={400}
						height={300}
						className="object-contain w-full h-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
					/>
				</div>

				{/* Creative Card */}
				<div className="w-full max-w-sm sm:max-w-md md:max-w-xs lg:max-w-sm xl:max-w-md h-auto z-40">
					<Image
						src="/creativeCard.svg"
						alt="Creative Skills - The Creative Powerhouse of GCSRM! This is the team that brings the visual magic! From sleek GFX and eye-catching posters to cinematic VFX and motion edits, they power up every project. Bold, fresh, and unforgettable - that's their game!"
						width={400}
						height={300}
						className="object-contain w-full h-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
					/>
				</div>

				{/* Corporate Card */}
				<div className="w-full max-w-sm sm:max-w-md md:max-w-xs lg:max-w-sm xl:max-w-md h-auto z-40">
					<Image
						src="/corpCard.svg"
						alt="Corporate Skills - The Corporate Force of GCSRM! From flawless Operations that keep everything running, to sharp Documentation that preserves every milestone - we've got it covered. With Public Relations shaping our voice and Sponsorship fueling our growth, this team is the engine that drives it all."
						width={400}
						height={300}
						className="object-contain w-full h-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
					/>
				</div>
			</div>

			{/* Pipes and decorations */}
			<div className="absolute bottom-16 sm:bottom-14 md:bottom-16 left-0 w-16 sm:w-20 md:w-24 lg:w-28 h-24 sm:h-28 md:h-32 lg:h-36 z-10 hidden sm:block">
				<Image
					src="/pipe_basic.png"
					alt="Pipe"
					width={203}
					height={305}
					className="object-contain h-full w-auto"
				/>
			</div>
			<div className="absolute bottom-40 sm:bottom-42 md:bottom-48 lg:bottom-51 left-0 w-20 sm:w-24 md:w-28 lg:w-32 h-10 sm:h-12 md:h-14 lg:h-14 z-20 hidden sm:block">
				<Image
					src="/pipe_top.png"
					alt="Pipe Top"
					width={232}
					height={116}
					className="object-contain h-full w-auto"
				/>
			</div>

			<div className="absolute bottom-16 sm:bottom-14 md:bottom-16 right-0 w-16 sm:w-20 md:w-24 lg:w-28 h-24 sm:h-28 md:h-32 lg:h-36 z-10 hidden sm:block">
				<Image
					src="/pipe_basic.png"
					alt="Pipe"
					width={203}
					height={305}
					className="object-contain h-full w-auto"
				/>
			</div>
			<div className="absolute bottom-40 sm:bottom-42 md:bottom-48 lg:bottom-51 right-0 w-20 sm:w-24 md:w-28 lg:w-32 h-10 sm:h-12 md:h-14 lg:h-14 z-20 hidden sm:block">
				<Image
					src="/pipe_top.png"
					alt="Pipe Top"
					width={232}
					height={116}
					className="object-contain h-full w-auto"
				/>
			</div>

			{/* bottom textured block */}
			<div
				className="absolute bottom-0 left-0 right-0 h-16 sm:h-14 md:h-16 z-5"
				style={{
					backgroundImage: 'url(/block_textured.png)',
					backgroundRepeat: 'repeat',
					backgroundSize: '32px 32px',
					backgroundPosition: 'bottom',
				}}
			/>
		</div>
	);
};

export default Domain;
