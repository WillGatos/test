import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import "./ThirdStep.css"
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import weekDay from "../../../../helpers/weekDay"
import provinceAndTownships from '../../../../helpers/provinceAndTownships';
//import GoogleMapsReference from '../../other/GoogleMapsReference';
function ThirdStep({
    time,
    setTime,
    handleTimeChange,
    serviceOrEvent,
    exactDirection,
    formValues,
    handleChange,
    handleDirectionChange,
    lastDateInDateInput,
    setLastDateInDateInput,
    setActualStep,
    setError
}) {

  const onSubmit = (e) =>{
    e.preventDefault()
    setActualStep(prevState => prevState + 1); 
    setError(false)
  }
    return (
      <>
        <form onSubmit={onSubmit} className="inputs-changer font-size-25 formContent font-color-white">
            <h2 className='t-a-c'> Horarios </h2>
          {serviceOrEvent==="service"
          &&<div className="inputs-changer font-size-25 d-f j-c-c">
            
        <FormControl className="border-blue inputs-changer" variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label" style={{color:"white"}}>Empiezas de:</InputLabel>
          <Select 
          id="selectButton"
          label='Empiezas de:'
          name='startDays'
          value={time.startDays}
          onChange={handleTimeChange("startDays")}
          className="inputs-changer font-size-25 font-color-white "
          color="primary"
          required
          style={{color: "white"}}
          >
          {weekDay.map(e=>
          <MenuItem key={e} value={e}>{e}</MenuItem>
            )}
        </Select>
        </FormControl>
        <FormControl className="border-blue inputs-changer" variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label" style={{color:"white"}}>a:</InputLabel>
          <Select
          id="selectButton"
          label='a:'
          name='endDays'
          value={time.endDays}
          onChange={handleTimeChange("endDays")}
          className="inputs-changer font-size-25 font-color-white "
          color="primary"
          required
          style={{color: "white"}}
          >
          {weekDay.map((e, key)=> <MenuItem key={key} value={e}>{e}</MenuItem>)}
        </Select>
        </FormControl>
          </div>
        }
      <div className="inputs-changer font-size-25 d-f j-c-c">
        <TextField 
        color="primary"
        variant="standard"
        className="inputs-changer font-size-25 font-color-white inputs-shape  margin-top-5vh" id="time"
        label="Hora de Apertura"
        type="time"
        InputLabelProps={{
          shrink: true,
        }}
        required
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 150 }}
        name="startHour"
        value={time.startHour}
        onChange={handleTimeChange("startHour")}
      />
        <TextField 
          color="primary"
          variant="standard"
          className="inputs-changer font-size-25 font-color-white inputs-shape  margin-top-5vh" id="time"
          label="Hora de Clausura"
          type="time"
          value={time.exitHour}
          name="exitHour"
          onChange={handleTimeChange("exitHour")}
          required
          InputLabelProps={{shrink: true}}
          inputProps={{step: 300}}
          sx={{ width: 150 }}
      />
      </div>
      <h1>Dirección</h1>
      {serviceOrEvent==="event"&&
        <TextField 
          required
          color="primary"
          variant="standard"
          className="inputs-changer font-size-25 font-color-white inputs-shape  margin-top-5vh" 
          label="Lugar del Evento"
          name='placeToSetEvent'
          type="text" 
          value={exactDirection.placeToSetEvent} 
          onChange={handleDirectionChange("placeToSetEvent")}
          id="color-white"
        />}

      <FormControl className="border-blue inputs-changer" variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label" style={{color:"white"}}>Provincia</InputLabel>
        <Select 
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label='Provincia'
          name='province'
          value={exactDirection.province}
          onChange={handleDirectionChange("province")}
          className="border-blue font-size-25 font-color-white inputs-shape"
          color="primary"
          required
          //defaultValue={"La Habana"}
          style={{color: "white"}}
          >
            { provinceAndTownships.map(e => 
             <MenuItem key={e} value={e.province}>{e.province}</MenuItem>
            )
            }
          </Select>
        </FormControl>
        <FormControl className="border-blue inputs-changer" variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label" style={{color:"white"}}>Municipio</InputLabel>
          <Select 
            id="selectButton"
            label='Municipio'
            name='township'
            value={formValues.township}
            onChange={handleChange("township")}
            className="font-color-white inputs-shape box-shadow"
            color="primary"
            required
            style={{color: "white"}}
          >
            { provinceAndTownships.map(e => {
            if(e.province === exactDirection.province){
             return e.township.map((township, key)=>
                <MenuItem key={key} value={township}>{township}</MenuItem>
                )
            }
            })}
          </Select>
        </FormControl>
        
        <div
          className="formButtons"
        >
        <button 
            type="button" 
            style={{width: "120px", borderRadius: "10px"}}
            className="d-f j-c-c a-i-c b-button font-color-white border-0 h-45px box-shadow margin-top-5vh font-size-20 margin-top-3vh"
            onClick={()=>{setActualStep(prevState => prevState - 1); setError(false)}}
        >Anterior</button>

        <button
            style={{width: "120px", borderRadius: "10px"}}
            className="d-f j-c-c a-i-c b-button font-color-white border-0 h-45px box-shadow margin-top-5vh font-size-20 margin-top-3vh"
            type="submit"
        onClick={()=>{}}>Siguiente</button>
        </div>
        </form>

        </>
    )
}

export default ThirdStep
/* <div className='centerElement'>
          {time.eventsDays!==[]&& <div>
            <p>Días para asistir:</p>
            </div>}
          {time.eventsDays.map(e=>
          <div className='eventsDays' onClick={()=>{
            setTime({...time, eventsDays : time.eventsDays.filter(date=> date!==e)})
          }}
          style={{"flexDirection":"row"}}>
          <p>{e}</p>
          </div>
            )}
        </div> */

        /*
        <TextField 
          color="primary"
          variant="standard"
          className="inputs-changer font-size-25 font-color-white inputs-shape  margin-top-5vh" 
          label="Calle Principal"
          name='principalStreet'
          type="text" 
          value={exactDirection.principalStreet} 
          onChange={handleDirectionChange("principalStreet")}
        />

        <TextField 
          color="primary"
          variant="standard"
          className="inputs-changer font-size-25 font-color-white inputs-shape  margin-top-5vh" 
          name='firstMiddleStreet' 
          type="text" 
          value={exactDirection.firstMiddleStreet} 
          onChange={handleDirectionChange("firstMiddleStreet")}
          label="Calle Paralela No.1"
        />

        <TextField color="primary"
                variant="standard"
                className="inputs-changer font-size-25 font-color-white inputs-shape  margin-top-5vh" 
          name='secondMiddleStreet' type="text" 
          value={exactDirection.secondMiddleStreet} 
          onChange={handleDirectionChange("secondMiddleStreet")}
          label="Calle Paralela No.2"
        />

        <TextField 
        color="primary"
        variant="standard"
        className="inputs-changer font-size-25 font-color-white inputs-shape  margin-top-5vh" 
        label="No. de Edificio (Opcional)"
        name='number' type="number" 
        value={exactDirection.number} 
        onChange={handleDirectionChange("number")}
          
        />
        <div style={{marginLeft: "8px", marginTop: "8px"}}>
          <p>Así lo Verán</p>
          <h6 style={{marginLeft: "8px", marginTop: "8px"}}>
          {exactDirection.principalStreet} # {exactDirection.number} e/ {exactDirection.firstMiddleStreet} y {exactDirection.secondMiddleStreet} 
          </h6>
        </div>*/