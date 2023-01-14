import React from 'react'
import { parseDays } from '../../helpers/eventsDaysRendering'

function CalendarToSetDay({
    mainObject,
    setMainObject,
    setLastDateInDateInput,
    lastDateInDateInput,
    keyToChange,
    label
}) {
  return (
    <>
    <p className="font-color-white font-size-20 margin-top-5vh">{label}</p>
    <input 
      placeholder="Día para Ir" 
      type="date"
      id="anchor-playground"
      style={{
        height: "1.4375em",
        padding: "13px 2vw 15px 2vw",
        background: "#2e343b",
        fontFamily:'Montserrat, sans-serif',
        border: 0,
        width: "80vw",
        borderRadius: "9px",
      }}
      className="inputs-changer font-size-20 font-color-white inputs-shape "
      label="Días"
      name="eventsDays"
      value={lastDateInDateInput}
      required
      onChange={(e)=>{
        setLastDateInDateInput(e.target.value)
        console.log(e.target.value)
        setMainObject({...mainObject, [keyToChange]: e.target.value })
    }}/>
    </>
  )
}

export default CalendarToSetDay