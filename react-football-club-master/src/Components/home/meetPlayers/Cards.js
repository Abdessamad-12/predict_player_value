import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';
import Otamendi from '../../../Resources/images/players/images7.png';
import Chadli from '../../../Resources/images/players/images8.png';
import Nassi from '../../../Resources/images/players/images9.png';
import Harkass from '../../../Resources/images/players/images10.png';

class HomeCards extends Component {
  state = {
    cards: [
      {
        bottom: 160,
        left: 400,
        number: "10",
        name: "Jamal",
        lastname: "Harkass",
        image: Harkass,
      },
      {
        bottom: 120,
        left: 300,
        number: "10",
        name: "Walid",
        lastname: "Nassi",
        image: Nassi,
      },
      {
        bottom: 80,
        left: 200,
        number: "7",
        name: "Nassim",
        lastname: "Chadli",
        image: Chadli,
      },
      {
        bottom: 40,
        left: 100,
        number: "22",
        name: "Hamza",
        lastname: "Sakhi",
        image: Otamendi,
      },
    ],
  };

  showAnimateCards = () =>
    this.state.cards.map((card, i) => (
      <Animate
        key={i}
        show={this.props.show}
        start={{
          left: 0,
          bottom: 0,
        }}
        enter={{
          left: [card.left],
          bottom: [card.bottom],
          timing: { duration: 500, ease: easePolyOut },
        }}
      >
        {({ left, bottom }) => {
          return (
            <div
              style={{
                position: 'absolute',
                left,
                bottom,
                width: '220px',
                height: '320px',
                background: `url(${card.image}) no-repeat center center`,

                backgroundSize: 'cover',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
                }}
              >
                <h2 style={{ margin: 0, fontSize: '40px' }}>{card.number}</h2>
                <span style={{ fontSize: '18px' }}>
                  {card.name} {card.lastname}
                </span>
              </div>
            </div>
          );
        }}
      </Animate>
    ));

  render() {
    return (
      <div
        style={{
          position: 'relative',
          height: '600px', // Hauteur globale du conteneur
          width: '100%',
          marginTop: '50px',
        }}
      >
        {this.showAnimateCards()}
      </div>
    );
  }
}

export default HomeCards;