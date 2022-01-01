import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
    const [currentDateTime, setCurrentDateTime] = useState('');

    function updateCurrentTime() {
        let current = new Date();
        setCurrentDateTime(current.toLocaleDateString() + ' ' + current.toLocaleTimeString());
        setTimeout(updateCurrentTime, 1000);
    }

    useEffect(() => {
        updateCurrentTime()
    });
    return (
        <div className="App">
            <div className="AppMatchSummary Highlight">
            </div>
            <div className="AppMatchScore Highlight">
                {currentDateTime}
            </div>
        </div>
    );
}

export default App;
