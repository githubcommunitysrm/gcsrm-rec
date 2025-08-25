import React from "react";
import Image from "next/image";

const ProfileCard = ({ name, regNo, domain }) => {
    // Function to determine the role based on domain
    const getRoleByDomain = (domain) => {
        switch (domain) {
            case "Technical":
                return "Technical Hero";
            case "Creative":
                return "Creative Master";
            case "Corporate":
                return "Corporate Champion";
            default:
                return "Adventurer";
        }
    };

    const role = getRoleByDomain(domain);

    // Get Mario-themed assets based on domain
    const getMarioAssetsByDomain = (domain) => {
        switch (domain) {
            case "Technical":
                return {
                    character: "/char_mario_sm-idle.png",
                    powerUp: "/item_1-up.png",
                    block: "/block_unbreakable-1.png",
                    color: "#D42000", // Mario Red
                    bgColor: "from-red-400 to-red-600"
                };
            case "Creative":
                return {
                    character: "/quean.png",
                    powerUp: "/item_star.png",
                    block: "/block_unbreakable-2.png",
                    color: "#47A63E", // Mario Green
                    bgColor: "from-green-400 to-green-600"
                };
            case "Corporate":
                return {
                    character: "/boss.png",
                    powerUp: "/item_mushroom.png",
                    block: "/block_unbreakable.png",
                    color: "#034DA1", // Mario Blue
                    bgColor: "from-blue-400 to-blue-600"
                };
            default:
                return {
                    character: "/char_mario_sm-idle.png",
                    powerUp: "/item_coin.png",
                    block: "/block_textured.png",
                    color: "#ffe600", // Mario Yellow
                    bgColor: "from-yellow-400 to-yellow-600"
                };
        }
    };

    const marioAssets = getMarioAssetsByDomain(domain);

    return (
        <div className="relative w-full sm:w-96 mx-auto sm:mx-0">
            <style jsx>{`
                @font-face {
                    font-family: 'SuperMario256';
                    src: url('/SuperMario256.ttf') format('truetype');
                    font-display: swap;
                }
                @keyframes coinSpin {
                    0% { transform: rotateY(0deg); }
                    100% { transform: rotateY(360deg); }
                }
                @keyframes powerUpFloat {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                }
                @keyframes blockBump {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-4px); }
                }
                .coin-spin {
                    animation: coinSpin 2s linear infinite;
                }
                .power-up-float {
                    animation: powerUpFloat 2s ease-in-out infinite;
                }
                .block-bump {
                    animation: blockBump 3s ease-in-out infinite;
                }
                .mario-card {
                    background: linear-gradient(135deg, #FFD93D 0%, #FFA500 50%, #FF6B35 100%);
                    border: 4px solid #000;
                    box-shadow: 8px 8px 0px #000, 12px 12px 0px rgba(0,0,0,0.3);
                }
                .mario-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 12px 12px 0px #000, 16px 16px 0px rgba(0,0,0,0.3);
                }
            `}</style>

            {/* Floating Question Block */}
            <div className="absolute -top-4 -right-4 w-12 h-12 z-20 block-bump">
                <Image
                    src={marioAssets.block}
                    alt="Question Block"
                    fill
                    className="object-contain hover:scale-110 transition-transform cursor-pointer"
                />
            </div>

            {/* Power-up floating above */}
            <div className="absolute -top-6 left-4 w-8 h-8 z-20 power-up-float">
                <Image
                    src={marioAssets.powerUp}
                    alt="Power Up"
                    fill
                    className="object-contain"
                />
            </div>

            {/* Main Card */}
            <div className="mario-card flex items-center h-32 rounded-lg p-6 transition-all duration-300 relative overflow-hidden">

                {/* Background Pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'url(/block_textured.png)',
                        backgroundRepeat: 'repeat',
                        backgroundSize: '32px 32px'
                    }}
                />

                {/* Character Avatar */}
                <section className="relative flex justify-center items-center w-20 h-20 bg-white rounded-full shadow-lg border-4 border-black hover:scale-110 duration-300 z-10">
                    <div className="w-16 h-16 relative">
                        <Image
                            src={marioAssets.character}
                            alt={`${domain} Character`}
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Spinning coin effect */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 coin-spin">
                        <Image
                            src="/coin.png"
                            alt="Coin"
                            fill
                            className="object-contain"
                        />
                    </div>
                </section>

                {/* Pipe separator */}
                <div className="relative w-4 h-16 mx-4">
                    <Image
                        src="/pipe_basic.png"
                        alt="Pipe"
                        fill
                        className="object-contain opacity-60"
                    />
                </div>

                {/* Profile Information */}
                <section className="flex-1 z-10">
                    <div>
                        <h3
                            className="text-black font-bold text-xl mb-1"
                            style={{
                                fontFamily: 'SuperMario256, Arial, sans-serif',
                                textShadow: '2px 2px 0 #fff, 3px 3px 0 rgba(0,0,0,0.3)',
                                color: marioAssets.color
                            }}
                        >
                            {name.toUpperCase()}
                        </h3>

                        <h4 className="text-gray-800 font-bold text-sm mb-2 font-mono bg-white bg-opacity-70 px-2 py-1 rounded border-2 border-black inline-block">
                            {regNo}
                        </h4>

                        <div className="flex items-center">
                            <h3
                                className="font-bold text-md"
                                style={{
                                    fontFamily: 'Arial Black, sans-serif',
                                    color: '#fff',
                                    textShadow: '2px 2px 0 #000'
                                }}
                            >
                                {role}
                            </h3>
                        </div>
                    </div>
                </section>

                {/* Domain Badge */}
                {/* <div className="absolute top-2 right-2 z-20">
                    <div
                        className={`px-3 py-1 rounded-full border-2 border-black text-xs font-bold text-white bg-gradient-to-r ${marioAssets.bgColor}`}
                        style={{
                            fontFamily: 'Arial Black, sans-serif',
                            textShadow: '1px 1px 0 #000'
                        }}
                    >
                        {domain.toUpperCase()}
                    </div>
                </div> */}
            </div>

            <div className="flex justify-between items-center mt-2 px-2">
                {/* Ground blocks */}
                <div className="flex space-x-1">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="w-4 h-4 relative opacity-60">
                            <Image
                                src="/block_textured.png"
                                alt="Ground Block"
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>

                <div
                    className="text-xs font-bold text-black"
                    style={{
                        fontFamily: 'SuperMario256, Arial, sans-serif',
                        textShadow: '1px 1px 0 #fff'
                    }}
                >
                    ★ LEVEL 1 ★
                </div>

                <div className="flex space-x-1">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="w-4 h-4 relative opacity-60">
                            <Image
                                src="/block_textured.png"
                                alt="Ground Block"
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;