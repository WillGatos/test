import React from 'react'
import { Dialog } from '@mui/material'
import {Checkbox} from '@mui/material'
import {Button} from '@mui/material'
function CreatingStartDialog({openStartDialog, setOpenStartDialog}) {
    const [disableButton, setDisableButton] = React.useState(false)
  return (
    <Dialog open={openStartDialog}>
        <div style={{padding: "50px"}}>
            <h3 style={{marginBottom: "25px"}}>Antes de Empezar</h3>
            <div style={{marginBottom: "25px"}} className='d-f j-c-c'>
                <Checkbox
                    checked={disableButton}
                    onChange={(event) => setDisableButton(event.target.checked)}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <p className='font-size-16'>Tiene listas las imagenes de la publicación</p>

            </div>
            <div className='d-f j-c-c a-i-c'>
            <button
            style={{width: "120px", borderRadius: "10px", background: "#1976d2"}}
            className="d-f j-c-c a-i-c font-color-white border-0 h-45px box-shadow margin-top-5vh font-size-20 margin-top-3vh"
            disabled={!disableButton}
            onClick={()=>setOpenStartDialog(false)}
            >Continuar</button>
            </div>
        </div>
    </Dialog>
  )
}

export default CreatingStartDialog