'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const HeroSection = () => {
	const [showFallingBoss, setShowFallingBoss] = useState(false);
	const [now, setNow] = useState(() => new Date());
	const [isWindowOpen, setIsWindowOpen] = useState(false);
	const [isWindowClosed, setIsWindowClosed] = useState(false);
	const [showPalmTree, setShowPalmTree] = useState(true);
	const [leftCoins, setLeftCoins] = useState([]); // coins spawned from left question block
	const [leftBump, setLeftBump] = useState(false); // bump animation for block
	const [hydrated, setHydrated] = useState(false); // guard to avoid SSR/CSR timer mismatch
	// Right block power-up state
	const [rightItem, setRightItem] = useState(null); // { id, type: 'star' | 'mushroom' }
	const [rightReturning, setRightReturning] = useState(false);
	const [rightBump, setRightBump] = useState(false);
	const rightTimers = useRef({ returnTimer: null, cleanupTimer: null });

	const startDate = new Date(2025, 7, 29, 0, 0, 0);
	const endDate = new Date(2025, 7, 30, 23, 59, 59);

	const totalSecondsWindow = Math.max(
		1,
		Math.floor((endDate.getTime() - startDate.getTime()) / 1000)
	);
	const elapsedSeconds = Math.max(
		0,
		Math.floor((now.getTime() - startDate.getTime()) / 1000)
	);
	const progress = Math.min(
		100,
		Math.max(0, (elapsedSeconds / totalSecondsWindow) * 100)
	);

	useEffect(() => {
		const handleScroll = () => {
			const domainsSection = document.getElementById('domains-section');
			const heroSection = document.getElementById('hero-section');

			if (domainsSection) {
				const domainRect = domainsSection.getBoundingClientRect();
				if (
					domainRect.top < window.innerHeight &&
					domainRect.bottom > 0
				) {
					setShowFallingBoss(true);
				}
			}

			if (heroSection) {
				const heroRect = heroSection.getBoundingClientRect();
				setShowPalmTree(heroRect.bottom > 0);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		const t = setInterval(() => setNow(new Date()), 1000);
		return () => clearInterval(t);
	}, []);

	// Set hydrated after first client render to avoid SSR/CSR mismatch for time-dependent UI
	useEffect(() => {
		setHydrated(true);
	}, []);

	useEffect(() => {
		setIsWindowOpen(
			now.getTime() >= startDate.getTime() &&
				now.getTime() <= endDate.getTime()
		);
		setIsWindowClosed(now.getTime() > endDate.getTime());
	}, [now]);

	// Cleanup any pending right-block timers on unmount
	useEffect(() => {
		return () => {
			if (rightTimers.current.returnTimer)
				clearTimeout(rightTimers.current.returnTimer);
			if (rightTimers.current.cleanupTimer)
				clearTimeout(rightTimers.current.cleanupTimer);
		};
	}, []);

	// Format time as HHh MMm SSs (no days)
	const formatHourMinSec = (seconds) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = Math.floor(seconds % 60);
		return `${hours.toString().padStart(2, '0')}h ${minutes
			.toString()
			.padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
	};

	const secondsUntil = (target) =>
		Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));

	const isTimerExpired = now.getTime() > endDate.getTime();
	const isTimerActive =
		now.getTime() >= startDate.getTime() &&
		now.getTime() <= endDate.getTime();
	const timeLeft = isTimerActive
		? secondsUntil(endDate)
		: Math.max(0, secondsUntil(startDate));
	const formatTime = formatHourMinSec;

	return (
		<div
			id="hero-section"
			className="h-screen relative overflow-hidden flex items-center justify-center"
			style={{ backgroundColor: '#33a1fd' }}>
			{/* Custom CSS for character animations */}
			<style jsx>{`
				@font-face {
					font-family: 'SuperMario256';
					src: url('/SuperMario256.ttf') format('truetype');
					font-display: swap;
				}

				/* Desktop / default keyframes */
				@keyframes marioWalk {
					0% {
						transform: translate3d(0, 0, 0) scaleX(1);
					}
					45% {
						transform: translate3d(calc(70vw - 200px), 0, 0)
							scaleX(1);
					}
					50% {
						transform: translate3d(calc(70vw - 200px), 0, 0)
							scaleX(-1);
					}
					95% {
						transform: translate3d(-8vw, 0, 0) scaleX(-1);
					}
					100% {
						transform: translate3d(0, 0, 0) scaleX(1);
					}
				}
				@keyframes bowserWalk {
					0% {
						transform: translate3d(0, 0, 0) scaleX(1);
					}
					45% {
						transform: translate3d(calc(-70vw + 200px), 0, 0)
							scaleX(1);
					}
					50% {
						transform: translate3d(calc(-70vw + 200px), 0, 0)
							scaleX(-1);
					}
					95% {
						transform: translate3d(8vw, 0, 0) scaleX(-1);
					}
					100% {
						transform: translate3d(0, 0, 0) scaleX(1);
					}
				}

				/* Mobile-specific keyframes */
				@keyframes marioWalkMobile {
					0% {
						transform: translate3d(-30vw, 0, 0) scaleX(1);
					}
					45% {
						transform: translate3d(30vw, 0, 0) scaleX(1);
					}
					50% {
						transform: translate3d(30vw, 0, 0) scaleX(-1);
					}
					95% {
						transform: translate3d(-30vw, 0, 0) scaleX(-1);
					}
					100% {
						transform: translate3d(-30vw, 0, 0) scaleX(1);
					}
				}
				@keyframes bowserWalkMobile {
					0% {
						transform: translate3d(30vw, 0, 0) scaleX(1);
					}
					45% {
						transform: translate3d(-30vw, 0, 0) scaleX(1);
					}
					50% {
						transform: translate3d(-30vw, 0, 0) scaleX(-1);
					}
					95% {
						transform: translate3d(30vw, 0, 0) scaleX(-1);
					}
					100% {
						transform: translate3d(30vw, 0, 0) scaleX(1);
					}
				}

				.mario-animate {
					animation: marioWalk 10s ease-in-out infinite;
					will-change: transform;
					backface-visibility: hidden;
					transform: translateZ(0);
				}

				.bowser-animate {
					animation: bowserWalk 10s ease-in-out infinite;
					will-change: transform;
					backface-visibility: hidden;
					transform: translateZ(0);
				}

				/* Switch to mobile animations */
				@media (max-width: 600px) {
					.mario-animate {
						animation-name: marioWalkMobile;
					}
					.bowser-animate {
						animation-name: bowserWalkMobile;
					}
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

				/* Fix broken falling boss keyframes */
				@keyframes fallingBoss {
					0% {
						transform: translateY(-40vh);
						opacity: 0;
					}
					20% {
						opacity: 1;
					}
					100% {
						transform: translateY(0);
						opacity: 1;
					}
				}
				.falling-boss {
					animation: fallingBoss 2s ease-in forwards;
				}
			`}</style>

			{/* Coin pop + block bump animations */}
			<style jsx>{`
				@keyframes coinPop {
					0% {
						transform: translate(-50%, 0) scale(1);
						opacity: 1;
					}
					30% {
						transform: translate(-50%, -40px) scale(1.05);
						opacity: 1;
					}
					60% {
						transform: translate(-50%, -80px) scale(1);
						opacity: 0.95;
					}
					100% {
						transform: translate(-50%, -110px) scale(1);
						opacity: 0;
					}
				}
				.coin-sprite {
					position: absolute;
					left: 50%;
					bottom: 0;
					pointer-events: none;
				}
				.coin-pop {
					animation: coinPop 800ms cubic-bezier(0.2, 0.7, 0.2, 1)
						forwards;
					filter: drop-shadow(0 3px 0 #000);
				}

				@keyframes blockBump {
					0% {
						transform: translateY(0);
					}
					50% {
						transform: translateY(-6px);
					}
					100% {
						transform: translateY(0);
					}
				}
				.block-bump {
					animation: blockBump 150ms ease-out;
				}

				/* Right block item grow/return animations */
				@keyframes itemGrow {
					0% {
						transform: translate(-50%, 0) scale(0.3);
						opacity: 0;
					}
					70% {
						transform: translate(-50%, -56px) scale(1.05);
						opacity: 1;
					}
					100% {
						transform: translate(-50%, -64px) scale(1);
						opacity: 1;
					}
				}
				@keyframes itemReturn {
					0% {
						transform: translate(-50%, -64px) scale(1);
						opacity: 1;
					}
					100% {
						transform: translate(-50%, 0) scale(0.3);
						opacity: 0;
					}
				}
				.item-sprite {
					position: absolute;
					left: 50%;
					bottom: 0;
					filter: drop-shadow(0 3px 0 #000);
					pointer-events: none;
				}
				.item-grow {
					animation: itemGrow 650ms cubic-bezier(0.2, 0.7, 0.2, 1)
						forwards;
				}
				.item-return {
					animation: itemReturn 550ms ease-in forwards;
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
			<div className="text-center z-20 px-4 -mt-32">
				{/* Main RECRUITMENTS OPEN Heading with Super Mario Font and colored segments */}
				<div
					className="mb-1"
					style={{
						width: '100%',
						maxWidth: '100vw',
						overflowX: 'auto',
					}}>
					<h1
						style={{
							fontFamily: 'SuperMario256, Arial, sans-serif',
							fontSize: 'clamp(2.1rem, 7vw, 7rem)',
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
							}}>
							RECR
						</span>
						<span
							style={{
								color: '#47A63E',
								textShadow:
									'4px 4px 0 #3b3b3b, 8px 8px 0 #E67A00',
							}}>
							UITM
						</span>
						<span
							style={{
								color: '#034DA1',
								textShadow:
									'4px 4px 0 #3b3b3b, 8px 8px 0 #E67A00',
							}}>
							ENTS
						</span>
						<span
							style={{
								color: '#ffe600',
								textShadow:
									'4px 4px 0 #3b3b3b, 8px 8px 0 #E67A00',
								marginLeft: '0.5em',
							}}>
							OPEN
						</span>
					</h1>
				</div>

				<h1
					style={{
						fontFamily: 'SuperMario256, Arial, sans-serif',
						fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
						WebkitTextStroke: 'min(1vw, 3px) #000',
						margin: 0,
						display: 'flex',
						justifyContent: 'center',
						flexWrap: 'nowrap',
						lineHeight: 1.1,
						wordBreak: 'keep-all',
						whiteSpace: 'nowrap',
						overflowX: 'auto',
						width: '100%',
					}}
					className="mx-auto heading-responsive">
					<span
						style={{
							color: '#FFD93D',
							textShadow: '4px 4px 0 #3b3b3b, 8px 6px 0 #E67A00',
							letterSpacing: '0.05em',
							textAlign: 'center',
							width: '100%',
							display: 'block',
						}}>
						GITHUB COMMUNITY SRM
					</span>
				</h1>

				{/* Direct Registration Button with Timer */}
				<div className="relative mb-12 mt-8">
					<button
						onClick={() => {
							if (!isTimerExpired) {
								const registrationSection =
									document.getElementById(
										'registration-section'
									);
								registrationSection?.scrollIntoView({
									behavior: 'smooth',
								});
							}
						}}
						disabled={hydrated ? isTimerExpired : true}
						className={`relative overflow-hidden font-bold py-4 px-8 text-xl rounded border-4 border-black shadow-2xl transform transition-all duration-300 ${
							hydrated && isTimerExpired
								? 'bg-gray-400 cursor-not-allowed'
								: 'bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 hover:scale-105'
						}`}
						style={{ fontFamily: 'Arial Black, sans-serif' }}>
						<span
							className={`flex items-center space-x-2 ${
								hydrated && isTimerExpired
									? 'text-gray-600'
									: 'text-black'
							}`}>
							<span className="text-2xl">
								{hydrated && isTimerExpired ? '⏰' : ''}
							</span>
							<span className="flex flex-col items-center">
								<span>
									{hydrated
										? isTimerExpired
											? 'REGISTRATION CLOSED!'
											: 'REGISTER NOW!'
										: 'REGISTER'}
								</span>
								<span className="text-xl font-normal text-yellow-300">
									{hydrated
										? isTimerExpired
											? 'Time Up!'
											: `${formatTime(timeLeft)}`
										: '...'}
								</span>
							</span>
							<span className="text-2xl">
								{hydrated && isTimerExpired ? '⏰' : ''}
							</span>
						</span>
					</button>
				</div>
			</div>

			{/* Palm Tree - Left Side - Only visible on first page */}
			{showPalmTree && (
				<div
					className="absolute bottom-16 left-0 w-32 sm:w-48 md:w-64 h-65 sm:h-98 md:h-130 z-10"
					style={{ margin: 0, padding: 0 }}>
					<div className="relative w-full h-full">
						<Image
							src="/tree_palm.png"
							alt="Palm Tree"
							fill
							className="object-contain object-left"
						/>
					</div>
				</div>
			)}

			{/* Mario Pipe - Right Side */}
			<div className="absolute bottom-16 right-0 w-28 h-40 z-10">
				<Image
					src="/pipe_basic.png"
					alt="Pipe"
					width={203}
					height={305}
					className="object-contain h-full w-auto"
				/>
			</div>

			{/* Pipe Top - Right Side */}
			<div className="absolute bottom-54 right-0 w-32 h-16 z-20">
				<Image
					src="/pipe_top.png"
					alt="Pipe Top"
					width={232}
					height={116}
					className="object-contain h-full w-auto"
				/>
			</div>

			{/* Question Blocks - Left and Right, closer together - Hidden on mobile */}
			<div
				className="absolute left-20 w-16 h-16 z-20 hidden md:block"
				style={{ bottom: '300px' }}>
				<div
					className="relative w-full h-full"
					role="button"
					aria-label="Question Block"
					tabIndex={0}
					onClick={() => {
						const id = Date.now() + Math.random();
						setLeftCoins((prev) => [...prev, { id }].slice(-10));
						setLeftBump(true);
						setTimeout(() => setLeftBump(false), 150);
						setTimeout(
							() =>
								setLeftCoins((prev) =>
									prev.filter((c) => c.id !== id)
								),
							900
						);
					}}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							const id = Date.now() + Math.random();
							setLeftCoins((prev) =>
								[...prev, { id }].slice(-10)
							);
							setLeftBump(true);
							setTimeout(() => setLeftBump(false), 150);
							setTimeout(
								() =>
									setLeftCoins((prev) =>
										prev.filter((c) => c.id !== id)
									),
								900
							);
						}
					}}>
					<Image
						src="/block_question.png"
						alt="Question Block"
						fill
						className={`object-contain hover:scale-110 transition-transform cursor-pointer ${
							leftBump ? 'block-bump' : ''
						}`}
					/>
					{/* Bouncing coins rendered above the block */}
					{leftCoins.map((c) => (
						<span
							key={c.id}
							className="coin-sprite coin-pop">
							<svg
								width="28"
								height="28"
								viewBox="0 0 64 64"
								shapeRendering="crispEdges">
								<ellipse
									cx="32"
									cy="32"
									rx="18"
									ry="28"
									fill="#FFD84D"
									stroke="#000"
									strokeWidth="6"
								/>
								<rect
									x="28"
									y="16"
									width="8"
									height="32"
									rx="2"
									fill="#F6C000"
									stroke="#000"
									strokeWidth="4"
								/>
								<ellipse
									cx="24"
									cy="20"
									rx="6"
									ry="8"
									fill="#FFF1A6"
									opacity="0.85"
								/>
							</svg>
						</span>
					))}
				</div>
			</div>
			<div
				className="absolute w-16 h-16 z-20 hidden md:block"
				style={{ bottom: '300px', right: '288px' }}>
				<div
					className={`relative w-full h-full ${
						rightBump ? 'block-bump' : ''
					}`}
					role="button"
					aria-label="Question Block Right"
					tabIndex={0}
					onClick={() => {
						// Clear existing timers
						if (rightTimers.current.returnTimer)
							clearTimeout(rightTimers.current.returnTimer);
						if (rightTimers.current.cleanupTimer)
							clearTimeout(rightTimers.current.cleanupTimer);

						// Randomly choose star or mushroom
						const type = Math.random() < 0.5 ? 'mushroom' : 'star';
						const id = Date.now() + Math.random();
						setRightReturning(false);
						setRightItem({ id, type });
						setRightBump(true);
						setTimeout(() => setRightBump(false), 150);

						// Schedule return after 5s, then cleanup
						rightTimers.current.returnTimer = setTimeout(() => {
							setRightReturning(true);
							rightTimers.current.cleanupTimer = setTimeout(
								() => {
									setRightItem(null);
									setRightReturning(false);
								},
								700
							);
						}, 5000);
					}}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							// Trigger same as click
							if (rightTimers.current.returnTimer)
								clearTimeout(rightTimers.current.returnTimer);
							if (rightTimers.current.cleanupTimer)
								clearTimeout(rightTimers.current.cleanupTimer);
							const type =
								Math.random() < 0.5 ? 'mushroom' : 'star';
							const id = Date.now() + Math.random();
							setRightReturning(false);
							setRightItem({ id, type });
							setRightBump(true);
							setTimeout(() => setRightBump(false), 150);
							rightTimers.current.returnTimer = setTimeout(() => {
								setRightReturning(true);
								rightTimers.current.cleanupTimer = setTimeout(
									() => {
										setRightItem(null);
										setRightReturning(false);
									},
									700
								);
							}, 5000);
						}
					}}>
					<Image
						src="/block_question-2.png"
						alt="Question Block"
						fill
						className="object-contain hover:scale-110 transition-transform cursor-pointer"
					/>
					{rightItem && (
						<span
							className={`item-sprite ${
								rightReturning ? 'item-return' : 'item-grow'
							}`}>
							<Image
								src={
									rightItem.type === 'star'
										? '/item_star.png'
										: '/item_mushroom.png'
								}
								alt={
									rightItem.type === 'star'
										? 'Star'
										: 'Mushroom'
								}
								width={96}
								height={96}
								className="object-contain"
							/>
						</span>
					)}
				</div>
			</div>

			{/* Mario vs Bowser Facing Each Other on Brick Ground with Animations */}
			<div className="absolute bottom-16 left-1/3 w-20 h-24 z-30 mario-animate">
				<Image
					src="/char_mario_sm-idle.png"
					alt="Mario"
					fill
					className="object-contain"
				/>
			</div>

			{/* Spike on Brick Ground */}
			<div className="absolute bottom-16 left-1/2 w-12 h-16 z-25 transform -translate-x-1/2">
				<Image
					src="/spike.png"
					alt="Spike"
					fill
					className="object-contain"
				/>
			</div>

			<div className="absolute bottom-16 right-1/3 w-24 h-28 z-30 bowser-animate">
				<Image
					src="/boss.png"
					alt="Bowser"
					fill
					className="object-contain"
				/>
			</div>

			{/* Bottom Brick Ground */}
			<div
				className="absolute bottom-0 left-0 right-0 h-16 z-5"
				style={{
					backgroundImage: 'url(/block_textured.png)',
					backgroundRepeat: 'repeat',
					backgroundSize: '64px 64px',
					backgroundPosition: 'bottom',
				}}></div>

			{/* Falling Boss Animation */}
			{showFallingBoss && (
				<div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 w-16 h-20 z-50 falling-boss">
					<Image
						src="/small_boss.png"
						alt="Falling Boss"
						fill
						className="object-contain"
					/>
				</div>
			)}

			{/* Narrator removed per user request
      <div className="hidden md:block">
        <Narrator 
          position="top" 
          dialogue="Hey player, welcome to GCSRM !"
          upDialogue=""
          hoverDialogues={[
            "Hey !",
            "Hey again !"
          ]}
        />
      </div>
      */}
		</div>
	);
};

export default HeroSection;
