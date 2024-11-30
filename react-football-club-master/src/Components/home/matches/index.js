import React from 'react';
import { Tag } from '../../ui/misc';
import Block from './Block';

const MatchesHome = () => {
    return (
      <div className="home-matches-wrapper">
        <div className="container">
          <Tag
            bck="#007A33"
            size="50px"
            color="#ffffff"
          >
            Matches
          </Tag>

          <Tag>
            <Block/>
          </Tag>

          <Tag
            bck="#C1272D"
            size="22px"
            color="#007A33"
            link={true}
            linkto="/the_matches"
          >
            See more matches
          </Tag>

        </div>

      </div>
    );
  }

export default MatchesHome;
