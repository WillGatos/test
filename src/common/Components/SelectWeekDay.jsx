import weekDay from "../../helpers/weekDay"

import React from 'react'
import {FormControl,InputLabel,Select,MenuItem} from '@mui/material'
function SelectWeekDay({time, setTime}) {
  return (
    <>
    <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label" style={{color:"white"}}>Días del Evento</InputLabel>
          <Select 
          id="selectButton"
          label='Días del Evento'
          name='eventsDays' 
          value={time.weekDays}
          onChange={(e)=>setTime(prevTime => ({...prevTime, weekDays: e.target.value}))}
          className="inputs-changer font-size-25 font-color-white "
          color="primary"
          required
          defaultValue={"LUN"}
          style={{color: "white", width: "200px"}}
          >
            {weekDay.map((day, key)=><MenuItem key={key} value={key}>{day}</MenuItem>)}
        </Select>
    </FormControl>
    </>
  )
}

export default SelectWeekDay