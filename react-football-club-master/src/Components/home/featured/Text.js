import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';
import WydadLogo from '../../../Resources/images/logos/image2.png'; // Assurez-vous que le chemin est correct

class Text extends Component {
    animateNumber = () => (
        <Animate
            show={true}
            start={{
                opacity: 0,
                rotate: 0,
            }}
            enter={{
                opacity: [1],
                rotate: [360],
                timing: { duration: 1000, ease: easePolyOut },
            }}
        >
            {({ opacity, rotate }) => {
                return (
                    <div
                        className="featured-number"
                        style={{
                            opacity,
                            transform: `translate(260px,170px) rotateY(${rotate}deg)`,
                        }}
                    >
                        22
                    </div>
                );
            }}
        </Animate>
    );

    animateFirst = () => (
        <Animate
            show={true}
            start={{
                opacity: 0,
                x: 503,
                y: 450,
            }}
            enter={{
                opacity: [1],
                x: [273],
                y: [450],
                timing: { duration: 500, ease: easePolyOut },
            }}
        >
            {({ opacity, x, y }) => {
                return (
                    <div
                        className="featured-first"
                        style={{
                            opacity,
                            transform: `translate(${x}px,${y}px)`,
                        }}
                    >
                        Botola 
                    </div>
                );
            }}
        </Animate>
    );

    animateSecond = () => (
        <Animate
            show={true}
            start={{
                opacity: 0,
                x: 503,
                y: 586,
            }}
            enter={{
                opacity: [1],
                x: [273],
                y: [586],
                timing: { delay: 300, duration: 500, ease: easePolyOut },
            }}
        >
            {({ opacity, x, y }) => {
                return (
                    <div
                        className="featured-second"
                        style={{
                            opacity,
                            transform: `translate(${x}px,${y}px)`,
                        }}
                    >
                        Champions
                    </div>
                );
            }}
        </Animate>
    );

    animatePlayer = () => (
        <Animate
            show={true}
            start={{
                opacity: 0,
            }}
            enter={{
                opacity: [1],
                timing: { delay: 800, duration: 500, ease: easePolyOut },
            }}
        >
            {({ opacity }) => {
                return (
                    <div
                        className="featured-player"
                        style={{
                            opacity,
                            width: '500px', // Taille du logo
                            height: '500px', // Taille du logo
                            background: `url(${WydadLogo}) no-repeat center`,
                            backgroundSize: 'contain',
                            transform: `translate(750px, 150px)`, // Position ajustée
                        }}
                    ></div>
                );
            }}
        </Animate>
    );
    
    
    
    render() {
        return (
            <div className="featured-text">
                {this.animatePlayer()}
                {this.animateNumber()}
                {this.animateFirst()}
                {this.animateSecond()}
            </div>
        );
    }
}

export default Text;

