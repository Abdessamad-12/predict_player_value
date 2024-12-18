import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';
import { CityLogo } from '../ui/icons';


export class Header extends Component {
  render() {
    return (
      <div>
        <AppBar
          position="fixed"
          style={{
            backgroundColor: '#1A1A1A',
            boxShadow: 'none',
            padding: '10px 0',
            borderBottom: '2px solid #00285e'
          }}
        >
            <Toolbar style={{display: 'flex'}}>
              <div style={{flexGrow: 1}}>
                <div className="header-logo">
                  <CityLogo
                    link={true}
                    linkTo="/"
                    width="70px"
                    height="70px"
                  />
                </div>
              </div>
              <Link to="/">
                <Button color="inherit">Home</Button>
              </Link>


              <Link to="/the_team">
                <Button color="inherit">The Team</Button>
              </Link>

              <Link to="/the_matches">
                <Button color="inherit">Matches</Button>
              </Link>

              


            </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;
