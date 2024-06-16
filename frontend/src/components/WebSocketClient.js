// WebSocketClient.js
import React, { useEffect } from 'react';

const WebSocketClient = ({ setJobs }) => {
    useEffect(() => {
        // Example WebSocket connection setup
        const ws = new WebSocket('ws://localhost:8080/ws');

        ws.onmessage = (event) => {
            try {
                const job = JSON.parse(event.data); // Parse the incoming message
                setJobs((prevJobs) => [...prevJobs, job]); // Update jobs state with parsed object
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        return () => {
            ws.close(); // Clean up WebSocket connection on component unmount
        };
    }, [setJobs]);

    return null; // Since WebSocketClient doesn't render anything visible
};

export default WebSocketClient;
