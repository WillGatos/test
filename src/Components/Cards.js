import React from 'react'
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
//import CardContent from '@mui/material/CardContent';
import "./Card.css"
//import weekDay from '../helpers/weekDay';
//import eventsDaysRendering from "../helpers/eventsDaysRendering"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import CardContentModel from './Cards/CardContentModel';

function Cards({
  service,
  serviceOrEvent,
  children}) {

    const ChangeURL = (string)=>{
        const urlArray = string.split("/");
        return urlArray[urlArray.length - 1];
    }
    return (
      <Card sx={{ maxWidth: 345 }} className="card p-r" id="cardContainer">
          <div 
          className="imageCard"
          style={{
          display: "flex",
          justifyContent: "center",
          objectFit: "cover"
          }}>
          {service.principalImage &&
          <LazyLoadImage
          src={`http://res.cloudinary.com/dolzgvsos/image/upload/c_scale,h_450,w_350/v1/${serviceOrEvent==="service"?"service":"events"}/${ChangeURL(service.principalImage)}`}
          effect="blur"/>
          }
          
          </div>
          <CardContentModel
            service={service}
          />
            {children}
      </Card>
    )
}

export default Cards
