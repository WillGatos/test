import React from 'react'
import { Rating } from '@mui/material';
function DialogSection({
    newRatingValues,
    setNewRatingValues,
    handleCloseRating,
    sendRating,
}) {
  return (
    <>
        <div id="ratingDialog">
                    <div>
                        <p>Serv. al Cliente</p>
                        <Rating 
                            onChange={(event, newValue) => {
                                setNewRatingValues({...newRatingValues,peopleServiceTreatmentRating:newValue });
                            }}
                            value={newRatingValues.peopleServiceTreatmentRating} /> 
                    </div>
                    <div>
                    <p>Precios</p>
                    <Rating 
                        onChange={(event, newValue) => {
                            setNewRatingValues({...newRatingValues,pricingServiceRating:newValue });
                            
                        }}
                        value={newRatingValues.pricingServiceRating} />
                    </div>
                    <div>
                    <p>Calidad de Servicio</p>
                    <Rating 
                    onChange={(event, newValue) => {
                        setNewRatingValues({...newRatingValues,serviceQualityRating:newValue });
                    }}
                        value={newRatingValues.serviceQualityRating} />
                    </div>
                    <button 
                    style={{
                        borderRadius: "8px",
                        width: "64vw",
                        color: "white",
                        height: "6vh",
                    }}
                    className="backgroundRed box-shadow margin-top-5vh font-size-25 margin-top-3vh"
                    onClick={()=>{
                        handleCloseRating();
                        sendRating();
                        }}> Puntuar</button>
                </div>
    </>
  )
}

export default DialogSection