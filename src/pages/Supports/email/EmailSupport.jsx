import { TextField, Button } from '@mui/material';
import React from 'react';
import "./email.css"

export default function EmailSupport(){
    return(
        <div>
            
        <form className="margin-bottom-5vh" id="authContainer" target="_blank" action="https://formsubmit.co/76bc19b518577e6b566b502972226a2a" method="POST">
        <h1 className="font-size-64 font-color-white">PERXINS</h1>
        <h3 className='font-size-25 font-color-gray'>Contactanos</h3>
        <h3 className='margin-top-5vh font-size-25 font-color-white'>Envíanos un correo</h3>
        <h3 className='font-size-20 font-color-gray' >Diganos como podemos ayudarle</h3>
                <TextField
                 type="text"
                 name="name"
                 className="font-color-white inputs-shape box-shadow margin-top-5vh"
                 label="Nombre"
                 required/>
                <TextField 
                type="email"
                name="email"
                className="font-color-white inputs-shape box-shadow margin-top-5vh"
                label="Email Address"
                required/>
            <TextField
            multiline
            label="Mensaje"
            className="font-color-white inputs-shape box-shadow margin-top-5vh"
            name="message"
            rows="10"
            required
            />
            <Button 
                className="margin-bottom-5vh"
                type="submit"
                color='primary' 
                variant="contained" 
                id="email-submit-button" >Enviar Correo</Button>
            </form>
        </div>
    )
}