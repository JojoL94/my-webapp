"use client";

import { useEffect, useState } from 'react';

interface User {
    id: number;
    name: string;
    greeting: string;
}

const getRandomPastelColor = () => {
    const r = Math.floor(Math.random() * 105 + 150); // 150-255
    const g = Math.floor(Math.random() * 105 + 150); // 150-255
    const b = Math.floor(Math.random() * 105 + 150); // 150-255
    return `rgb(${r}, ${g}, ${b})`;
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [name, setName] = useState<string>('');
    const [greeting, setGreeting] = useState<string>('');

    useEffect(() => {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    const addUser = async (e: React.FormEvent) => {
        e.preventDefault();
        const newUser = { name, greeting };
        const res = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });
        if (res.ok) {
            const addedUser = await res.json();
            setUsers([...users, addedUser]);
            setName('');
            setGreeting('');
        }
    };

    const deleteAllUsers = async () => {
        const res = await fetch('/api/users', {
            method: 'DELETE',
        });
        if (res.ok) {
            setUsers([]);
        }
    };

    useEffect(() => {
        const animateElements = () => {
            const elements = document.querySelectorAll('.floating-element');
            elements.forEach((element) => {
                let x = Math.random() * 90 + 5; // Start position inside the container with some margin
                let y = Math.random() * 90 + 5; // Start position inside the container with some margin
                let dx = Math.random() < 0.5 ? 0.05 : -0.05; // Reduced speed
                let dy = Math.random() < 0.5 ? 0.05 : -0.05; // Reduced speed
                const move = () => {
                    x += dx;
                    y += dy;
                    if (x < -10) x = 110;
                    if (x > 110) x = -10;
                    if (y < -10) y = 110;
                    if (y > 110) y = -10;
                    (element as HTMLElement).style.left = `${x}%`;
                    (element as HTMLElement).style.top = `${y}%`;
                    requestAnimationFrame(move);
                }
                move();
            });
        }
        animateElements();
    }, [users]);

    return (
        <div className="relative w-screen h-screen bg-stone-50">
            <div className="absolute top-[5%] left-[5%] w-[50%] h-[50%] border border-gray-300 overflow-hidden">
                {users.map(user => (
                    <div key={user.id} className="absolute p-4 shadow-lg rounded-lg max-w-xs floating-element" style={{
                        top: `${Math.random() * 90 + 5}%`,
                        left: `${Math.random() * 90 + 5}%`,
                        backgroundColor: getRandomPastelColor()  // Set random pastel background color
                    }}>
                        <p className="text-xl font-bold mb-2">{user.greeting}</p>
                        <p className="text-gray-700">- {user.name}</p>
                    </div>
                ))}
            </div>
            <div className="absolute top-[60%] left-[5%] w-[50%] p-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Add a New Greeting</h2>
                <form onSubmit={addUser}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="greeting">Greeting</label>
                        <input
                            type="text"
                            id="greeting"
                            value={greeting}
                            onChange={(e) => setGreeting(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Add Greeting
                    </button>
                </form>
                <button
                    onClick={deleteAllUsers}
                    className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Delete All Greetings
                </button>
            </div>
        </div>
    );
}

export default UserList;
