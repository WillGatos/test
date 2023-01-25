import React from 'react'
import {useState} from "react";
import axios from "axios";
import {TextField} from '@mui/material'
import PerxinsLogo from "../../../../common/Logo/PerxinsLogo";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TopProgressBar from "../../../../Animations/TopProgressBar";
//import {useGoogleLogin, GoogleLogin} from '@react-oauth/google';
import GoogleLoginButton from '../../GoogleLoginButton';
import { useContext } from 'react';
import { AuthContext } from '../../../../helpers/AuthContext';
function RegistrationForm({formValues, setFormValues, setChangeOfPage}) {

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)
  //const [progressBarState, setProgressBarState] = useState(0)

  const {setOpenLoadingBackdrop} = useContext(AuthContext)

  const handleClickShowPassword = () => {
    setShowPassword(prevState => !prevState)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (e) => {
    e.preventDefault()
    setOpenLoadingBackdrop(true)
    const formData = new FormData()
        formData.append('username', formValues.username)
        formData.append('password', formValues.password)
        formData.append('email', formValues.email)
        
    axios.post("http://localhost:3001/user/signup", formValues)
    .then((response)=>{
        setChangeOfPage(false)
        setOpenLoadingBackdrop(false)
  }).catch(e=>{
      setOpenLoadingBackdrop(false)
      setError(true)
    })
  };

  const handleChange = input => e =>{
    setFormValues({...formValues,[input]: e.target.value})
  }
  return (
    <TopProgressBar
    //progressBarState={progressBarState}
    >
    <form 
      id="authContainer"
      onSubmit={onSubmit} >
        {error&& <p
      style={{"color": "white",
      "background": "#c43838",
      "padding": "6px",
      "borderRadius": "8px",}}
      >No está autorizado</p>}
      <PerxinsLogo
        logoFill={1.2}
        delayBetweenLettersAnimation={0.2}
        lettersAnimation={0.6}
      />
      <h2>
        <span style={{fontSize: "25px"}}>P</span>
        <span style={{fontSize: "31px"}}>E</span>
        <span style={{fontSize: "35px"}}>R</span>
        <span style={{fontSize: "38px"}}>X</span>
        <span style={{fontSize: "35px"}}>I</span>
        <span style={{fontSize: "31px"}}>N</span>
        <span style={{fontSize: "25px"}}>S</span>
    </h2>
      <h3 className="subHeader font-size-25">Suscripción</h3>
        
          <TextField
          required
            label="Nombre"
            autoComplete="off"
            type="text"
            name="username"
            //color="primary"
            variant="standard"
            className="inputs-changer font-size-25 font-color-white inputs-shape margin-top-5vh border-blue"
            value={formValues.username}
            onChange={handleChange("username")}
          />
          <TextField
          required
            label="Email"
            autoComplete="off"
            type="email"
            name="email"
            //color="primary"
            variant="standard"
            className="inputs-changer font-size-25 font-color-white inputs-shape margin-top-5vh border-blue"
            value={formValues.email}
            onChange={handleChange("email")}
          />
          <FormControl className="border-blue inputs-changer" style={{ width: '85vw' }} variant="standard">
          <InputLabel htmlFor="filled-adornment-password" id="font-color-white">Contraseña</InputLabel>
          <Input
          required
            autoComplete="off"
            type={showPassword?"text":"password"}
            name="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff className="font-color-white" /> : <Visibility className="font-color-white"/>}
                </IconButton>
              </InputAdornment>
            }    
            //color="primary"
            variant="standard"
            style={{width:"82vw"}}
            className="border-blue font-size-32 font-color-white inputs-shape"
            value={formValues.password}
            onChange={handleChange("password")}
          />
          </FormControl>
          <div style={{width:"82vw"}}>
            <p style={{textAlign: "start", textDecoration: "underline"}} onClick={()=>setChangeOfPage(false)}>Página de Verificación</p>
          </div>
          <button
          type="submit" 
          className="border-0 font-color-white b-button h-45px inputs-shape box-shadow margin-top-5vh font-size-25 margin-top-3vh"
          > Suscríbete
          </button>
          <GoogleLoginButton
          setError={setError}
          />
    </form>
    </TopProgressBar>
  )
}

export default RegistrationForm;