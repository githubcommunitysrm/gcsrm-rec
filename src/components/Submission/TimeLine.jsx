import React from "react";
import Image from "next/image";

// Mario-themed step mapping
const steps = [
  {
    id: 1,
    key: "registered",
    label: "GAME START!",
    marioLabel: "Welcome to the Kingdom!",
    castle: "/browser.png",
    flag: "/flag.png",
    ground: "/brick-ground.png",
  },
  {
    id: 2,
    key: "taskSubmitted",
    label: "QUEST DONE!",
    marioLabel: "Quest Submitted!",
    castle: "/goomba.png",
    flag: "/flag_blue.png",
    ground: "/brick-ground.png",
  },
  {
    id: 3,
    key: "interviewShortlisted",
    label: "BATTLE TIME!",
    marioLabel: "Boss Battle Awaits!",
    castle: "/luigi.png",
    flag: "/flag_red.png",
    ground: "/brick-ground.png",
  },
  {
    id: 4,
    key: "onboarding",
    label: "MISSION WON!",
    marioLabel: "Welcome to the Team!",
    castle: "/mario.png",
    flag: "/flag.png",
    ground: "/brick-ground.png",
  },
];

// Helper function to get current step index from status
const getCurrentStep = (status) => {
  const stepIndex = steps.findIndex((step) => step.key === status);
  return stepIndex + 1;
};

// Helper function to get Mario character position
const getMarioPosition = (currentStep) => {
  if (currentStep === 1) return "8%";
  if (currentStep === 2) return "32%";
  if (currentStep === 3) return "68%";
  if (currentStep === 4) return "89%";
  return "8%";
};

// Helper function to get path completion
const getPathCompletion = (currentStep) => {
  if (currentStep === 1) return "0%";
  if (currentStep === 2) return "30%";
  if (currentStep === 3) return "70%";
  if (currentStep === 4) return "100%";
  return "0%";
};

