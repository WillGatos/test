import React from 'react'
import { Rating } from '@mui/material'

function RatingSection({
    serviceOrEvent,
    handleClickOpenRating,
    numberOfUsersRating,
    individualService
}) {
  return (
    <>
        {serviceOrEvent==="service"&&
                <div onClick={()=>{handleClickOpenRating()}}>
                <div
                style={{
                    margin: "8vh 0 15px 0"
                    }}>
                        <p className='t-a-c'>
                            Puntuaciones  ({numberOfUsersRating})
                        </p>
                <hr/>
                </div>
                <div className='d-f' style={{justifyContent: "space-around", marginBottom: "3vh"}}>
                        <div style={{textAlign:"left"}}>
                        <p className='margin-bottom-5px'>Serv. al Cliente </p>
                        <p className='margin-bottom-5px'>Precios </p>
                        <div className='margin-bottom-5px'>
                            <p>Serv. Ofrecido </p>
                            <p className='t-a-c'>( Como {individualService.type} )</p>
                        </div>
                    </div>
                    
                    <div style={{alignItems: "flex-start",}} className='d-f f-d-c ratingShow'>
                         <div className="d-f a-c-c t-a-c a-i-c j-c-c">
                            <Rating value={individualService.avgPeopleServiceTreatmentRating} readOnly/> <h4>{individualService.avgPeopleServiceTreatmentRating}</h4>
                        </div>
                        <div className="d-f a-c-c t-a-c a-i-c j-c-c">
                            <Rating value={individualService.avgPricingServiceRating} readOnly/><h4>{individualService.avgPricingServiceRating}</h4>
                        </div >
                        <div className="d-f a-c-c t-a-c a-i-c j-c-c">
                            <Rating value={individualService.avgServiceQualityRating} readOnly/><h4>{individualService.avgServiceQualityRating}</h4>
                        </div>
                    </div>
                    </div>
                </div>}
    </>
  )
}

export default RatingSection