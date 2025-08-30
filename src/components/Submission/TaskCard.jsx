import React, { useState } from "react";
import Image from "next/image";

const TaskCard = ({ task, domain }) => {
    const [showDetails, setShowDetails] = useState(false);

    const handleTaskClick = () => {
        console.log("Task clicked");
    };

    const normalizeLink = (link) => {
        if (!link) return "";
        let cleanedLink = link.replace(/^"+|"+$/g, "");
        if (
            !cleanedLink.startsWith("https://") &&
            !cleanedLink.startsWith("http://")
        ) {
            cleanedLink = `https://${cleanedLink}`;
        }
        return cleanedLink;
    };

    const getMarioIconByDomain = (domain) => {
        switch (domain) {
            case "Technical":
                return "/item_1-up.png";
            case "Creatives":
                return "/item_star.png";
            case "Corporate":
                return "/item_mushroom.png";
            default:
                return "/coin.png";
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
        // Use custom form if provided, otherwise use domain default
        if (task.submissionForm) return task.submissionForm;

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

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "Beginner":
                return "bg-green-100 text-green-800 border-green-300";
            case "Intermediate":
                return "bg-yellow-100 text-yellow-800 border-yellow-300";
            case "Advanced":
                return "bg-red-100 text-red-800 border-red-300";
            default:
                return "bg-gray-100 text-gray-800 border-gray-300";
        }
    };

    const marioIcon = getMarioIconByDomain(domain);
    const colors = getMarioColors(domain);

    return (
        <div className="relative block w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto mt-6 sm:mt-8 z-50 px-4 sm:px-0">
            <div
                className={`relative bg-gradient-to-b ${colors.primary} rounded-lg border-2 sm:border-4 ${colors.border} shadow-xl sm:shadow-2xl overflow-hidden transition-all duration-300 hover:border-4 sm:hover:border-8 hover:border-yellow-400`}
                style={{
                    boxShadow: `0 0 15px ${colors.glow}, inset 0 2px 4px rgba(255, 255, 255, 0.2)`,
                    minHeight: 'auto'
                }}
            >
                {/* Decorative Mario Elements */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-6 h-6 sm:w-8 sm:h-8">
                    <Image src="/coin.png" alt="Coin" fill className="object-contain" />
                </div>
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-6 h-6 sm:w-8 sm:h-8" style={{ animationDelay: '1s' }}>
                    <Image src="/coin.png" alt="Coin" fill className="object-contain" />
                </div>

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

                    {/* Metadata Row */}
                    {(task.difficulty || task.estimatedTime || task.subdomain) && (
                        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 justify-center">
                            {task.difficulty && (
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(task.difficulty)}`}>
                                    {task.difficulty}
                                </span>
                            )}
                            {task.estimatedTime && (
                                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-300">
                                    {task.estimatedTime}
                                </span>
                            )}
                            {task.subdomain && (
                                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-semibold border border-orange-300">
                                    {task.subdomain}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Description */}
                    <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white bg-opacity-90 rounded-lg border-2 border-black">
                        <h4 className="font-bold text-blue-800 mb-2 sm:mb-3 text-sm sm:text-base">QUEST DESCRIPTION:</h4>
                        <p className="text-sm sm:text-base text-gray-800 text-justify leading-relaxed">
                            {task.description}
                        </p>
                    </div>

                    {/* Guidelines */}
                    <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white bg-opacity-90 rounded-lg border-2 border-black">
                        <h4 className="font-bold text-green-800 mb-2 sm:mb-3 text-sm sm:text-base">POWER-UP GUIDELINES:</h4>
                        <p className="text-sm sm:text-base text-gray-800 text-justify leading-relaxed">
                            {task.guidelines}
                        </p>
                    </div>

                    {/* Steps Section */}
                    {task.steps && task.steps.length > 0 && (
                        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white bg-opacity-90 rounded-lg border-2 border-black">
                            <div className="flex items-center justify-between mb-2 sm:mb-3">
                                <h4 className="font-bold text-purple-800 text-sm sm:text-base">QUEST STEPS:</h4>
                                <button
                                    onClick={() => setShowDetails(!showDetails)}
                                    className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-md hover:bg-purple-200 transition-colors"
                                >
                                    {showDetails ? "Hide Steps" : "Show Steps"}
                                </button>
                            </div>
                            {showDetails && (
                                <ol className="text-sm sm:text-base text-gray-800 space-y-2 max-h-60 overflow-y-auto">
                                    {task.steps.map((step, index) => (
                                        <li key={index} className="flex">
                                            <span className="font-bold text-purple-600 mr-3 mt-0.5 flex-shrink-0">
                                                {index + 1}.
                                            </span>
                                            <span className="leading-relaxed">{step}</span>
                                        </li>
                                    ))}
                                </ol>
                            )}
                        </div>
                    )}

                    {/* Tech Stack Section */}
                    {task.techStack && task.techStack.length > 0 && (
                        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white bg-opacity-90 rounded-lg border-2 border-black">
                            <h4 className="font-bold text-indigo-800 mb-2 sm:mb-3 text-sm sm:text-base">TECH STACK:</h4>
                            <div className="flex flex-wrap gap-2">
                                {task.techStack.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md text-xs font-semibold border border-indigo-200 hover:bg-indigo-200 transition-colors"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Outputs Section */}
                    {task.outputs && task.outputs.length > 0 && (
                        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white bg-opacity-90 rounded-lg border-2 border-black">
                            <h4 className="font-bold text-orange-800 mb-2 sm:mb-3 text-sm sm:text-base">DELIVERABLES:</h4>
                            <ul className="text-sm sm:text-base text-gray-800 space-y-1">
                                {task.outputs.map((output, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-orange-600 mr-2 mt-1 flex-shrink-0">•</span>
                                        <span className="leading-relaxed">{output}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Evaluation Criteria */}
                    {task.evaluation && (
                        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white bg-opacity-90 rounded-lg border-2 border-black">
                            <h4 className="font-bold text-pink-800 mb-2 sm:mb-3 text-sm sm:text-base">EVALUATION CRITERIA:</h4>
                            <p className="text-sm sm:text-base text-gray-800 text-justify leading-relaxed">
                                {task.evaluation}
                            </p>
                        </div>
                    )}

                    {/* Datasets */}
                    {task.datasets && task.datasets.length > 0 && (
                        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white bg-opacity-90 rounded-lg border-2 border-black">
                            <h4 className="font-bold text-teal-800 mb-2 sm:mb-3 text-sm sm:text-base">DATASETS:</h4>
                            <ul className="text-sm sm:text-base text-gray-800 space-y-1">
                                {task.datasets.map((dataset, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-teal-600 mr-2 mt-1 flex-shrink-0">•</span>
                                        <span className="leading-relaxed">{dataset}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Tags */}
                    {task.tags && task.tags.length > 0 && (
                        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white bg-opacity-90 rounded-lg border-2 border-black">
                            <h4 className="font-bold text-cyan-800 mb-2 sm:mb-3 text-sm sm:text-base">TAGS:</h4>
                            <div className="flex flex-wrap gap-2">
                                {task.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded-md text-xs font-semibold border border-cyan-200"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Reference Link */}
                    {task.link && (
                        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white bg-opacity-90 rounded-lg border-2 border-black">
                            <h4 className="font-bold text-yellow-800 mb-2 sm:mb-3 text-sm sm:text-base">REFERENCE WARP PIPE:</h4>
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
                                ENTER PIPE
                            </a>
                        </div>
                    )}

                    {/* Submission Instructions */}
                    {task.submissionInstructions && (
                        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-yellow-50 bg-opacity-90 rounded-lg border-2 border-yellow-400">
                            <h4 className="font-bold text-yellow-800 mb-2 sm:mb-3 text-sm sm:text-base">SUBMISSION INSTRUCTIONS:</h4>
                            <p className="text-sm sm:text-base text-yellow-900 leading-relaxed">
                                {task.submissionInstructions}
                            </p>
                        </div>
                    )}

                    {/* Action Button */}
                    {/* <div className="text-center mb-4 sm:mb-6">
                        <a
                            href={taskForm(domain)}
                            className={`inline-block bg-gradient-to-r ${colors.primary} text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full border-2 sm:border-4 border-black font-bold text-sm sm:text-base hover:scale-105 transform transition-all duration-200 shadow-lg`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                fontFamily: 'Arial Black, sans-serif',
                                textShadow: '1px 1px 0 #000'
                            }}
                        >
                            VIEW TASK FORM
                        </a>
                    </div> */}

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