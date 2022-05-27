import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [liveScore, setLiveScore] = useState({});

  function findTeamName(innings) {
    let teamName = innings['team_batting_name'].split('CC')[0].trim().match(/\b(\w)/g).join('');
    return teamName + 'CC';
  }

  function updateLiveScore() {
    axios.get(`https://play-cricket.com/api/v2/match_detail.json?match_id=5088897&api_token=496faf9d0375df628381f4f0d59eeb14`)
      .then(res => {
        const matchDetails = res.data['match_details'][0];
        const currentInnings = matchDetails.innings.slice(-1)[0];
        const onFieldBatsmen = currentInnings.bat.filter(batsman => batsman['how_out'] === 'not out')
        setLiveScore({
          inningsTeamName: findTeamName(currentInnings),
          inningsScore: currentInnings.runs,
          inningsOvers: currentInnings.overs,
          inningsWicketsLost: currentInnings.wickets,
          targetScore: null,
          batsman1Name: onFieldBatsmen[0]['batsman_name'],
          batsman1Score: onFieldBatsmen[0]['runs'],
          batsman1BallsFaced: onFieldBatsmen[0]['balls'],
          batsman2Name: onFieldBatsmen[1]['batsman_name'],
          batsman2Score: onFieldBatsmen[1]['runs'],
          batsman2BallsFaced: onFieldBatsmen[1]['balls']
        });

        setTimeout(updateLiveScore, 10000);
      })
  }

  useEffect(() => {
    updateLiveScore();
  }, [])

  let showIfNotNull = (value) => {
    return value ? "(" + value + ")" : "";
  }

  return (
    <div className="App">
      <div className="AppMatchSummary Highlight">
        <img className="AppLogo" src="/logo.png" alt="logo" />
      </div>
      <div className="AppMatchScore Highlight">
        <div id="BattingScore" className="Highlight" style={{ "flex": 1 }}>
          {liveScore.batsman1Name}: {liveScore.batsman1Score} {showIfNotNull(liveScore.batsman1BallsFaced)} <br />
          {liveScore.batsman2Name}: {liveScore.batsman2Score} {showIfNotNull(liveScore.batsman2BallsFaced)} <br />
        </div>
        <div id="OverallScore" className="Highlight">
          <div className="Highlight">
            <span>{liveScore.inningsTeamName} {liveScore.inningsScore}-{liveScore.inningsWicketsLost}</span>
            <span>{liveScore.inningsOvers} overs</span>
          </div>
          <div
            className="Highlight">{liveScore.inningsScore} / {liveScore.inningsWicketsLost} for {liveScore.inningsOvers} overs
          </div>
        </div>
        <div id="BowlingScore" className="Highlight" style={{ "flex": 1 }}>
        </div>
      </div>
    </div>
  );
}

export default App;
