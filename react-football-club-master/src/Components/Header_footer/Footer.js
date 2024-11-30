import React from 'react';
import { CityLogo } from '../ui/icons';

const Footer = () => {
    return (
        <footer className="bck-red">
          <div className="footer-logo">
            <CityLogo
              width="70px"
              height="70px"
              link={true}
              linkTo="/"
            />
          </div>
          <div className="footer-disclaimer">
            Wydad AC 2024. All rights reserved.
          </div>
        </footer>
    );
}

export default Footer;
