"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import ProfileCard from "@/components/Submission/ProfileCard";
import TimeLine from "@/components/Submission/TimeLine";
import EmailLogin from "@/components/Submission/EmailLogin";
import TaskCard from "@/components/Submission/TaskCard";

const taskTypeInstructions = {
    Technical:
        "Choose the task as per your preference, for Web Dev Choose any one among Front End, Back End or Full Stack. Click the Submit Task button to submit your task before the deadline.",
    Creatives:
        "Submit your creative designs or content for review. Ensure your work is original and aligns with the provided guidelines. Click the Submit Task button to submit your work.",
    Corporate:
        "Complete all sections thoughtfully and submit your responses by the deadline using your SRM email ID click the 'View Task' Button to Open submission form. Keep your answers original and true to yourself. (No AI/ChatGPT assistance allowed!)"
};

const getSubmitButtonText = (domain) => {
    return domain === "Corporate" ? "View Task" : "Submit Task";
};

const Dashboard = () => {
    const [email, setEmail] = useState("");
    const [participantData, setParticipantData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [selectedTaskType, setSelectedTaskType] = useState("");

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@srmist\.edu\.in$/;
        if (!emailPattern.test(email)) {
            return "Please enter a valid @srmist.edu.in email address.";
        }
        return "";
    };

    const resetForm = () => {
        setError("");
        setParticipantData(null);
        setEmail("");
        setEmailError("");
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        const errorMessage = validateEmail(newEmail);
        setEmailError(errorMessage);
    };

    const handleLogin = async () => {
        setLoading(true);
        setError("");

        const validationError = validateEmail(email);
        if (validationError) {
            setEmailError(validationError);
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get("/api/task", {
                params: { email }
            });
            setTimeout(() => {
                setParticipantData(response.data);
                setLoading(false);
            }, 2000);
        } catch (error) {
            setTimeout(() => {
                if (error.response?.status === 404) {
                    setError("Participant Not Found");
                } else {
                    setError(
                        error.response?.data?.message ||
                        "Failed to fetch data. Please try again."
                    );
                }
                setLoading(false);
            }, 2000);
        }
    };

    // Group tasks by task type
    const groupTasksByType = (tasks) => {
        const grouped = {};

        tasks.forEach((task) => {
            if (!grouped[task.taskType]) {
                grouped[task.taskType] = [];
            }
            grouped[task.taskType].push(task);
        });

        return grouped;
    };

    // Extract unique task types
    const getTaskTypes = (tasks) => {
        const taskTypes = new Set();
        tasks.forEach((task) => {
            taskTypes.add(task.taskType);
        });
        return Array.from(taskTypes);
    };

    useEffect(() => {
        if (participantData && participantData.tasks.length > 0) {
            const taskTypes = getTaskTypes(participantData.tasks);
            if (taskTypes.length > 0 && !selectedTaskType) {
                // Set the first task type as default
                setSelectedTaskType(taskTypes[0]);
            }
        }
    }, [participantData, selectedTaskType]);

    // Render buttons for each task type
    const renderTaskTypeButtons = (taskTypes) => {
        if (taskTypes.length > 1) {
            return (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-flow-col-dense">
                    {taskTypes.map((type) => (
                        <button
                            key={type}
                            className={`px-4 py-2 rounded-md text-white font-poppins ${selectedTaskType === type
                                ? "bg-green-500"
                                : "bg-gray-700"
                                } hover:bg-green-600`}
                            onClick={() => setSelectedTaskType(type)}
                        >
                            {type} Tasks
                        </button>
                    ))}
                </div>
            );
        } else {
            return (
                <div className="center">
                    {taskTypes.map((type) => (
                        <button
                            key={type}
                            className={`px-4 py-2 rounded-md text-white font-poppins ${selectedTaskType === type
                                ? "bg-green-500"
                                : "bg-gray-700"
                                } hover:bg-green-600`}
                            onClick={() => setSelectedTaskType(type)}
                        >
                            {type} Tasks
                        </button>
                    ))}
                </div>
            );
        }
    };

    const renderTasks = (groupedTasks) => {
        const tasksToShow = groupedTasks[selectedTaskType] || [];

        return tasksToShow.map((task, index) => (
            <TaskCard
                key={task._id}
                task={task}
                domain={participantData.domain}
            />
        ));
    };

    // Render instructions for the selected task type (Mario-themed version integrated above)

    const taskForm = (domain) => {
        switch (domain) {
            case "Technical":
                return "https://forms.gle/TNJcF9X6xxXYo8Ax9";
            case "Creatives":
                return "https://forms.gle/1CMRyQnDfyXQDrFj7";
            case "Corporate":
                return "https://docs.google.com/forms/d/e/1FAIpQLSfEpy3fL_Rz_NcJBKYoqIKbXTEvz0TgR2PNPqJq_FjN0RFJiQ/viewform?usp=sf_link";
            default:
                return "";
        }
    };

    return (
        <section
            className={`relative w-full ${participantData ? "" : "h-[80vh]"
                } overflow-hidden`}
        >
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="/bghero.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-bg_black"></div>

            {/* Mario-themed Loading or error overlay */}
            {(loading || error) && (
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6" style={{ backgroundColor: '#33a1fd' }}>
                    <style jsx>{`
                        @font-face {
                            font-family: 'SuperMario256';
                            src: url('/SuperMario256.ttf') format('truetype');
                            font-display: swap;
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
                        @keyframes coinSpin {
                            0% { transform: rotateY(0deg); }
                            100% { transform: rotateY(360deg); }
                        }
                        .coin-spin {
                            animation: coinSpin 2s linear infinite;
                        }
                    `}</style>

                    {/* Background decorations */}
                    <div className="absolute top-8 left-8 w-32 h-20 opacity-90">
                        <Image src="/cloud-1.png" alt="Cloud" fill className="object-contain animate-pulse" />
                    </div>
                    <div className="absolute top-12 right-8 w-36 h-24 opacity-90">
                        <Image src="/cloud-2.png" alt="Cloud" fill className="object-contain animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>

                    {/* Main loading container */}
                    <div className="relative w-full max-w-md">
                        {/* Mario Character bouncing */}
                        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-16 h-20 mario-bounce">
                            <Image src="/char_mario_sm-idle.png" alt="Mario" fill className="object-contain" />
                        </div>

                        {/* Status Block styled like a Mario Block */}
                        <div className="relative bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-lg border-4 border-black shadow-2xl p-6 power-up-glow">
                            {/* Status Title */}
                            <h2
                                className="text-xl sm:text-2xl font-bold mb-4 text-center text-black"
                                style={{
                                    fontFamily: 'SuperMario256, Arial, sans-serif',
                                    textShadow: '2px 2px 0 #fff, 4px 4px 0 #ccc',
                                    WebkitTextStroke: '1px #000'
                                }}
                            >
                                {error ? '⚠️ QUEST ERROR!' : '🔍 SEARCHING...'}
                            </h2>

                            {/* Status Message */}
                            <div className={`text-center p-4 rounded-lg border-2 ${error ? 'bg-red-100 border-red-500' : 'bg-green-100 border-green-500'}`}>
                                <div className="flex items-center justify-center mb-2">
                                    {error ? (
                                        <span className="text-2xl mr-2">💥</span>
                                    ) : (
                                        <div className="w-8 h-8 mr-2 coin-spin">
                                            <Image src="/coin.png" alt="Loading coin" fill className="object-contain" />
                                        </div>
                                    )}
                                    <span className={`font-bold text-lg ${error ? 'text-red-700' : 'text-green-700'}`}>
                                        {error ? error : "Searching for participant"}
                                    </span>
                                </div>

                                {!error && (
                                    <div className="flex justify-center space-x-1">
                                        <span className="animate-[ping_1.5s_0.5s_ease-in-out_infinite] text-green-700 text-xl">.</span>
                                        <span className="animate-[ping_1.5s_0.7s_ease-in-out_infinite] text-green-700 text-xl">.</span>
                                        <span className="animate-[ping_1.5s_0.9s_ease-in-out_infinite] text-green-700 text-xl">.</span>
                                    </div>
                                )}
                            </div>

                            {/* Action button */}
                            {error && (
                                <button
                                    onClick={resetForm}
                                    className="w-full mt-4 py-3 px-4 bg-gradient-to-b from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-black font-bold text-lg rounded-lg border-3 border-black transition-all duration-200 transform hover:scale-105 active:scale-95"
                                    style={{
                                        fontFamily: 'Arial Black, sans-serif',
                                        textShadow: '1px 1px 0 #fff'
                                    }}
                                >
                                    🔄 TRY AGAIN!
                                </button>
                            )}

                            {/* Decorative elements */}
                            <div className="flex justify-center mt-4 space-x-2">
                                <div className="w-6 h-6 coin-spin">
                                    <Image src="/coin.png" alt="Coin" fill className="object-contain" />
                                </div>
                                <div className="w-6 h-6 coin-spin" style={{ animationDelay: '0.5s' }}>
                                    <Image src="/coin.png" alt="Coin" fill className="object-contain" />
                                </div>
                                <div className="w-6 h-6 coin-spin" style={{ animationDelay: '1s' }}>
                                    <Image src="/coin.png" alt="Coin" fill className="object-contain" />
                                </div>
                            </div>
                        </div>

                        {/* Bottom decoration */}
                        {!error && (
                            <div className="absolute -bottom-8 right-4 w-12 h-14 hidden sm:block mario-bounce" style={{ animationDelay: '0.5s' }}>
                                <Image src="/item_mushroom.png" alt="Power-up" fill className="object-contain opacity-80" />
                            </div>
                        )}
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

                    {/* Side decorations */}
                    <div className="absolute bottom-16 left-4 w-16 h-24 hidden lg:block">
                        <Image src="/pipe_basic.png" alt="Pipe" fill className="object-contain" />
                    </div>
                    <div className="absolute bottom-16 right-4 w-16 h-24 hidden lg:block">
                        <Image src="/pipe_basic.png" alt="Pipe" fill className="object-contain" />
                    </div>
                </div>
            )}
            {participantData ? (
                <div className="relative min-h-screen" style={{
                    background: 'var(--gradient-blue-purple)'
                }}>
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: 'url(/pattern-logos-characters.png)',
                            backgroundRepeat: 'repeat',
                            backgroundSize: '1000px 1000px',
                            backgroundPosition: '0 0',
                            opacity: 0.4
                        }}
                    />
                    {/* Mario Sky Background with Clouds */}
                    <div className="absolute top-8 left-8 w-24 h-16 opacity-70 animate-pulse">
                        <Image src="/cloud-1.png" alt="Cloud" fill className="object-contain" />
                    </div>
                    <div className="absolute top-16 right-12 w-28 h-18 opacity-70 animate-pulse" style={{ animationDelay: '1s' }}>
                        <Image src="/cloud-2.png" alt="Cloud" fill className="object-contain" />
                    </div>
                    <div className="absolute top-32 left-1/4 w-20 h-14 opacity-50 animate-pulse" style={{ animationDelay: '2s' }}>
                        <Image src="/cloud-3.png" alt="Cloud" fill className="object-contain" />
                    </div>

                    {/* Mario Ground Texture */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-24 z-10"
                        style={{
                            backgroundImage: 'url(/block_textured.png)',
                            backgroundRepeat: 'repeat',
                            backgroundSize: '64px 64px',
                            backgroundPosition: 'bottom'
                        }}
                    />

                    {/* Question Blocks scattered around */}
                    <div className="absolute top-24 right-20 w-12 h-12 hidden lg:block animate-bounce">
                        <Image src="/block_question.png" alt="Question Block" fill className="object-contain hover:scale-110 transition-transform" />
                    </div>
                    <div className="absolute top-40 left-16 w-12 h-12 hidden lg:block animate-bounce" style={{ animationDelay: '1s' }}>
                        <Image src="/block_question-2.png" alt="Question Block" fill className="object-contain hover:scale-110 transition-transform" />
                    </div>

                    {/* Main content container */}
                    <div className="relative z-20 flex flex-col items-center justify-center text-white p-4 sm:p-6 pt-8">
                        {/* Profile Card Section */}
                        <div className="relative w-full sm:w-auto mx-4 my-2 sm:mx-10">
                            <ProfileCard
                                name={participantData.name}
                                regNo={participantData.regNo}
                                domain={participantData.domain}
                            />
                        </div>

                        {/* Timeline Section */}
                        <div className="relative w-full sm:w-auto lg:w-max my-1">
                            <TimeLine status={participantData.status} />
                        </div>

                        {/* Mario-styled Task Instructions */}
                        <div className="relative bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-lg border-4 border-black shadow-2xl p-6 mb-6 max-w-2xl mx-auto" style={{
                            boxShadow: '0 0 20px rgba(255, 230, 0, 0.8), inset 0 4px 8px rgba(255, 255, 255, 0.3)'
                        }}>
                            <div className="absolute -top-4 left-4 w-8 h-8">
                                <Image src="/coin.png" alt="Coin" fill className="object-contain" />
                            </div>
                            <div className="absolute -top-4 right-4 w-8 h-8">
                                <Image src="/coin.png" alt="Coin" fill className="object-contain" style={{ animationDelay: '0.5s' }} />
                            </div>

                            <h3 className="text-xl font-bold text-black mb-4 text-center" style={{
                                fontFamily: 'Arial Black, sans-serif',
                                textShadow: '2px 2px 0 #fff, 3px 3px 0 #ccc'
                            }}>
                                🎮 QUEST INSTRUCTIONS 🎮
                            </h3>

                            <div className="bg-white bg-opacity-90 rounded-lg p-4 border-2 border-black text-black">
                                <p className="text-justify font-semibold">
                                    {taskTypeInstructions[participantData.domain] || "No instructions available."}
                                </p>
                                <div className="mt-4 p-3 bg-green-100 rounded-lg border-2 border-green-500">
                                    <p className="text-lg font-bold text-center">
                                        For any queries, reach us on{" "}
                                        <a
                                            href="https://discord.gg/Ek2FKk855n"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline hover:text-blue-800 transition-colors duration-300"
                                        >
                                            Discord
                                        </a>
                                        {" "}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Mario-styled Task Type Buttons */}
                        {participantData.tasks.length > 0 && (
                            <div className="flex flex-row sm:flex-row justify-center my-6 z-40">
                                <div className="flex flex-wrap justify-center gap-4">
                                    {getTaskTypes(participantData.tasks).map((type) => (
                                        <button
                                            key={type}
                                            className={`px-6 py-3 rounded-lg border-4 border-black font-bold text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${selectedTaskType === type
                                                ? "bg-gradient-to-b from-green-400 to-green-600 text-black shadow-lg"
                                                : "bg-gradient-to-b from-red-400 to-red-600 text-black hover:from-red-500 hover:to-red-700"
                                                }`}
                                            onClick={() => setSelectedTaskType(type)}
                                            style={{
                                                fontFamily: 'Arial Black, sans-serif',
                                                textShadow: '1px 1px 0 #fff',
                                                boxShadow: selectedTaskType === type
                                                    ? '0 0 15px rgba(0, 255, 0, 0.5)'
                                                    : '0 0 10px rgba(255, 0, 0, 0.3)'
                                            }}
                                        >
                                            🍄 {type} Tasks
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Task Cards Section */}
                        <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-10 z-40 mb-8">
                            {selectedTaskType &&
                                renderTasks(
                                    groupTasksByType(participantData.tasks)
                                )}
                        </div>

                        {/* Mario-styled Submit Button */}
{/*                         
                        <div className="relative mb-8 z-50">
                            {/* Power-up decorations around the button 
                            <div className="absolute -top-8 -left-8 w-12 h-12 animate-bounce">
                                <Image src="/item_star.png" alt="Star" fill className="object-contain" />
                            </div>
                            <div className="absolute -top-8 -right-8 w-12 h-12 animate-bounce" style={{ animationDelay: '0.5s' }}>
                                <Image src="/item_mushroom.png" alt="Mushroom" fill className="object-contain" />
                            </div>

                            <a
                                href={taskForm(participantData.domain)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block font-bold text-black text-xl bg-gradient-to-b from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 rounded-full py-4 px-8 border-4 border-black transition-all duration-200 transform hover:scale-110 active:scale-95"
                                style={{
                                    fontFamily: 'Arial Black, sans-serif',
                                    textShadow: '2px 2px 0 #fff, 3px 3px 0 #ccc',
                                    boxShadow: '0 0 25px rgba(255, 230, 0, 0.8), 0 8px 16px rgba(0, 0, 0, 0.3)'
                                }}
                            >
                                🎯 {getSubmitButtonText(participantData.domain)} 🎯
                            </a>
                        </div> 
        */}

                        {/* Decorative pipes at bottom */}
                        <div className="absolute bottom-24 left-4 w-16 h-24 hidden lg:block">
                            <Image src="/pipe_basic.png" alt="Pipe" fill className="object-contain" />
                        </div>
                        <div className="absolute bottom-24 right-4 w-16 h-24 hidden lg:block">
                            <Image src="/pipe_basic.png" alt="Pipe" fill className="object-contain" />
                        </div>

                        {/* Floating coins */}
                        <div className="absolute top-60 left-10 w-8 h-8 animate-spin hidden md:block">
                            <Image src="/coin.png" alt="Coin" fill className="object-contain" />
                        </div>
                        <div className="absolute top-80 right-16 w-8 h-8 hidden md:block" style={{ animationDelay: '1s' }}>
                            <Image src="/coin.png" alt="Coin" fill className="object-contain" />
                        </div>
                    </div>
                </div>
            ) : (
                !loading && !error && (
                    <div className="absolute inset-0 flex items-center justify-center z-60 p-4 sm:p-6">
                        <EmailLogin
                            email={email}
                            emailError={emailError}
                            handleEmailChange={handleEmailChange}
                            handleLogin={handleLogin}
                        />
                    </div>
                )
            )}
        </section>
    );
};

export default Dashboard;
