'use client';

import { useState } from 'react';

export default function Home() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessages(prev => [...prev, { text: input, sender: 'user' }]);
        setInput('');

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: input }),
        });

        const data = await response.json();
        setMessages(prev => [...prev, { text: data.reply, sender: 'bot' }]);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Customer Support Chatbot</h1>
            <div className="border p-4 h-96 overflow-y-auto mb-4">
                {messages.map((message, index) => (
                    <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                            {message.text}
                        </span>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="flex">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow border p-2 rounded-l"
                    placeholder="Type your message..."
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">Send</button>
            </form>
        </div>
    );
}