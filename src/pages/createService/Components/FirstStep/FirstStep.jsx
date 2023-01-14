import React from 'react'
import {TextField} from '@mui/material'
import "./FirstStep.css";
import SelectionType from "../../../../Components/SelectionType";
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import typeOfMusicPlayed from "../../../../helpers/typeOfMusicPlayed"
import CoverSelector from '../../other/CoverSelector';
import ImagePicker from '../../other/ImagePicker';
function FirstStep({
    formValues, 
    handleChange,  
    serviceOrEvent, 
    setFormValues,
    setContact,
    setActualStep,
    setError,
    coverHandling,
    handlePrincipalImageChange,
    principalImageURL,
    setPrincipalImageURL,
    }) {
        const onSubmit = (e) =>{
            e.preventDefault()
            setActualStep(prevState => prevState + 1); 
            setError(false)
        }
    return (
        <form className="d-f f-d-c" onSubmit={onSubmit}>
            <SelectionType 
                serviceOrEvent={serviceOrEvent}
                query={formValues}
                handleQueryChange={handleChange}
            />
            {(serviceOrEvent === "service" ||
            formValues.type  ==="Excursión" ||
            formValues.type  ==="Project")&&
            <ImagePicker
                handlePrincipalImageChange={handlePrincipalImageChange}
                principalImageURL={principalImageURL}
                setPrincipalImageURL={setPrincipalImageURL}
              />
            }
         
            <TextField 
                label={`Nombre del ${serviceOrEvent==="service"?"Servicio":"Evento"}`}
                name='name'
                type="text" 
                required
                color="primary"
                variant="standard"
                className="inputs-changer font-size-25 font-color-white inputs-shape margin-top-5vh"
                value={formValues.name}
                onChange={(event)=>{
                    setFormValues({...formValues, name: event.target.value,})
                    setContact((contact)=> {
                        return(
                            {
                            ...contact,
                            facebook: event.target.value,
                            twitter: event.target.value,
                            instagram: event.target.value,
                            }
                        )
                    })
                }}
            />
        <div className='d-f j-c-c f-d-c'>
        <CoverSelector
          coverHandling={coverHandling}
        />
        </div>

        {formValues.type !== "Restaurante" &&
        <div 
        style={{marginLeft: "-8px"}}
        >
          <FormControl className="border-blue inputs-changer" variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label" style={{color:"white"}}>Tipo de Música</InputLabel>
            <Select 
            defaultValue={"VIE"}
            id="selectButton"
            label='Tipo de Música'
            name='typeOfMusicPlayed'
            value={formValues.typeOfMusicPlayed}
            onChange={handleChange("typeOfMusicPlayed")}
            className="inputs-changer font-size-25 font-color-white inputs-shape"
            color="primary"
            required
            style={{color: "white"}}
            >
            {typeOfMusicPlayed.map((e,key)=>
            <MenuItem key={key} value={e}>{e==="" ? "Ninguno" : e}</MenuItem>
                )}
            </Select>
        </FormControl>
        </div>
        }
        <div
        //style={{minHeight:"65vh"}}
        className="formButtons">

        <button
            style={{width: "120px", borderRadius: "10px"}}
            className="d-f j-c-c a-i-c b-button font-color-white border-0 h-45px box-shadow margin-top-5vh font-size-20 margin-top-3vh"
            type="submit"
        onClick={()=>{}}>Siguiente</button>
        </div>
        </form>
    )
}

export default FirstStep
