import React from "react";
import Image from "next/image";

const EmailLogin = ({ email, emailError, handleEmailChange, handleLogin }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6" style={{ backgroundColor: '#33a1fd' }}>
            <style jsx>{`
                @font-face {
                    font-family: 'SuperMario256';
                    src: url('/SuperMario256.ttf') format('truetype');
                    font-display: swap;
                }
                @keyframes cloudFloat {
                    0% { transform: translateY(0); }
                    50% { transform: translateY(-18px); }
                    100% { transform: translateY(0); }
                }
                .cloud-float {
                    animation: cloudFloat 4s ease-in-out infinite;
                }
                .cloud-float-delayed {
                    animation: cloudFloat 4s ease-in-out infinite;
                    animation-delay: 2s;
                }
                @keyframes marioBounce {
                    0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
                    40%, 43% { transform: translateY(-15px); }
                }
                .mario-bounce {
                    animation: marioBounce 2s ease-in-out infinite;
                }
                @keyframes powerUpGlow {
                    0%, 100% { box-shadow: 0 0 20px rgba(255, 230, 0, 0.8); }
                    50% { box-shadow: 0 0 30px rgba(255, 230, 0, 1), 0 0 40px rgba(255, 230, 0, 0.6); }
                }
                .power-up-glow {
                    animation: powerUpGlow 2s ease-in-out infinite;
                }
            `}</style>

            {/* Floating Clouds */}
            <div className="absolute top-8 left-8 w-32 h-20 opacity-90 cloud-float">
                <Image src="/cloud-1.png" alt="Cloud" fill className="object-contain" />
            </div>
            <div className="absolute top-12 right-8 w-36 h-24 opacity-90 cloud-float-delayed">
                <Image src="/cloud-2.png" alt="Cloud" fill className="object-contain" />
            </div>

            {/* Question Blocks scattered around */}
            <div className="absolute top-20 left-20 w-12 h-12 hidden md:block">
                <Image src="/block_question.png" alt="Question Block" fill className="object-contain hover:scale-110 transition-transform" />
            </div>
            <div className="absolute top-32 right-24 w-12 h-12 hidden md:block">
                <Image src="/block_question-2.png" alt="Question Block" fill className="object-contain hover:scale-110 transition-transform" />
            </div>

            {/* Main Login Container */}
            <div className="relative w-full max-w-sm sm:max-w-md">
                {/* Mario Character */}
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-16 h-20 mario-bounce">
                    <Image src="/char_mario_sm-idle.png" alt="Mario" fill className="object-contain" />
                </div>

                {/* Login Form styled like a Mario Block */}
                <div className="relative bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-lg border-4 border-black shadow-2xl p-6 power-up-glow">
                    {/* Title with Mario Font */}
                    <h2
                        className="text-2xl sm:text-3xl font-bold mb-6 text-center text-black"
                        style={{
                            fontFamily: 'SuperMario256, Arial, sans-serif',
                            textShadow: '2px 2px 0 #fff, 4px 4px 0 #ccc',
                            WebkitTextStroke: '1px #000'
                        }}
                    >
                        LOGIN TO YOUR QUEST!
                    </h2>

                    {/* Subtitle */}
                    <p className="text-center text-black font-bold mb-4 text-sm">
                        🎮 Enter your SRMIST email to continue your adventure! 🎮
                    </p>

                    {/* Email Input styled like a Mario pipe */}
                    <div className="relative mb-4">
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="your-email@srmist.edu.in"
                            className={`w-full p-3 rounded-lg border-3 border-black text-black font-semibold bg-white placeholder-gray-500 focus:outline-none focus:ring-4 transition-all ${emailError
                                    ? "border-red-500 focus:ring-red-300 bg-red-50"
                                    : "focus:ring-blue-300"
                                }`}
                            style={{
                                fontSize: '16px',
                                fontFamily: 'Arial, sans-serif'
                            }}
                        />
                        {/* Pipe decoration */}
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8">
                            <Image src="/pipe_basic.png" alt="Pipe" fill className="object-contain opacity-30" />
                        </div>
                    </div>

                    {/* Error Message */}
                    {emailError && (
                        <div className="flex items-center justify-center mb-4 p-2 bg-red-100 border-2 border-red-500 rounded">
                            <span className="text-xl mr-2">❌</span>
                            <p className="text-red-700 font-bold text-sm">
                                {emailError}
                            </p>
                        </div>
                    )}

                    {/* Submit Button styled like a Super Mushroom */}
                    <button
                        onClick={handleLogin}
                        disabled={!!emailError}
                        className={`w-full py-3 px-4 rounded-lg border-3 border-black font-bold text-lg transition-all duration-200 transform ${emailError
                                ? "bg-gray-400 cursor-not-allowed text-gray-600"
                                : "bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-black hover:scale-105 active:scale-95"
                            }`}
                        style={{
                            fontFamily: 'Arial Black, sans-serif',
                            textShadow: emailError ? 'none' : '1px 1px 0 #fff'
                        }}
                    >
                        {emailError ? '🚫 FIX ERROR FIRST!' : '🍄 START ADVENTURE!'}
                    </button>

                    {/* Decorative coins */}
                    <div className="flex justify-center mt-4 space-x-2">
                        <div className="w-6 h-6 relative">
                            <Image src="/coin.png" alt="Coin" fill className="object-contain animate-pulse" />
                        </div>
                        <div className="w-6 h-6 relative">
                            <Image src="/coin.png" alt="Coin" fill className="object-contain animate-pulse" style={{ animationDelay: '0.5s' }} />
                        </div>
                        <div className="w-6 h-6 relative">
                            <Image src="/coin.png" alt="Coin" fill className="object-contain animate-pulse" style={{ animationDelay: '1s' }} />
                        </div>
                    </div>
                </div>

                {/* Bottom decoration - Bowser */}
                <div className="absolute -bottom-8 right-4 w-12 h-14 hidden sm:block">
                    <Image src="/small_boss.png" alt="Bowser" fill className="object-contain opacity-80" />
                </div>
            </div>

            {/* Bottom ground texture */}
            <div
                className="absolute bottom-0 left-0 right-0 h-16 z-10"
                style={{
                    backgroundImage: 'url(/block_textured.png)',
                    backgroundRepeat: 'repeat',
                    backgroundSize: '64px 64px',
                    backgroundPosition: 'bottom'
                }}
            />

            {/* Left Pipe */}
            <div className="absolute bottom-16 left-4 w-16 h-24 hidden lg:block">
                <Image src="/pipe_basic.png" alt="Pipe" fill className="object-contain" />
            </div>

            {/* Right Pipe */}
            <div className="absolute bottom-16 right-4 w-16 h-24 hidden lg:block">
                <Image src="/pipe_basic.png" alt="Pipe" fill className="object-contain" />
            </div>
        </div>
    );
};

export default EmailLogin;