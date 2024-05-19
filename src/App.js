import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [prompt, setPrompt] = useState('');
    const [sonnet, setSonnet] = useState('');
    const [typedSonnet, setTypedSonnet] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerate = async () => {
        setLoading(true);
        setError(null);
        setSonnet('');
        setTypedSonnet('');
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/generate-sonnet`, { prompt });
            setSonnet(response.data.sonnet);
        } catch (err) {
            setError('An error occurred while generating the sonnet.');
        }
        setLoading(false);
    };

    useEffect(() => {
        if (sonnet) {
            let index = 0;
            const interval = setInterval(() => {
                setTypedSonnet((prev) => prev + sonnet.charAt(index));
                index++;
                if (index === sonnet.length) {
                    clearInterval(interval);
                }
            }, 50); // Adjust typing speed here (50ms per character)
            return () => clearInterval(interval);
        }
    }, [sonnet]);

    return (
        <div className="App">
            <h1>Content Creation Assistant</h1>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
                rows="5"
                cols="50"
            ></textarea>
            <button onClick={handleGenerate} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Content'}
            </button>
            {error && <p className="error">{error}</p>}
            <textarea
                value={typedSonnet}
                readOnly
                rows="10"
                cols="50"
                placeholder="Generated content will appear here..."
                className="responseTextarea"
            ></textarea>
        </div>
    );
}

export default App;
