import React, { useState, useEffect } from "react";

const Lobby = ({ onJoinGame }) => {
    const [games, setGames] = useState([]);
    const [newGameName, setNewGameName] = useState("");

    useEffect(() => {
        // Simulate fetching data with dummy data
        const fetchGames = async () => {
            const dummyData = [
                { id: 1, name: "Game 1", owner: "User1" },
                { id: 2, name: "Game 2", owner: "User2" },
                { id: 3, name: "Game 3", owner: "User3" },
            ];
            setGames(dummyData);
        };

        fetchGames();

        // Simulate Pusher for real-time updates
        const pusher = {
            subscribe: (channelName) => ({
                bind: (eventName, callback) => {
                    console.log(`Subscribed to channel: ${channelName}`);
                    console.log(`Listening for event: ${eventName}`);
                    // Call the callback to simulate an update
                    setTimeout(callback, 2000); // Simulate update after 2 seconds
                },
                unbind_all: () => console.log("Unbinding all events"),
                unsubscribe: () => console.log("Unsubscribed from channel"),
            }),
        };

        const channel = pusher.subscribe("games");
        channel.bind("updated", fetchGames);

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);

    const createNewGame = () => {
        if (newGameName.trim() !== "") {
            const newGame = {
                id: games.length + 1,
                name: newGameName,
                owner: "CurrentUser", // Replace with actual current user
            };
            setGames([...games, newGame]);
            setNewGameName(""); // Clear the input field
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Available Games
            </h1>
            <ul className="space-y-4">
                {games.map((game) => (
                    <li
                        key={game.id}
                        className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
                    >
                        <div>
                            <h2 className="text-xl font-semibold">
                                {game.name}
                            </h2>
                            <p className="text-gray-600">Owner: {game.owner}</p>
                        </div>
                        <button
                            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded shadow"
                            onClick={() => onJoinGame(game.id)}
                        >
                            Join Game
                        </button>
                    </li>
                ))}
            </ul>

            <div className="mt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                    Create New Game
                </h2>
                <input
                    type="text"
                    placeholder="Game Name"
                    value={newGameName}
                    onChange={(e) => setNewGameName(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 mr-2"
                />
                <button
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded shadow"
                    onClick={createNewGame}
                >
                    Create Game
                </button>
            </div>
        </div>
    );
};

export default Lobby;
