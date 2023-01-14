import React from 'react'
import { TextField, Dialog } from '@mui/material'
function GoogleMapsReference({
    openDialog,
    setOpenDialog,
    handleDirectionChange,
    exactDirection}) {
  return (
    <Dialog
      open={openDialog}
      onClose={()=>setOpenDialog(false)}
      >
        <div style={{background:"black"}}>
        <form
         style={{background: "", padding: "30px"}}
         className="d-f f-d-c j-c-c a-i-c"
         onSubmit={(e)=> {
          e.preventDefault();
          setOpenDialog(false)}}>
          <TextField 
            color="primary"
            variant="standard"
            className="inputs-changer font-color-white font-size-25 margin-top-5vh" 
            label="Referencia a Google Maps"
            name='googleLink'
            type="text" 
            value={exactDirection.googleLink} 
            onChange={handleDirectionChange("googleLink")}
          />
        <a
          target='_blank'
          href='https://www.google.com/maps/@23.1118263,-82.3631948,14.83z?hl=es'
        > 
        Abrir Google Maps
        </a>
        <h3>Instrucciones para hacerlo</h3>
        <ol>
          <li>Abrir Google Maps</li>
          <li>Seleccionar el Local</li>
          <li>Copiar el Link</li>
          <li>Pegarlo en campo de arriba que dice<br/> Referencia a Google Maps</li>
        </ol>
        <div
         style={{ width: "160px", margin: "15px" }}
         className='d-f j-c-s-a'>
          <button>Cancelar</button>
          <button type='submit'>Guardar</button>
        </div>
      </form>
      </div>
      </Dialog>
  )
}

export default GoogleMapsReference