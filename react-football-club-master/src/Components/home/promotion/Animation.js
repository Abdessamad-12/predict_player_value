import React from 'react';
import Zoom from 'react-reveal/Zoom';
import Jersey from '../../../Resources/images/cf53e14eda0c43c41fe5624ec90cfcb658577205.jpg';

const PromotionAnimation = () => {
    return (
      <div className="promotion-animation">
        <div className="left">
          <Zoom>
            <div>
              <span>Win a</span>
              <span>Jersey</span>
            </div>
          </Zoom>
        </div>
        <div className="right">
          <Zoom>
            <div style={{background: `url(${Jersey}) no-repeat`}}>
            </div>
          </Zoom>
        </div>
      </div>
    );
  }

export default PromotionAnimation;
