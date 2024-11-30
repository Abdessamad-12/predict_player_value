import React from 'react';

const PlayerCard = (props) => {
    return (
        <div className="player-card-wrapper">
            <div
                className="player-card-thmb"
                style={{background:`#f2f9ff url(${props.bck})`}}
            ></div>
            <div className="player-card-nfo">
                <div className="player-card-number">
                    {props.number}
                </div>
                <div className="player-card-name">
                    <span>{props.name}</span>
                    <span>{props.lastname}</span>
                </div>
            </div>
        </div>
    );
};

export default PlayerCard;
