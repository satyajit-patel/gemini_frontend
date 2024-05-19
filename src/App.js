import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [prompt, setPrompt] = useState('');
    const [sonnet, setSonnet] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerate = async () => {
        setLoading(true);
        setError(null);
        try {
            // const response = await axios.post('http://localhost:5000/generate-sonnet', { prompt });
            const response = await axios.post('http://geminibackend.azurewebsites.net/generate-sonnet', { prompt });
            setSonnet(response.data.sonnet);
        } catch (err) {
            setError('An error occurred while generating the sonnet.');
        }
        setLoading(false);
    };

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
                {loading ? 'Generating...' : 'generated-content'}
            </button>
            {error && <p className="error">{error}</p>}
            {sonnet && <div className="sonnet"><pre>{sonnet}</pre></div>}
        </div>
    );
}

export default App;

