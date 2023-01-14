import {useState} from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import "./fourthStep.css"
import { useContext } from 'react';
import { AuthContext } from '../../../../helpers/AuthContext';
import SendIcon from '@mui/icons-material/Send';
import { TextField } from '@mui/material';
import ImagePicker from '../../other/ImagePicker';
import GoogleMapsReference from '../../other/GoogleMapsReference';

function FourthStep({
    handlePrincipalImageChange,
    handleSecondaryImageChange,
    serviceOrEvent,
    principalImageURL,
    setPrincipalImageURL,
    secondaryImages,
    setSecondaryImages,
    setActualStep,
    onSubmit,
    setError,
    formValues,
    handleChange,
    exactDirection,
    handleDirectionChange,
}) {
    const [openDialog, setOpenDialog] = useState(false)
    const {setOpenLoadingBackdrop} = useContext(AuthContext)
    
     const removeImage = (removedImage) =>{
        setSecondaryImages(prevImages => prevImages.filter((e)=> e !== removedImage))
    } 
    return (
      <>
        <form
          onSubmit={onSubmit}
          className="formContent font-color-white"
        >
          <h1 className='t-a-c'>Información Opcional</h1>
          <div
            className='d-f f-d-c'
          >

        {(serviceOrEvent !== "service" &&
         (formValues.type !== "Excursión"&&
         formValues.type !== "Project"))&&
         <ImagePicker
            handlePrincipalImageChange={handlePrincipalImageChange}
            principalImageURL={principalImageURL}
            setPrincipalImageURL={setPrincipalImageURL}
          />
         }

        {serviceOrEvent==="service" &&
            <label className="custom-file-upload"> 
                <input 
                type="file"
                multiple
                name="secondaryImageChange"
                onChange={(e)=>{handleSecondaryImageChange(e);setOpenLoadingBackdrop(true)}}
                accept="image/*"
                />
                Imagenes Secundarias
            </label>
        }
        </div>
        <div className="d-f j-c-f-s p-r prevImages">
        
        {
        secondaryImages && secondaryImages.map((e, key)=> 
        <div key={key} className="principalImage">
            <img src={e} alt="Cargando... Se paciente... Algún díaa!!"/>
            <div>
                <CloseRoundedIcon 
                className="closeRoundedIcon"
                onClick={()=>removeImage(e)}
                />
            </div>
            </div>)
            }
        </div>
        <TextField
          name="description"
          label={`Descripcion del ${serviceOrEvent==="service"?"Servicio":"Evento"}`}
          multiline
          rows={4}
          color="primary"
          variant="standard"
          id="font-color-white"
          className="border-blue inputs-changer font-size-25 font-color-white inputs-shape margin-top-5vh"
          value={formValues.description} 
          onChange={handleChange("description")}
        />

        <p
         className="googleReference"
         onClick={()=>setOpenDialog(true)}>
          Referencia a Google Maps
        </p>
        <div
        className="formButtons">
        <button 
        type="button" 
        style={{width: "120px", borderRadius: "10px"}}
        className="d-f j-c-c a-i-c b-button font-color-white border-0 h-45px box-shadow margin-top-5vh font-size-20 margin-top-3vh"
        onClick={()=>{setActualStep(prevState => prevState - 1); setError(false)}}
        >Anterior</button>
        <button 
        type="submit" 
        style={{width: "120px", borderRadius: "10px"}}
        className="d-f j-c-c a-i-c b-button font-color-white border-0 h-45px box-shadow margin-top-5vh font-size-20 margin-top-3vh">
          Enviar<SendIcon/></button>
        </div>
    </form>
    <GoogleMapsReference
    exactDirection={exactDirection}
    handleDirectionChange={handleDirectionChange}
    openDialog={openDialog}
    setOpenDialog={setOpenDialog}/>
   
    </>
    )
}

export default FourthStep
//{principalImageURL && <img src={principalImageURL} alt="Cargando..."/> }

/**
 *  
 */