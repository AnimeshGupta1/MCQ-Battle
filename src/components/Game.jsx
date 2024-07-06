import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";

const Game = () => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    const [isWarning, setIsWarning] = useState(false);

    const dummyQuestions = [
        {
            id: 1,
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            answer: "Paris",
        },
        {
            id: 2,
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            answer: "4",
        },
        // Add more questions as needed
    ];

    useEffect(() => {
        const fetchQuestion = () => {
            if (dummyQuestions.length > 0) {
                setCurrentQuestion(dummyQuestions.shift());
            }
        };

        fetchQuestion();

        // Simulate Pusher for real-time updates
        const pusher = {
            subscribe: (channelName) => ({
                bind: (eventName, callback) => {
                    console.log(`Subscribed to channel: ${channelName}`);
                    console.log(`Listening for event: ${eventName}`);
                    // Call the callback to simulate an update
                    setTimeout(() => {
                        callback();
                    }, 10000); // Simulate question update every 10 seconds
                },
                unbind_all: () => console.log("Unbinding all events"),
                unsubscribe: () => console.log("Unsubscribed from channel"),
            }),
        };

        const channel = pusher.subscribe("game");
        channel.bind("new-question", fetchQuestion);

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    useEffect(() => {
        if (timeLeft <= 60) {
            setIsWarning(true);
        }
    }, [timeLeft]);

    const handleAnswerSubmit = (option) => {
        if (currentQuestion && option === currentQuestion.answer) {
            setScore(score + 1);
        }
        setCurrentQuestion(dummyQuestions.shift());
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-bold text-gray-800">
                    Score: {score}
                </div>
                <div
                    className={`text-xl font-bold ${
                        isWarning ? "text-red-600" : "text-gray-800"
                    }`}
                >
                    Time Left: {Math.floor(timeLeft / 60)}:
                    {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
                </div>
            </div>
            {currentQuestion ? (
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">
                        {currentQuestion.question}
                    </h2>
                    <div className="space-y-2">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded shadow"
                                onClick={() => handleAnswerSubmit(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-xl font-bold text-gray-800">
                    No more questions available.
                </div>
            )}
        </div>
    );
};

export default Game;
