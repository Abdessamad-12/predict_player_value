import React, { Component } from 'react';
import Stripes from '../../../Resources/images/stripes.png';
import { Tag } from '../../ui/misc';
import Reveal from 'react-reveal/Reveal';
import HomeCards from './Cards';

class MeetPlayers extends Component {

  state = {
    shoe: false
  }

  render() {
    return (
      <Reveal
        fraction={0.7}
        onReveal={ () => {
          this.setState({
            show: true
          })
        }}

      >
        <div  className="home-meetplayers"
          style={{
            background: `#ffffff url(${Stripes})`
          }}
        >
          <div className="container">
            <div className="home-meetplayers-wrapper">
              <div className="home-card-wrapper">
                <HomeCards
                  show={this.state.show}
                />
              </div>
              <div className="home-text-wrapper">
                <div>
                  <Tag
                    bck="#007A33"
                    size="100px"
                    color="#ffffff"
                    add={{
                      display: 'inline-block',
                      marginBottom: '20px'
                    }}
                  >
                    Meet
                  </Tag>
                </div>
                <div>
                  <Tag
                    bck="#007A33"
                    size="100px"
                    color="#ffffff"
                    add={{
                      display: 'inline-block',
                      marginBottom: '20px'
                    }}
                  >
                    The
                  </Tag>
                </div>
                <div>
                  <Tag
                    bck="#007A33"
                    size="100px"
                    color="#ffffff"
                    add={{
                      display: 'inline-block',
                      marginBottom: '20px'
                    }}
                  >
                    Players
                  </Tag>
                </div>
                <div>
                  <Tag
                    bck="#C1272D"
                    size="27px"
                    color="#007A33"
                    link={true}
                    linkto="/the_team"
                    add={{
                      display: 'inline-block',
                      marginBottom: '27px',
                      border: '1px solid #0e1731'
                    }}
                  >
                  Meet them here
                  </Tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    );
  }
}

export default MeetPlayers;
