import React from "react";
import Image from "next/image";

const TaskCard = ({ task, domain }) => {
    const handleTaskClick = () => {
        console.log("Task clicked");
    };

    const normalizeLink = (link) => {
        // Remove any extra quotes and check for https://
        let cleanedLink = link.replace(/^"+|"+$/g, ""); // Remove leading and trailing quotes
        if (
            !cleanedLink.startsWith("https://") &&
            !cleanedLink.startsWith("http://")
        ) {
            cleanedLink = `https://${cleanedLink}`; // Add https:// if missing
        }
        return cleanedLink;
    };

    const getMarioIconByDomain = (domain) => {
        switch (domain) {
            case "Technical":
                return "/item_1-up.png"; // 1-UP mushroom for technical
            case "Creatives":
                return "/item_star.png"; // Star for creatives
            case "Corporate":
                return "/item_mushroom.png"; // Red mushroom for corporate
            default:
                return "/coin.png"; // Default coin
        }
    };

    const getMarioColors = (domain) => {
        switch (domain) {
            case "Technical":
                return {
                    primary: "from-blue-400 to-blue-600",
                    border: "border-blue-800",
                    glow: "rgba(59, 130, 246, 0.5)",
                    accent: "bg-blue-200"
                };
            case "Creatives":
                return {
                    primary: "from-purple-400 to-purple-600",
                    border: "border-purple-800",
                    glow: "rgba(147, 51, 234, 0.5)",
                    accent: "bg-purple-200"
                };
            case "Corporate":
                return {
                    primary: "from-red-400 to-red-600",
                    border: "border-red-800",
                    glow: "rgba(239, 68, 68, 0.5)",
                    accent: "bg-red-200"
                };
            default:
                return {
                    primary: "from-gray-400 to-gray-600",
                    border: "border-gray-800",
                    glow: "rgba(107, 114, 128, 0.5)",
                    accent: "bg-gray-200"
                };
        }
    };

    const taskForm = (domain) => {
        switch (domain) {
            case "Technical":
                return "https://www.google.com";
            case "Creatives":
                return "https://forms.gle/1CMRyQnDfyXQDrFj7";
            case "Corporate":
                return "https://docs.google.com/forms/d/e/1FAIpQLSfEpy3fL_Rz_NcJBKYoqIKbXTEvz0TgR2PNPqJq_FjN0RFJiQ/viewform?usp=sf_link";
            default:
                return "";
        }
    };

    const marioIcon = getMarioIconByDomain(domain);
    const colors = getMarioColors(domain);

    return (
        <div className="relative block w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto mt-6 sm:mt-8 z-50 px-4 sm:px-0">
            {/* Mario Block Style Card */}
            <div
                className={`relative bg-gradient-to-b ${colors.primary} rounded-lg border-2 sm:border-4 ${colors.border} shadow-xl sm:shadow-2xl overflow-hidden transition-all duration-300 hover:border-4 sm:hover:border-8 hover:border-yellow-400`}
                style={{
                    boxShadow: `0 0 15px ${colors.glow}, inset 0 2px 4px rgba(255, 255, 255, 0.2)`,
                    minHeight: 'auto'
                }}
            >
                {/* Decorative Mario Elements */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-6 h-6 sm:w-8 sm:h-8 animate-spin">
                    <Image src="/coin.png" alt="Coin" fill className="object-contain" />
                </div>
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 animate-spin" style={{ animationDelay: '1s' }}>
                    <Image src="/coin.png" alt="Coin" fill className="object-contain" />
                </div>

                {/* Main Content - Always Visible */}
                <div className="p-4 sm:p-6 md:p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 animate-bounce">
                            <Image src={marioIcon} alt="Mario Item" fill className="object-contain" />
                        </div>
                        <h3
                            className="text-lg sm:text-xl md:text-2xl font-bold text-black text-center flex-1 mx-2 sm:mx-4"
                            style={{
                                fontFamily: 'Arial Black, sans-serif',
                                textShadow: '1px 1px 0 #fff, 2px 2px 0 #ccc'
                            }}
                        >
                            {task.title}
                        </h3>
                        <div className={`${colors.accent} text-black px-2 py-1 sm:px-4 sm:py-2 rounded-full border-2 border-black text-xs sm:text-sm font-bold`}>
                            {task.taskType}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white bg-opacity-90 rounded-lg border-2 border-black">
                        <h4 className="font-bold text-blue-800 mb-2 sm:mb-3 text-sm sm:text-base">📝 QUEST DESCRIPTION:</h4>
                        <p className="text-sm sm:text-base text-gray-800 text-justify leading-relaxed">
                            {task.description}
                        </p>
                    </div>

                    {/* Guidelines */}
                    <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white bg-opacity-90 rounded-lg border-2 border-black">
                        <h4 className="font-bold text-green-800 mb-2 sm:mb-3 text-sm sm:text-base">⚡ POWER-UP GUIDELINES:</h4>
                        <p className="text-sm sm:text-base text-gray-800 text-justify leading-relaxed">
                            {task.guidelines}
                        </p>
                    </div>

                    {/* Reference Link */}
                    {task.link && (
                        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white bg-opacity-90 rounded-lg border-2 border-black">
                            <h4 className="font-bold text-yellow-800 mb-2 sm:mb-3 text-sm sm:text-base">🔗 REFERENCE WARP PIPE:</h4>
                            <a
                                href={normalizeLink(task.link)}
                                className="inline-block bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full border-2 border-black font-bold text-sm sm:text-base hover:from-blue-500 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    fontFamily: 'Arial Black, sans-serif',
                                    textShadow: '1px 1px 0 #000'
                                }}
                            >
                                🌟 ENTER PIPE 🌟
                            </a>
                        </div>
                    )}

                    {/* Bottom decoration */}
                    <div className="flex justify-center space-x-2 sm:space-x-3 mt-4 sm:mt-6">
                        <div className="w-4 h-4 sm:w-6 sm:h-6 animate-spin">
                            <Image src="/coin.png" alt="Coin" fill className="object-contain" />
                        </div>
                        <div className="w-4 h-4 sm:w-6 sm:h-6 animate-spin" style={{ animationDelay: '0.5s' }}>
                            <Image src="/coin.png" alt="Coin" fill className="object-contain" />
                        </div>
                        <div className="w-4 h-4 sm:w-6 sm:h-6 animate-spin" style={{ animationDelay: '1s' }}>
                            <Image src="/coin.png" alt="Coin" fill className="object-contain" />
                        </div>
                    </div>
                </div>

                {/* Mario Block Pattern */}
                <div className="absolute bottom-2 left-2 right-2 h-1 bg-black opacity-20 rounded"></div>
                <div className="absolute bottom-4 left-4 right-4 h-1 bg-black opacity-10 rounded"></div>
            </div>
        </div>
    );
};

export default TaskCard;