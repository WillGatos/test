import React from 'react';
import { IconButton } from '@mui/material/';
import GoogleMapsIcon from "../../../SVG/GoogleMaps.png";

function Section2({
    individualService,
    serviceOrEvent,
    
}) {
    const {
        township,
        placeToSetEvent,
        exactDirection,
    } = individualService
  return (
    <a href={exactDirection.googleLink} target="_blank">
    {(exactDirection.principalStreet || exactDirection.firstMiddleStreet || township) &&
        <div
          style={{margin: "5vh 0px"}}
          className="d-f j-c-c"
        >
              <IconButton className="d-f j-c-c a-i-c" >
                  <img src={GoogleMapsIcon} alt="google maps"/>
                  <p style={{fontSize: "16px", marginLeft: "5px"}} className='font-color-white'>Ver Mapa</p>
              </IconButton>
          </div>
    }
    </a>
  )
}

export default Section2