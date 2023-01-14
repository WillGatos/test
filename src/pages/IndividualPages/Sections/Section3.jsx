import React from 'react'
import eventsDaysRendering from '../../../helpers/eventsDaysRendering'
import CoversExposure from '../../../Components/CoversExposure'
function Section3({
    individualService,
    serviceOrEvent,
    availabilityStatus
        }) {
  return (
    <div className='d-f j-c-s-a' style={{margin: "30px -43px 50px"}}>
        <div className="t-a-s">
            <p className='font-size-21 margin-bottom-5px'>Horario</p>
            <div style={{marginLeft: "1rem"}}>
                {serviceOrEvent==="service"
                  ?
                  <p>{individualService.time.startDays} - {individualService.time.endDays}</p>
                  :
                  <p className='d-f j-c-s-b f-d-c'>{eventsDaysRendering(individualService.time)}</p>
                }
                    <p>{individualService.time.startHour} - {individualService.time.exitHour}</p>
                    {(availabilityStatus&&serviceOrEvent==="service")?<p style={{color:"#63F960"}}>Abierto</p>:<p style={{color:"#F96060"}}>Cerrado</p>}
                </div>
            </div>
                <div className='t-a-s'>
                    {individualService.cover&&
                        <p className='font-size-21 margin-bottom-5px' >Entradas</p>
                    }
                    <div className='d-f f-d-c' style={{marginLeft: "1rem"}}>
                    {individualService.cover&&
                        <CoversExposure
                            cover={individualService.cover}
                        />
                    }
                        
                    </div>
                </div>
        </div>
  )
}

export default Section3