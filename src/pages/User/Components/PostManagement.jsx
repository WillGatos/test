import React from 'react'
import eventsDaysRendering from '../../../helpers/eventsDaysRendering'
import Rating from '@mui/material/Rating';
import {localType, eventType} from "../../../helpers/iconsRefs"
import ProfileCard from "../../../Components/ProfileCard";
import { Link } from "react-router-dom";

function PostManagement({authState}) {
  const [activeMenu, setActiveMenu] = React.useState("")
  return (
    <div>
    <div onClick={()=>{if(activeMenu)setActiveMenu("")}} id="profileCards" className='d-f j-c-c a-i-c f-d-c'>
    {authState.servicesOwned?.map( (e, key) => {
      return <ProfileCard
      activeMenu={activeMenu}
      setActiveMenu={setActiveMenu}
      key={key}
      element={e}
      iconsArray={localType}
      serviceOrEvent={"service"}
      >
    <div className="d-g j-i-f-s g-t-r-3 a-i-c" style={{height: "72px"}}>
      <p>Serv. al Cliente</p>
      <p>Precios</p>
      <p>Serv. Ofrecido</p>
    </div>
    <div id={e.isPaying?"profileRatingsPaying":"profileRatings"} className="d-g j-i-f-s g-t-r-3" style={{marginLeft: "5vw"}}>
      <div className="d-f a-i-c"><Rating value={e.avgPeopleServiceTreatmentRating} readOnly/> <h4>{e.avgPeopleServiceTreatmentRating}</h4></div>
      <div className="d-f a-i-c"><Rating value={e.avgPricingServiceRating} readOnly/>         <h4>{e.avgPricingServiceRating}</h4>        </div>
      <div className="d-f a-i-c"><Rating value={e.avgServiceQualityRating} readOnly/>         <h4>{e.avgServiceQualityRating}</h4>        </div>
    </div>
    <Link 
      style={{border: `1px solid ${e.isPaying ? "#8a630c" : "white"}`}}
      className="linkToCreateEventOnLocal" 
      to={`/createEvent/${e._id}`}
      >
      Crear Evento en el Local
      </Link>
  </ProfileCard>
    })
    }
    {authState.eventsOwned?.map( (e, key) => {
      return(
        <ProfileCard
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          key={key}
          element={e}
          iconsArray={eventType}
          serviceOrEvent={"event"}
        >
        <div>
          <p>{eventsDaysRendering(e.time)}</p>
          <p>{e.time.startHour} - {e.time.exitHour}</p>
        </div>
        
      </ProfileCard>
      )
    
    })}
  </div></div>
  )
}

export default PostManagement