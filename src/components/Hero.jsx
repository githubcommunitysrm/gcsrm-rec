'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const HeroSection = () => {
  const [showFallingBoss, setShowFallingBoss] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [isWindowClosed, setIsWindowClosed] = useState(false);
  const [showPalmTree, setShowPalmTree] = useState(true);

  const startDate = new Date(2025, 7, 29, 0, 0, 0);
  const endDate = new Date(2025, 7, 30, 23, 59, 59);

  const totalSecondsWindow = Math.max(1, Math.floor((endDate.getTime() - startDate.getTime()) / 1000));
  const elapsedSeconds = Math.max(0, Math.floor((now.getTime() - startDate.getTime()) / 1000));
  const progress = Math.min(100, Math.max(0, (elapsedSeconds / totalSecondsWindow) * 100));

  useEffect(() => {
    const handleScroll = () => {
      const domainsSection = document.getElementById('domains-section');
      const heroSection = document.getElementById('hero-section');
      
      if (domainsSection) {
        const domainRect = domainsSection.getBoundingClientRect();
        if (domainRect.top < window.innerHeight && domainRect.bottom > 0) {
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

  useEffect(() => {
    setIsWindowOpen(now.getTime() >= startDate.getTime() && now.getTime() <= endDate.getTime());
    setIsWindowClosed(now.getTime() > endDate.getTime());
  }, [now]);

  // Format time as HHh MMm SSs (no days)
  const formatHourMinSec = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  const secondsUntil = (target) => Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));

  const isTimerExpired = now.getTime() > endDate.getTime();
  const isTimerActive = now.getTime() >= startDate.getTime() && now.getTime() <= endDate.getTime();
  const timeLeft = isTimerActive ? secondsUntil(endDate) : Math.max(0, secondsUntil(startDate));
  const formatTime = formatHourMinSec;

  return (
    <div id="hero-section" className="h-screen relative overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#33a1fd' }}>
      
      {/* Custom CSS for character animations */}
      <style jsx>{`
        @font-face {
          font-family: 'SuperMario256';
          src: url('/SuperMario256.ttf') format('truetype');
          font-display: swap;
        }
        @keyframes marioWalk {
          0% { transform: translateX(0) scaleX(1); }
          45% { transform: translateX(calc(70vw - 200px)) scaleX(1); }
          50% { transform: translateX(calc(70vw - 200px)) scaleX(-1); }
          95% { transform: translateX(-8vw) scaleX(-1); }
          100% { transform: translateX(0) scaleX(1); }
        }
        @keyframes bowserWalk {
          0% { transform: translateX(0) scaleX(1); }
          45% { transform: translateX(calc(-70vw + 200px)) scaleX(1); }
          50% { transform: translateX(calc(-70vw + 200px)) scaleX(-1); }
          95% { transform: translateX(8vw) scaleX(-1); }
          100% { transform: translateX(0) scaleX(1); }
        }
        @media (max-width: 600px) {
          @keyframes marioWalk {
            0% { transform: translateX(0) scaleX(1); }
            45% { transform: translateX(calc(70vw - 100px)) scaleX(1); }
            50% { transform: translateX(calc(70vw - 100px)) scaleX(-1); }
            95% { transform: translateX(-12vw) scaleX(-1); }
            100% { transform: translateX(0) scaleX(1); }
          }
          @keyframes bowserWalk {
            0% { transform: translateX(0) scaleX(1); }
            45% { transform: translateX(calc(-70vw + 100px)) scaleX(1); }
            50% { transform: translateX(calc(-70vw + 100px)) scaleX(-1); }
            95% { transform: translateX(12vw) scaleX(-1); }
            100% { transform: translateX(0) scaleX(1); }
          }
        }
        
        .mario-animate {
          animation: marioWalk 10s ease-in-out infinite;
        }
        
        .bowser-animate {
          animation: bowserWalk 10s ease-in-out infinite;
        }
        
        @keyframes fallingBoss {
          <h1
            style={{
              fontFamily: 'SuperMario256, Arial, sans-serif',
              fontSize: '3rem',
              letterSpacing: '0.1em',
              WebkitTextStroke: '2px #000',
              margin: 0,
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.1em',
            }}
            className="mx-auto drop-shadow-2xl"
          >
          </h1>
        .falling-boss {
          animation: fallingBoss 2s ease-in forwards;
        }
      `}</style>
      
      {/* Floating Clouds - Responsive positioning with better mobile spacing */}
      <div className="absolute top-8 left-2 sm:top-12 sm:left-8 md:top-16 md:left-16 w-32 sm:w-40 md:w-48 h-20 sm:h-26 md:h-32 opacity-90 animate-float">
        <Image src="/cloud-1.png" alt="Cloud" fill className="object-contain" />
      </div>
      <div className="absolute top-12 right-2 sm:top-18 sm:right-12 md:top-24 md:right-20 w-36 sm:w-44 md:w-52 h-24 sm:h-30 md:h-36 opacity-90 animate-float-delayed">
        <Image src="/cloud-2.png" alt="Cloud" fill className="object-contain" />
      </div>

      {/* Main Content */}
      <div className="text-center z-20 px-4 -mt-32">
        
        {/* Main RECRUITMENTS OPEN Heading with Super Mario Font and colored segments */}
        <div className="mb-1" style={{ width: '100%', maxWidth: '100vw', overflowX: 'auto' }}>
          <h1
            style={{
              fontFamily: 'SuperMario256, Arial, sans-serif',
              fontSize: 'clamp(2.2rem, 7vw, 7rem)',
              WebkitTextStroke: 'min(2vw, 3px) #000',
              margin: 0,
              display: 'flex',
              justifyContent: 'center',
              lineHeight: 1.1,
              wordBreak: 'break-word',
              whiteSpace: 'nowrap',
              overflowX: 'auto',
            }}
            className="mx-auto drop-shadow-2xl heading-responsive"
          >
            <span style={{ color: '#FFD93D', textShadow: '4px 4px 0 #3b3b3b, 8px 8px 0 #ff0000' }}>REC</span>
            <span style={{ color: '#D42000', textShadow: '4px 4px 0 #3b3b3b, 8px 8px 0 #ff0000' }}>RUI</span>
            <span style={{ color: '#47A63E', textShadow: '4px 4px 0 #3b3b3b, 8px 8px 0 #ff0000' }}>TME</span>
            <span style={{ color: '#034DA1', textShadow: '4px 4px 0 #3b3b3b, 8px 8px 0 #ff0000' }}>NTS</span>
            <span style={{ color: '#ffe600', textShadow: '4px 4px 0 #3b3b3b, 8px 8px 0 #ff0000', marginLeft: '0.5em' }}>OPEN</span>
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
          className="mx-auto drop-shadow-2xl heading-responsive"
        >
          <span style={{
            color: '#FFD93D',
            textShadow: '4px 4px 0 #3b3b3b, 8px 6px 0 #ff0000',
            letterSpacing: '0.05em',
            textAlign: 'center',
            width: '100%',
            display: 'block',
          }}>GITHUB COMMUNITY SRM</span>
        </h1>



        {/* Direct Registration Button with Timer */}
        <div className="relative mb-12 mt-8">
          <button 
            onClick={() => {
              if (!isTimerExpired) {
                const registrationSection = document.getElementById('registration-section');
                registrationSection?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            disabled={isTimerExpired}
            className={`relative overflow-hidden font-bold py-4 px-8 text-xl rounded border-4 border-black shadow-2xl transform transition-all duration-300 ${
              isTimerExpired 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 hover:scale-105'
            }`}
            style={{ fontFamily: 'Arial Black, sans-serif' }}
          >
            
            <span className={`flex items-center space-x-2 ${isTimerExpired ? 'text-gray-600' : 'text-black'}`}>
              <span className="text-2xl">{isTimerExpired ? '⏰' : ''}</span>
              <span className="flex flex-col items-center">
                <span>{isTimerExpired ? 'REGISTRATION CLOSED!' : 'REGISTER NOW!'}</span>
                <span className="text-xl font-normal text-yellow-300">
                  {isTimerExpired ? 'Time Up!' : `${formatTime(timeLeft)}`}
                </span>
              </span>
              <span className="text-2xl">{isTimerExpired ? '⏰' : ''}</span>
            </span>
          </button>
        </div>
      </div>

      {/* Palm Tree - Left Side - Only visible on first page */}
      {showPalmTree && (
        <div className="absolute bottom-16 left-0 w-32 sm:w-48 md:w-64 h-65 sm:h-98 md:h-130 z-10" style={{ margin: 0, padding: 0 }}>
          <div className="relative w-full h-full">
            <Image src="/tree_palm.png" alt="Palm Tree" fill className="object-contain object-left" />
          </div>
        </div>
      )}


      {/* Mario Pipe - Right Side */}
      <div className="absolute bottom-16 right-0 w-28 h-40 z-10">
        <Image src="/pipe_basic.png" alt="Pipe" width={203} height={305} className="object-contain h-full w-auto" />
      </div>

      {/* Pipe Top - Right Side */}
      <div className="absolute bottom-56 right-0 w-32 h-16 z-20">
        <Image src="/pipe_top.png" alt="Pipe Top" width={232} height={116} className="object-contain h-full w-auto" />
      </div>

      {/* Question Blocks - Left and Right, closer together - Hidden on mobile */}
      <div className="absolute left-20 w-16 h-16 z-20 hidden md:block" style={{ bottom: '300px' }}>
        <Image src="/block_question.png" alt="Question Block" fill className="object-contain hover:scale-110 transition-transform cursor-pointer" />
      </div>
      <div className="absolute w-16 h-16 z-20 hidden md:block" style={{ bottom: '300px', right: '288px' }}>
        <Image src="/block_question-2.png" alt="Question Block" fill className="object-contain hover:scale-110 transition-transform cursor-pointer" />
      </div>

      {/* Mario vs Bowser Facing Each Other on Brick Ground with Animations */}
      <div className="absolute bottom-16 left-1/3 w-20 h-24 z-30 mario-animate">
        <Image src="/char_mario_sm-idle.png" alt="Mario" fill className="object-contain" />
      </div>
      
      {/* Spike on Brick Ground */}
      <div className="absolute bottom-16 left-1/2 w-12 h-16 z-25 transform -translate-x-1/2">
        <Image src="/spike.png" alt="Spike" fill className="object-contain" />
      </div>
      
      <div className="absolute bottom-16 right-1/3 w-24 h-28 z-30 bowser-animate">
        <Image src="/boss.png" alt="Bowser" fill className="object-contain" />
      </div>

      {/* Bottom Brick Ground */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-16 z-5"
        style={{
          backgroundImage: 'url(/block_textured.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '64px 64px',
          backgroundPosition: 'bottom'
        }}
      ></div>

      {/* Falling Boss Animation */}
      {showFallingBoss && (
        <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 w-16 h-20 z-50 falling-boss">
          <Image src="/small_boss.png" alt="Falling Boss" fill className="object-contain" />
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