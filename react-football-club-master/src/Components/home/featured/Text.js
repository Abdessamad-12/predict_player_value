import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';
import WydadLogo from '../../../Resources/images/logos/image8.png'; // Assurez-vous que le chemin est correct

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
                            transform: `translate(260px, 170px) rotateY(${rotate}deg)`,
                        }}
                    >
                        
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
                        BotolAi Pro
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
                        2024-2025
                    </div>
                );
            }}
        </Animate>
    );

    animateDescription = () => (
        <Animate
            show={true}
            start={{
                opacity: 0,
                y: 200,
            }}
            enter={{
                opacity: [1],
                y: [100],
                timing: { duration: 800, ease: easePolyOut },
            }}
        >
            {({ opacity, y }) => {
                return (
                    <div
                        className="featured-description"
                        style={{
                            opacity,
                            transform: `translateY(${y}px)`,
                            position: 'absolute',
                            bottom: '20%', // Déplace le texte plus vers le bas
                            left: '50%',
                            transform: 'translate(-50%, 0)', // Centrage horizontal
                            background: 'rgba(0, 0, 0, 0.7)', // Fond sombre semi-transparent
                            padding: '30px',
                            borderRadius: '15px',
                            textAlign: 'center',
                            color: '#ffffff', // Texte blanc
                            fontSize: '22px', // Taille augmentée
                            fontWeight: 'bold', // Texte en gras
                            maxWidth: '600px',
                            textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)', // Contour blanc
                        }}
                    >
                        BotolAi Pro utilise l'intelligence artificielle pour estimer les valeurs des joueurs marocains,
                        optimisée pour la ligue Botola Pro. Découvrez les talents du football marocain, soit pour les
                        clubs nationaux, soit pour les clubs internationaux.
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
                            width: '410px', // Taille du logo
                            height: '410px', // Taille du logo
                            background: `url(${WydadLogo}) no-repeat center`,
                            backgroundSize: 'contain',
                            transform: `translate(50px, 80px)`, // Position ajustée
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
                {this.animateDescription()}
            </div>
        );
    }
}

export default Text;
