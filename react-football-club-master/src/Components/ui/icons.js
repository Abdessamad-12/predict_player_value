import React from 'react';
import { Link } from 'react-router-dom';

import logoImage from '../../Resources/images/logos/image.png';


export const CityLogo = (props) => {

  const template = <div
    className="img-cover"
    style={{
      width: props.width,
      height: props.height,
      background: `url(${logoImage}) no-repeat`
    }}
  ></div>

  if (props.link) {
    return (
      <Link to={props.linkTo} className="link-logo">
        {template}
      </Link>
      )
  } else {
    return template
  }

}
