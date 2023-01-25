import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import Compressor from 'compressorjs';
import FirstStep from "./Components/FirstStep/FirstStep"
import SecondStep from "./Components/SecondStep/SecondStep"
import ThirdStep from "./Components/ThirdStep/ThirdStep"
import FourthStep from "./Components/FourthStep/FourthStep"
import "./steps.css"
import useCheckToken from "../../Hooks/useCheckToken";
import { Dialog } from '@mui/material/';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ShareButtons from "../../common/Components/ShareComponents/ShareButtons";
import {parseDays} from "../../helpers/eventsDaysRendering"

import WhatsApp from "../../SVG/WhatsApp.svg"
import Facebook from "../../SVG/Facebook.svg"
import Instagram from "../../SVG/Instagram.png"
import Twitter from  "../../SVG/Twitter.svg"
import Mail from "../../SVG/Mail"
import PhoneIcon from "../../SVG/phone.jsx"
import WebIcon from "../../SVG/WebIcon.svg"

import CreatingStartDialog from "../../Components/CreatingStartDialog";
import { useContext } from 'react';
import { AuthContext } from "../../helpers/AuthContext";

function Create({serviceOrEvent, route, method}) {
  const accessToken =localStorage.getItem("accessToken")
  const setApiCall = useCheckToken(()=>{})

  const [openStartDialog, setOpenStartDialog] = useState(true)
  const [principalImageURL, setPrincipalImageURL] = useState("")
  const [secondaryImages, setSecondaryImages] = useState([])
  const [error, setError] = useState(false)
  const [allowReservation, setAllowReservation] = useState(false)
  const [lastDateInDateInput, setLastDateInDateInput] = useState("")
  const [newPostId, setNewPostId] = useState("")
  const {setOpenLoadingBackdrop} = useContext(AuthContext)
  const [contact, setContact] = useState({
    phone: "",
    email: "",
    whatsApp: "",
    webSite: "",
    facebook: "",
    twitter: "",
    instagram: "",
  })

  const [cover, setCover] = useState({
      ForMen: 0,
      ForWomen:0,
      WorkingWithUs:0,
      Regular: 0,
      ForFEU: 0,
  })

  const [coverSelected, setCoverSelected] = useState({
    ForGender:false,
    Regular: false,
    ForFEU: false,
  })

  const coverHandling = {
    cover,
    setCover,
    coverSelected,
    setCoverSelected,
  }

  const [contactButtons, setContactButtons] = useState([
        {
            state: false,
            icon:WebIcon,
            button: "webSite"
        },
        {
            state:  false,
            icon:   WhatsApp,
            button: "whatsApp"
        },
        {
            state: false,
            icon:Facebook,
            button: "facebook"
        },
        {
            state: false,
            icon:Twitter,
            button:"twitter"
        },
        {
            state: false,
            icon:Instagram,
            button:"instagram"
        },
    ])
    const [directContact, setDirectContact] = useState([
      {
          state: false,
          icon:  <PhoneIcon/>,
          button:  "phone"
      },
      {
          state: false,
          icon:<Mail/>,
          button: "email"
      },
    ])
  const [time, setTime] = useState({
    eventsDays: [],
    weekDays: "",
    startDays: "",
    endDays: "",
    startHour: "",
    exitHour: "",
  })

  const [exactDirection, setExactDirection] = useState({
    placeToSetEvent: "",
    province: "La Habana",
  })
  const [formValues, setFormValues] = useState({
    name:"",
    description:"",
    township: "",
    cover:"",
    type:"",
    principalImage:"",
    allowReservation: false,
    typeOfMusicPlayed: "",
    secondaryImages : [],
  })

  const {id} = useParams();
  const history = useHistory();
  const [successUpload, setSuccessUpload] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    }
    if(id && method!=="patch" && serviceOrEvent === "event"){
      setApiCall( "get", "http://localhost:3001/services/getName/" + id )
      .then((e)=>{
        setFormValues({ ...formValues, placeToSetEvent: e.data.name })
      })
      .catch(e => console.log(e))
    }
    if(method==="patch"){
      setApiCall("get",`${route}${id}`)
      .then(e=>{
        let response
        if(serviceOrEvent === "service"){
          response = e.data.service;
        }
        if(serviceOrEvent === "event"){
          response = e.data
        }
      

      const {name, description, township, cover, type, principalImage, secondaryImages, typeOfMusicPlayed} = response;
      setFormValues({ name ,description ,township ,cover ,type , principalImage, typeOfMusicPlayed })
      setPrincipalImageURL(principalImage)
      setSecondaryImages(secondaryImages)
      const {phone, email, whatsApp,webSite,facebook,twitter,instagram } = response.contact;
      
      serviceOrEvent==="service"
      ? setContact({ phone, email,webSite,facebook,twitter,instagram })
      : setContact({ phone, email, whatsApp })

      const {eventsDays, startDays, endDays, startHour, exitHour } = response.time;
      setTime({ startHour, exitHour,})
      serviceOrEvent==="service"
      ? setTime({ startHour, exitHour, startDays, endDays })
      : setTime({ startHour, exitHour, eventsDays })

      const {principalStreet,firstMiddleStreet,secondMiddleStreet,number,province} = response.exactDirection;
      setExactDirection({principalStreet,firstMiddleStreet,secondMiddleStreet,number,province})
    }).catch(e=>setError(true))
    }
  }, []);

  const handleChange = input => e =>{
    setFormValues({...formValues,[input]: e.target.value,})
  }
  const handleContactChange = input => e =>{
    setContact({...contact,[input]: e.target.value,})
  }
  const handleTimeChange = input => e =>{
    setTime({...time,[input]: e.target.value,})
  }
  const handleDirectionChange = input => e =>{
    setExactDirection({...exactDirection,[input]: e.target.value,})
  }
  const handlePrincipalImageChange = (e)=>{
    const file = e.target.files[0];
    setOpenLoadingBackdrop(true)
    new Compressor(file, {
      quality: 0.6,

      success(result) {
        setOpenLoadingBackdrop(true)
        const formData = new FormData();
        formData.append("file", result)
        formData.append("upload_preset", `${serviceOrEvent==="event"? "events":"service"}`)
        axios.post("https://api.cloudinary.com/v1_1/dolzgvsos/image/upload",
        formData)
        .then(e =>{
          setPrincipalImageURL(e.data.secure_url);
          setOpenLoadingBackdrop(false);
        })

        .catch(e => {
          setError(true);
          setOpenLoadingBackdrop(false)
        })
      },

      error(err) {
        setOpenLoadingBackdrop(false)
        setError(true);
      },
    })
  }
  const handleSecondaryImageChange = (e) =>{

    setOpenLoadingBackdrop(true)
    for(let i= 0; i < e.target.files.length; i++){
      
      new Compressor(e.target.files[i], {
      quality: 0.6,

      success(result) {
        const formData = new FormData();
        setOpenLoadingBackdrop(true)
        formData.append("file", result)
        formData.append("upload_preset", serviceOrEvent)
        axios.post("https://api.cloudinary.com/v1_1/dolzgvsos/image/upload",
        formData)
        .then(element =>{
          setOpenLoadingBackdrop(false)
          setSecondaryImages(prevImage => [...prevImage, element.data.secure_url])
        })
        .catch(error => {
          setError(true);
          setOpenLoadingBackdrop(false)
        })
        
      },

      error(err) {
        setError(true);
      },
      })
      setOpenLoadingBackdrop(false)
    }
  }
  const onSubmit = (e) => {
    setOpenLoadingBackdrop(true)
    e.preventDefault();
    formValues.allowReservation = allowReservation;
    formValues.contact = contact;
    formValues.time = time;
    formValues.exactDirection = exactDirection;
    formValues.principalImage = principalImageURL;
    formValues.secondaryImages = secondaryImages;
    formValues.cover = cover;
    let rejectedContacts = []
  
    rejectedContacts = directContact.filter(e =>  !e.state)
    rejectedContacts = rejectedContacts.concat( contactButtons.filter(e => !e.state))

    rejectedContacts.map((e)=>{
      if(e.button === "phone"){
        formValues.contact.phone = ""
        contact.phone=""
      }
      if(e.button === "email"){
      formValues.contact.email = ""
      contact.email=""
    }
      if(e.button === "whatsApp"){
      formValues.contact.whatsApp = ""
      contact.whatsApp = ""
    }
      
      if(e.button === "webSite"){
      formValues.contact.webSite = ""
      contact.webSite = ""
    }
      if(e.button === "facebook"){
      formValues.contact.facebook = ""
      contact.facebook = ""
    }
      if(e.button === "twitter"){
      formValues.contact.twitter = ""
      contact.twitter = ""
    }
      if(e.button === "instagram"){
      formValues.contact.instagram = ""
      contact.instagram = ""}
    })
    //Esto se realiza para que en caso de que el se hayan seleccionado
    //previamente alguno de los 2 otros 2 tipos de inputs en EventsTypes
    //Garantizar que sean borrados todos los elementos dentro de estos.
    if(typeOfEventByDay==="weeklyRepeat"){
      time.eventsDays = undefined;
      time.continuesEventsStartDay = undefined;
      time.continuesEventsEndDay = undefined;
    }
    if(typeOfEventByDay==="perDay"){
      time.weekDays = undefined;
      time.continuesEventsStartDay = undefined;
      time.continuesEventsEndDay = undefined;
    }
    if(typeOfEventByDay==="continuesDays"){
      time.continuesEventsStartDay = parseDays(time.continuesEventsStartDay).getTime();
      time.continuesEventsEndDay   = parseDays(time.continuesEventsEndDay).getTime();
      time.weekDays = undefined;
      time.eventsDays = undefined;
    }
    //TODO: Se debe de integrar en componentes para seguir las normas de programación
    if(method==="post"){
      if(id){ formValues.serviceBounded = id }
        axios.post(`${route}`, formValues,
        { headers: {'Authorization': 'Bearer '+ accessToken},}
      )
      .then((response) => {
        setSuccessUpload(true);
        setNewPostId(response.data._id);
        //history.push("/");
        setOpenLoadingBackdrop(false)
      })
      .catch(e => {
        setError(true)
        setOpenLoadingBackdrop(false)
      })
      }
      //TODO: Establecer en componentes
      if(method==="patch"){
        axios
        .patch(`${route}${id}`, formValues,
        { headers: {'Authorization': 'Bearer '+ accessToken},}
      )
      .then(() => {
        setOpenLoadingBackdrop(false)
        history.push("/");
      })
      .catch(e => {
        setOpenLoadingBackdrop(false)
        setError(true);
      });
      setOpenLoadingBackdrop(false)
      }
      setOpenLoadingBackdrop(false)
    }
    const [typeOfEventByDay, setTypeOfEventByDay] = React.useState("")
    const [actualStep, setActualStep] = useState(0)
    //TODO: Esto es el renderizador de componentes
    const formSteps = ()=>{
      switch(actualStep){
        case 0:
          return <FirstStep 
          formValues={formValues}
          handleChange={handleChange}
          serviceOrEvent={serviceOrEvent}
          setFormValues={setFormValues}
          setContact={setContact}
          setActualStep={setActualStep}
          setError={setError}
          coverHandling={coverHandling}
          handlePrincipalImageChange={handlePrincipalImageChange}
          principalImageURL={principalImageURL}
          setPrincipalImageURL={setPrincipalImageURL}
          />
        case 1:
          return <SecondStep

          contactButtons={contactButtons}
          setContactButtons={setContactButtons}
          directContact={directContact}
          setDirectContact={setDirectContact}
          typeOfEventByDay={typeOfEventByDay}
          setTypeOfEventByDay={setTypeOfEventByDay}
          method={method}
          setAllowReservation={setAllowReservation}
          allowReservation={allowReservation}
          contact={contact}
          handleContactChange={handleContactChange}
          serviceOrEvent={serviceOrEvent}
          time={time}
          setTime={setTime}
          handleTimeChange={handleTimeChange}
          lastDateInDateInput={lastDateInDateInput}
          setLastDateInDateInput={setLastDateInDateInput}
          setActualStep={setActualStep}
          setError={setError}
          />
        
        case 2: 
        return <ThirdStep
        time={time}
        setTime={setTime}
        handleTimeChange={handleTimeChange}
        serviceOrEvent={serviceOrEvent}
        lastDateInDateInput={lastDateInDateInput}
        setLastDateInDateInput={setLastDateInDateInput}
        exactDirection={exactDirection}
        formValues={formValues}
        handleChange={handleChange}
        handleDirectionChange={handleDirectionChange}
        setActualStep={setActualStep}
        setError={setError}
        />
      case 3:
        return <FourthStep 
        handlePrincipalImageChange={handlePrincipalImageChange}
        handleSecondaryImageChange={handleSecondaryImageChange}
        serviceOrEvent={serviceOrEvent}
        principalImageURL = {principalImageURL}
        setPrincipalImageURL = {setPrincipalImageURL}
        secondaryImages = {secondaryImages}
        setSecondaryImages = {setSecondaryImages}
        setOpenLoadingBackdrop={setOpenLoadingBackdrop}
        setActualStep={setActualStep}
        setError={setError}
        onSubmit={onSubmit}
        formValues={formValues}
        handleChange={handleChange}
        exactDirection={exactDirection}
        handleDirectionChange={handleDirectionChange}
        />
      default:
        return
    }
  }

  return(
    <>
    {error&& <div style={{textAlign: "center",
    background: "#752b2b",
    borderRadius: "13px"}} className="font-color-white"> <p style={{ padding: "5px"}}>Por favor, revise su conexión o los datos insertados</p>
    </div>}
    
      <div
       id="authContainer"
       className="Form font-color-white"
       //style={{ height: "75vh"}}
      >
      <h2 className="font-color-white">Publique su {serviceOrEvent==="service"? "Local" : "Evento"}</h2>
      <div className="d-f f-d-c">
        {formSteps()}
      </div>

      </div>
      <Dialog onClose={()=>{setSuccessUpload(false)}} open={successUpload} id="dialog">
                <div style={{
                background: "#0a0a0a",
                borderRadius: "20px",
                width: "82vw",
                padding: "50px 0",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                alignItems: "center",
                maxWidth: "330px",
                }} 
                className="font-color-white"
                >
                <p className="d-f j-c-c a-i-c f-d-c font-color-white font-size-20" style={{marginBottom:"15px"}}>Éxito en Publicación<CheckCircleOutlineIcon color={"green"} style={{color:"green"}}/></p>
                <p style={{textDecoration: "underline", marginBottom: "40px"}} onClick={()=>{setSuccessUpload(false); setActualStep(0)}}>¿ Desea insertar otro ?</p>

                <p style={{textDecoration: "underline"}} onClick={()=>{history.push("/")}}>
                  Ir a la Página Principal
                </p>

                <p style={{textDecoration: "underline"}} onClick={()=>{
                  window.open(`https://www.perxins.com/${serviceOrEvent==="service"? "service" : "event"}/${newPostId}`)
                  }}>
                  Ir a la Página Creada
                </p>

                <p 
                  className="t-a-c" 
                  style={{margin: "5px"}}
                >
                  ¡Cuánto más lo compartas, más llegarán a ti!
                </p>
                  <div className="d-f j-c-s-e" style={{marginTop: "25px", width: "100%"}}>
                    <ShareButtons
                      quote = {formValues.name}
                      currentUrl = {window.location.origin+`/${serviceOrEvent==="service"? "service" : "event"}`}
                      url = {newPostId}
                      hashtag = {formValues.name}
                    />
                  </div>

                </div>
            </Dialog>
            <CreatingStartDialog
            openStartDialog={openStartDialog} 
            setOpenStartDialog={setOpenStartDialog}/>
    </>
    )}
export default Create;