import React from 'react';

const MatchesBlock = ({match}) => {
    return (
      <div className="match-block">
        <div className="match-date">
            {match.final ? match.date : `Match not played yet: ${match.date}`}
        </div>
        <div className="match-wrapper">
            <div className="match-top">
                <div className="left">
                    <div className="icon" style={{background:`url(/images/team_icons/${match.localThmb}.png)`}}></div>
                    <div className="team-name">{match.local}</div>
                </div>
                <div className="right">
                    { match.final ? match.resultLocal: '-'}
                </div>
            </div>
            <div className="match-bottom">
                <div className="left">
                    <div className="icon" style={{background:`url(/images/team_icons/${match.awayThmb}.png)`}}></div>
                    <div className="team-name">{match.away}</div>
                </div>
                <div className="right">
                    { match.final ? match.resultAway: '-'}
                </div>
            </div>
        </div>
      </div>
    );
};

export default MatchesBlock;
