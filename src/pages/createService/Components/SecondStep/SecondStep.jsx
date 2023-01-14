//import {useState} from 'react'
import { TextField,
     FormControl,
     FormLabel,
     RadioGroup,
     FormControlLabel,
     Switch,
     Radio,
     } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

import SelectWeekDay from '../../../../common/Components/SelectWeekDay';
import CalendarToSetDay from '../../../../common/Components/CalendarToSetDay';
import ContactSelector from '../../other/ContactSelector';

function SecondStep({
    time,
    setTime,
    handleTimeChange,
    lastDateInDateInput,
    setLastDateInDateInput,
    contact,
    handleContactChange,
    serviceOrEvent,
    allowReservation,
    setAllowReservation,
    method,
    typeOfEventByDay,
    setTypeOfEventByDay,
    directContact,
    setDirectContact,
    contactButtons, 
    setContactButtons,
    setActualStep,
    setError
}) {

    const onSubmit = (e) =>{
        e.preventDefault()
        setActualStep(prevState => prevState + 1); 
        setError(false)
    }

    const handleTypeOfEventByDay = (event) => {
        setTypeOfEventByDay(event.target.value);
    }

    return (
        <form onSubmit={onSubmit} className='formContent font-color-white'>
            <h1>Contacto</h1>
            <p>Seleccione formas de Contactarle</p>
            <ContactSelector
                contactButtons={contactButtons}
                directContact={directContact}
                serviceOrEvent={serviceOrEvent}
                setContactButtons={setContactButtons}
                setDirectContact={setDirectContact}
            />
        {directContact.map((e,key)=>{
        if(e.state && (e.button === "phone")){
        return <TextField 
            key={key}
          color="primary"
          variant="standard"
          className="inputs-changer font-size-25 font-color-white inputs-shape  margin-top-5vh" 
          name='phone'
          placeholder='78658424'
          type={`${method==="patch"?"text":"number"}` }
          value={contact.phone} 
          required
          onChange={handleContactChange("phone")}
          label="Teléfono Fijo"
        />
        }
        if(e.state && (e.button === "email")){
            return <TextField 
            key={key}
            color="primary"
            variant="standard"
            className="inputs-changer font-size-25 font-color-white inputs-shape  margin-top-5vh" 
            name='email' 
            type="email" 
            required
            value={contact.email} 
            onChange={handleContactChange("email")}
            label="Email de Contacto"
            />
        }
        return null
    })}
        {contactButtons.map((e,key)=>{
        if(e.state && (e.button === "whatsApp")){
            return <>
            <TextField 
                key={key}
                color="primary"
                variant="standard"
                className="inputs-changer font-size-25 font-color-white inputs-shape  margin-top-5vh" 
                name='whatsapp' 
                type="text" 
                required
                value={contact.whatsApp} 
                onChange={handleContactChange("whatsApp")}
                label="Número de WhatsApp"
            />
            <div className='centerElement f-d-c'>
                <p>Admite Reservaciones por WhatsApp</p>
                <div className='d-f t-a-c j-c-c a-i-c'>
                    <p>No</p>
                <Switch
                        value={allowReservation}
                        checked={allowReservation}
                        onChange={() => setAllowReservation(prevState => !prevState)}
                        name="allowReservation"
                        color="primary"
                    />
                    <p>Sí</p>
                </div>
            </div>
            </>
        }
        if(e.state && (e.button === "webSite") && serviceOrEvent==="service"){
            return (<>
        <TextField 
        key={key}
        color="primary"
        variant="standard"
        required
        placeholder='www.perxins.com'
        className="inputs-changer font-size-25 font-color-white inputs-shape  margin-top-5vh" name='webSite' type="text" 
        value={contact.webSite} 
        onChange={handleContactChange("webSite")}
        label="Sitio Web "
        />
         <a
            target="_blank"
            rel="noreferrer"
            href={`https://${contact.webSite}`} 
            >{contact.webSite}
        </a>
        </>)
        }
        if(e.state && (e.button === "facebook") && serviceOrEvent==="service"){
            return (
                <>
            <TextField 
                key={key}
                color="primary"
                variant="standard"
                required
                placeholder='https://m.facebook.com/Perxins-103949482452169'
                className="inputs-changer font-size-25 font-color-white inputs-shape  margin-top-5vh" name='facebook' type="text" 
                value={contact.facebook} 
                onChange={handleContactChange("facebook")}
                label="Página de Facebook "
            />
            <a
                target="_blank"
                rel="noreferrer"
                href={`https://m.facebook.com/${contact.facebook}`} 
                >m.facebook.com/{contact.instagram}
            </a>
        </>)
        }
        if(e.state && (e.button === "twitter") && serviceOrEvent==="service"){
            return(
            <>
        <TextField 
            key={key}
            color="primary"
            variant="standard"
            required
            placeholder='https://mobile.twitter.com/perxinsencuba/'
            className=" inputs-changer font-size-25 font-color-white inputs-shape  margin-top-5vh" name='twitter' type="text" 
            value={contact.twitter} 
            onChange={handleContactChange("twitter")}
            label="Página de twitter"
        />
         <a
            target="_blank"
            rel="noreferrer"
            href={`https://mobile.twitter.com/${contact.twitter}`} 
            >mobile.twitter.com/{contact.twitter}
        </a>
            </>)
        }
        if(e.state && (e.button === "instagram") && serviceOrEvent==="service"){
        return(
        <>
        <TextField 
            key={key}
            color="primary"
            variant="standard"
            required
            placeholder='https://www.instagram.com/perxinsencuba/'
            className="inputs-changer font-size-25 font-color-white inputs-shape  margin-top-5vh" name='instagram' type="text" 
            value={contact.instagram} 
            onChange={handleContactChange("instagram")}
            label="Página de Instagram "
        />
        <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.instagram.com/${contact.instagram}`} 
            >www.instagram.com/{contact.instagram}
        </a>
        </>
            )
        }})
        }
        
            {serviceOrEvent==="event"&&
            <div className='d-f f-d-c'>
            <FormControl>
                <FormLabel className="font-size-20" style={{color:"white"}}>
                    Tipo de Evento Según Ocurrencia
                </FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="perDay"
                    name="radio-buttons-group"
                    value={typeOfEventByDay}
                    onChange={handleTypeOfEventByDay}
                >
                    <FormControlLabel value="weeklyRepeat" control={<Radio />} label="Repetición Semanal" />
                    <FormControlLabel value="perDay" control={<Radio />} label="Por Día" />
                    <FormControlLabel value="continuesDays" control={<Radio />} label="Días continuados" />
                </RadioGroup>
            </FormControl>
            {typeOfEventByDay==="weeklyRepeat"&&   <SelectWeekDay time={time} setTime={setTime}/>}

            {typeOfEventByDay==="perDay"&& <CalendarToSetDay label={"Día del Evento"} 
            mainObject={time} 
            setMainObject={setTime}
            required
            setLastDateInDateInput={setLastDateInDateInput}
            lastDateInDateInput={lastDateInDateInput}
            keyToChange={"eventsDays"} />}

            {typeOfEventByDay==="continuesDays"&&
            <div>
            <CalendarToSetDay
                label={"Día de empezar el Evento"} 
                mainObject={time} 
                setMainObject={setTime}
                required
                setLastDateInDateInput={setLastDateInDateInput}
                lastDateInDateInput={time.continuesEventsStartDay}
                keyToChange={"continuesEventsStartDay"}
            />

            <CalendarToSetDay 
            label={"Día de terminar el Evento"} 
            mainObject={time} 
            setMainObject={setTime}
            required
            setLastDateInDateInput={setLastDateInDateInput}
            lastDateInDateInput={time.continuesEventsEndDay}
            keyToChange={"continuesEventsEndDay"} />
            </div>}
            </div>
            }
        <div
        //style={{minHeight:"65vh"}}
        className="formButtons">
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
    )
}

export default SecondStep;