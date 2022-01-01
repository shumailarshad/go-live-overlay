import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [liveScore, setLiveScore] = useState({});

    function updateLiveScore() {
        axios.get(`http://play-cricket.com/api/v2/match_detail.json?match_id=5089096&api_token=496faf9d0375df628381f4f0d59eeb14`)
            .then(res => {
                const matchDetails = res.data['match_details'][0];
                const firstInnings = matchDetails.innings[0];
                const onFieldBatsmen = firstInnings.bat.filter(batsman => batsman['how_out'] === 'not out')
                setLiveScore({
                    inningsScore: firstInnings.runs,
                    inningsOvers: firstInnings.overs,
                    inningsWicketsLost: firstInnings.wickets,
                    targetScore: null,
                    onStrikeBatsmanName: onFieldBatsmen[0]['batsman_name'],
                    onStrikeBatsmanScore: onFieldBatsmen[0]['runs'],
                    onStrikeBatsmanBallsFaced: onFieldBatsmen[0]['balls'],
                    offStrikeBatsmanName: onFieldBatsmen[1]['batsman_name'],
                    offStrikeBatsmanScore: onFieldBatsmen[1]['runs'],
                    offStrikeBatsmanBallsFaced: onFieldBatsmen[1]['balls']
                });

                setTimeout(updateLiveScore, 10000);
            })
    }

    useEffect(()=>{
        updateLiveScore();
    },[])

    return (
        <div className="App">
            <div className="AppMatchSummary Highlight">
            </div>
            <div className="AppMatchScore Highlight">
                <div className="Highlight" style={{"flex": 1}}>
                    {liveScore.inningsScore} / {liveScore.inningsWicketsLost} for {liveScore.inningsOvers} overs
                </div>
                <div className="Highlight" style={{"flex": 1}}>
                    {liveScore.onStrikeBatsmanName}: {liveScore.onStrikeBatsmanScore} ({liveScore.onStrikeBatsmanBallsFaced}) <br/>
                    {liveScore.offStrikeBatsmanName}: {liveScore.offStrikeBatsmanScore} ({liveScore.offStrikeBatsmanBallsFaced}) <br/>
                </div>
            </div>
        </div>
    );
}

export default App;