const MarioTimelineStep = ({ step, currentStep, index }) => {
  const isCompleted = step.id <= currentStep;
  const isCurrent = step.id === currentStep;
  const isFuture = step.id > currentStep;

  return (
    <div className="flex flex-col items-center relative z-20">
      <style jsx>{`
        @font-face {
          font-family: "SuperMario256";
          src: url("/SuperMario256.ttf") format("truetype");
          font-display: swap;
        }
        @keyframes castleBounce {
          0%,
          100% {
            transform: translateY(-8px);
          }
          50% {
            transform: translateY(-16px);
          }
        }
        @keyframes flagWave {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(3deg);
          }
          75% {
            transform: rotate(-3deg);
          }
        }
        @keyframes glowPulse {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
          }
          50% {
            box-shadow: 0 0 30px rgba(255, 215, 0, 1),
              0 0 40px rgba(255, 215, 0, 0.6);
          }
        }
        .castle-bounce {
          animation: castleBounce 2s ease-in-out infinite;
        }
        .flag-wave {
          animation: flagWave 2s ease-in-out infinite;
        }
        .current-glow {
          animation: glowPulse 2s ease-in-out infinite;
        }
        .mario-text {
          font-family: "SuperMario256", Arial, sans-serif;
          text-shadow: 2px 2px 0 #000, 3px 3px 0 rgba(0, 0, 0, 0.3);
        }
      `}</style>

      {/* Castle/Checkpoint */}
      <div className={`relative ${isCurrent ? "castle-bounce " : ""}`}>
        {/* Flag above castle */}
        <div
          className={`absolute -top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 z-30 mt-5 ${
            isCompleted || isCurrent ? "flag-wave" : ""
          }`}
        >
          <Image
            src={isCompleted ? step.flag : "/flag_gray.png"}
            alt="Flag"
            fill
            className="object-contain"
          />
        </div>

        {/* Castle */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 mt-7">
          <Image
            src={step.castle}
            alt={`${step.label} Castle`}
            fill
            className={`object-contain transition-all duration-500 ${
              isCompleted ? "brightness-100" : "brightness-50 grayscale"
            }`}
          />

          {/* Completion Star */}
          {isCompleted && (
            <div className="absolute -top-2 -right-2 w-6 h-6 z-30">
              <Image
                src="/item_star.png"
                alt="Completed Star"
                fill
                className="object-contain animate-spin"
                style={{ animationDuration: "3s" }}
              />
            </div>
          )}

          {/* Current Step Indicator */}
          {isCurrent && (
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4">
              <Image
                src="/item_1-up.png"
                alt="Current Position"
                fill
                className="object-contain animate-bounce"
              />
            </div>
          )}
        </div>
      </div>

      {/* Labels */}
      <div className="mt-4 text-center">
        {/* Main Label */}
        <div
          className={`mario-text text-sm sm:text-base font-bold mb-1 ${
            isCompleted
              ? "text-yellow-400"
              : isCurrent
              ? "text-green-400"
              : "text-gray-500"
          }`}
        >
          {step.label}
        </div>

        {/* Sub Label */}
        <div
          className={`text-xs sm:text-sm font-medium ${
            isCompleted
              ? "text-white"
              : isCurrent
              ? "text-yellow-300"
              : "text-gray-400"
          }`}
        >
          {step.marioLabel}
        </div>

        {/* Progress Indicator */}
        {/*{isCompleted && (
                    <div className="flex justify-center mt-2 space-x-1">
                        {[1, 2, 3].map((coin) => (
                            <div key={coin} className="w-3 h-3">
                                <Image
                                    src="/coin.png"
                                    alt="Coin"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </div>
                )}*/}
      </div>
    </div>
  );
};

const TimeLine = ({ status }) => {
  const currentStep = getCurrentStep(status);
  const marioPosition = getMarioPosition(currentStep);
  const pathCompletion = getPathCompletion(currentStep);

  return (
    <div className="py-16 px-4">
      <style jsx>{`
        @keyframes marioWalk {
          0%,
          100% {
            transform: translateX(0px) scaleX(1);
          }
          50% {
            transform: translateX(2px) scaleX(1);
          }
        }
        @keyframes cloudFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .mario-walk {
          animation: marioWalk 1s ease-in-out infinite;
        }
        .cloud-float {
          animation: cloudFloat 4s ease-in-out infinite;
        }
        .mario-world-bg {
          background: linear-gradient(
            180deg,
            #87ceeb 0%,
            /* Sky blue */ #98d8e8 50%,
            /* Light blue */ #90ee90 100% /* Light green */
          );
        }
      `}</style>

      <div className="mario-world-bg rounded-2xl p-8 border-4 border-black shadow-lg relative overflow-hidden min-h-80">
        {/* Background Clouds */}
        {/*<div className="absolute top-4 left-10 w-16 h-8 cloud-float z-10">
                    <Image src="/cloud_lg.png" alt="Cloud" fill className="object-contain opacity-70" />
                </div>
                <div className="absolute top-6 right-16 w-12 h-6 cloud-float z-10" style={{ animationDelay: '2s' }}>
                    <Image src="/cloud_lg.png" alt="Cloud" fill className="object-contain opacity-50" />
                </div>
                <div className="absolute top-2 left-1/2 w-14 h-7 cloud-float z-10" style={{ animationDelay: '1s' }}>
                    <Image src="/cloud_lg.png" alt="Cloud" fill className="object-contain opacity-60" />
                </div>*/}

        {/* Ground Path */}
        <div className="relative w-full max-w-6xl mx-auto">
          {/* Ground Line */}
          <div
            className="absolute bottom-20 left-0 w-full h-8 z-0 rounded"
            style={{
              backgroundImage: "url(/brick-ground.png)",
              backgroundRepeat: "repeat-x",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Completed Path */}
          <div
            className="absolute bottom-20 left-0 h-8 z-10 rounded bg-gradient-to-r from-green-400 to-yellow-400 opacity-80 transition-all duration-1000"
            style={{ width: pathCompletion }}
          />

          {/* Mario Character */}
          <div
            className="absolute bottom-0 z-30 transition-all duration-1000 mario-walk"
            style={{ left: marioPosition, transform: "translateX(-50%)" }}
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10">
              <Image
                src={
                  currentStep === steps.length
                    ? "/char_mario_sm-jump.png"
                    : "/char_mario_sm-idle.png"
                }
                alt="Mario"
                fill
                className="object-contain"
              />
            </div>

            {/* Mario's current status bubble */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-2 py-1 text-xs font-bold border-2 border-black whitespace-nowrap text-black">
              {currentStep === 1 && "Let's-a go!"}
              {currentStep === 2 && "Mamma mia!"}
              {currentStep === 3 && "Here we go!"}
              {currentStep === 4 && "Wahoo!"}
            </div>
          </div>

          {/* Timeline Steps */}
          <div
            className="flex justify-between items-end relative z-20 pt-12 pb-8"
            style={{ paddingLeft: "5%", paddingRight: "5%" }}
          >
            {steps.map((step, index) => (
              <MarioTimelineStep
                key={step.key}
                step={step}
                currentStep={currentStep}
                index={index}
              />
            ))}
          </div>

          {/* Progress Info */}
          <div className="mt-4 text-center">
            <div
              className="inline-flex items-center bg-black bg-opacity-80 text-white px-4 py-2 rounded-full text-sm font-bold"
              style={{
                fontFamily: "SuperMario256, Arial, sans-serif",
              }}
            >
              <div className="w-4 h-4 mr-2">
                <Image
                  src="/item_coin.png"
                  alt="Progress"
                  fill
                  className="object-contain"
                />
              </div>
              WORLD {currentStep}-{steps.length}
              <div className="w-4 h-4 ml-2">
                {/* <Image src="/item_star.png" alt="Star" fill className="object-contain" /> */}
              </div>
            </div>

            {currentStep === steps.length && (
              <div className="mt-4 text-center">
                <div
                  className="text-2xl font-bold text-yellow-400 animate-bounce"
                  style={{
                    fontFamily: "SuperMario256, Arial, sans-serif",
                    textShadow: "2px 2px 0 #000",
                  }}
                >
                  🏆 CONGRATULATIONS! 🏆
                </div>
                <div className="text-white text-sm mt-2">
                  You've completed your journey to join our kingdom!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
