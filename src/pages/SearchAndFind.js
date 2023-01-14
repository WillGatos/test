import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from 'react-router';
import { AuthContext } from "../helpers/AuthContext";
import ShareIcon from '@mui/icons-material/Share';
import Cards from "../Components/Cards";
import useCheckToken from "../Hooks/useCheckToken";
import ShareModal from "../common/Components/ShareComponents/ShareModal";
import TextField from '@mui/material/TextField';
//import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import provinceAndTownships from "../helpers/provinceAndTownships";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useSelector, useDispatch } from 'react-redux'
import { getMoreServices, eraseAllServices, changeLikeServices } from "../Redux/Service/serviceSlice"
import { getMoreEvents, eraseAllEvents, changeLikeEvents } from "../Redux/Event/eventSlice"
import SelectionType from "../Components/SelectionType";
import {typeOfMusicPlayedForSearch} from "../helpers/typeOfMusicPlayed"
import Favorite from "../SVG/Favorite";
import Comment from "../SVG/Comment";
import FavoriteBorder from "../SVG/FavoriteBorder";
import {eventsDaysFormate} from "../helpers/eventsDaysRendering";
import axios from "axios";
import {weekEntireDay} from "../helpers/weekDay";
import Search from "../SVG/Search";
import townshipBinds from "../helpers/townshipBinds";
import ReactHelmet from "../common/Components/SEO/ReactHelmet";
import SubmitDialog from "../common/Components/SubmitDialog";
import perxinsIcon from "../SVG/PenroseTriangle.png"
import { Link } from "react-router-dom";

function SearchAndFind({ likesUrl, apiURL, serviceOrEvent, query, setQuery}) {
  const { authState, setOpenLoadingBackdrop } = useContext(AuthContext);
  const [search, setSearch] = useState(true)

  const [shareValues, setShareValues] = useState({})
  const [open, setOpen] = useState(false);
  const [likedServices, setLikedServices] = useState([])
  const [nextSearchQuery, setNextSearchQuery] = useState(false)

  const serviceReduxStore = useSelector((state) => state.serviceReduxStore);
  const eventReduxStore = useSelector((state) => state.eventReduxStore);
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const [error, setError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  
  const { _id } = authState;
  let history = useHistory();

  let searchDefaultOnBottom = {
    skip: 10,
    isDefaultSearch: true,
  };
  const observer = React.useRef()

  const handleClickOpen = () => setOpen(true);
  const setApiCall = useCheckToken(()=>{})
  const handleClose = () => setOpen(false);
  const getLikedService = React.useCallback(()=> {
      if(accessToken)
      setApiCall("get","https://api.perxins.com/user/fullUser")
      .then(e => {
      const givenLikes = e.data.givenLikes;
      
      setLikedServices(givenLikes)
    })
    .catch(()=>{})
  },[])

  const handleServicesFetching = (response) => {
    const newData = response.data.sort(e => {
      const {time} = e; 
      if(time.eventsDays) return -1
      if(time.weekDays) return 0
      if(time.continuesEventsStartDay) return 1
      else return 0
    })
    serviceOrEvent==="service"?
    dispatch(getMoreServices(newData)):
    dispatch(getMoreEvents(newData))
    //setServicesList(response.data);
    setSearch(false);
  }
  const searchByQuery = (url) => {
    Object.keys(query).forEach(key => {
      if (
      query[key] === ''  ||
      query[key] === null||
      query[key] === []  ||
      query[key] === ""  ||
      query[key] === "Ninguno"||
      query[key] === "Cualquiera"
      ) {
        delete query[key];
      }
    });
    console.log(query)
    const urlQueries = new URLSearchParams(query).toString()
      setApiCall("get",`${url}?${urlQueries}`)
      .then( response => handleServicesFetching(response))
      .then(() => {
        getLikedService()
        setOpenLoadingBackdrop(false)
      })
      .catch((e)=> {
        setError(true)
        setOpenLoadingBackdrop(false)
      })
      setOpenLoadingBackdrop(false)
  }

  const setDefaultSearch = (url) => {
    setApiCall("get", url )
      .then( response => handleServicesFetching(response))
      .then(() => {
        getLikedService()
        setOpenLoadingBackdrop(false)
      })
      .catch((e)=> {
        setError(true)
        setOpenLoadingBackdrop(false)
      })
      setOpenLoadingBackdrop(false)
  }
  const setDefaultSearchOnSkip = (url) => {
    setApiCall("get", url )
      .then( response => handleServicesFetching(response))
      .then(() => {
        getLikedService()
        searchDefaultOnBottom.skip += 10;
        setOpenLoadingBackdrop(false)
      })
      .catch((e)=> {
        setError(true)
        setOpenLoadingBackdrop(false)
      })
      setOpenLoadingBackdrop(false)
  }
  const onSearch = (e) => {
    setOpenLoadingBackdrop(true)
    if(e) {
      serviceOrEvent==="service"?
      dispatch(eraseAllServices()):
      dispatch(eraseAllEvents())
      e.preventDefault()
    }
    query.weekDays = []
    if(serviceOrEvent==="event"){
      query.eventsDays = query.eventsDays.sort((dateA, dateB)=>{
        return new Date(dateA) - new Date(dateB);
      })
      query.eventsDays.forEach( dayString =>{
        const date = new Date(dayString.replace(/-/g, '\/')).getDay();
        query.weekDays.push(date);
      })
    }
    //query.weekDays = [weekDayArray];

    searchByQuery(apiURL)

  }
  const handleQueryChange = input => e =>{
    setQuery({...query, [input]: e.target.value})
  }
  const likeAService = (serviceId) => {
    console.log(likesUrl, { associatedId: serviceId, userId: _id })
    setApiCall(
      "post",
      likesUrl,
      { associatedId: serviceId, userId: _id }
      )
    .then((response) => {
      const {liked, serviceLikes} = response.data;
      if(serviceOrEvent==="event"){
        dispatch(
          changeLikeEvents({liked, serviceId, userId: _id, serviceLikes})
          )
      }else{
        dispatch(
          changeLikeServices({liked, serviceId, userId: _id, serviceLikes})
         ) 
      }

     setLikedServices(e => {
      if(liked){
        e.push(serviceId)
        return [...e]
      }else{
        return e.filter(e => e!==serviceId)
      }
     })
    })
    .catch(e => setLoginError(true))
  }
  const sharingCard = (url, quote)=>{
    setShareValues({url, quote})
  }
  const getNewDataAfterBottom = (township) => {
    //setNextSearchQuery(false)
    query.township = township
    searchByQuery(`${apiURL}/findBasic`)
  }

  const footerCard = (service)=>{
    return (
      <div className="cardFooterContainer d-f">
                <div
                className="like d-f a-i-c j-c-c" 
                onClick={()=>likeAService(service._id, service.likes)}
                >
                  {(likedServices.some(element => 
                     element === service._id
                    ))? <Favorite /> :  <FavoriteBorder />}
                  <label className="font-color-white"> {service.numberOfLikes}</label>
                </div>

                <div className="footerCardBottomsContainer d-f a-i-c f-d-c j-c-c" onClick={()=>{ history.push(`/${serviceOrEvent}/message/${service._id}`)}}>
                {/* <label className="font-color-white">{service.messages?.length}</label> */}
                  <Comment/>
                </div>

                <div className="footerCardBottomsContainer d-f a-i-c f-d-c j-c-c" 
                  onClick={()=>{
                  sharingCard(service._id, service.name);
                  handleClickOpen()
                  axios.get(`https://api.perxins.com/${serviceOrEvent}s/shared/${service._id}`, /* {
                    headers:  {'Authorization': 'Bearer '+ accessToken},
                  } */)
                }}
                  >
                  <ShareIcon style={{color: "#40A3DA", width: "30px", height: "30px"}}/>
                </div>
                {service.perxinsGift &&
                <div className="d-f j-c-f-e a-i-c" style={{width: "35%"}}>
                  
                  <img src={perxinsIcon} style={{width:"25px"}} alt="Gift"/>
                </div>}
              </div>
    )
  }

  useEffect(()=>{
    if(accessToken) getLikedService()

    if((serviceReduxStore.length !== 0) && (serviceOrEvent==="service")){
      setSearch(false);
    }
    else if(serviceOrEvent==="event" && eventReduxStore?.length !== 0){
      setSearch(false);
    }
    else{
      setDefaultSearch(`https://api.perxins.com/${serviceOrEvent === "service" ? "services" : "events"}/defaultSearch`);
      //TODO: Llamada a una ruta que sea findAll.skip.limit(20)
      setSearch(false);
    }
  },[])

  const lastElementObserver = React.useCallback((node)=>{
    if(observer.current) {
      //que hace disconnect?
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver(entries =>{
      if(entries[0].isIntersecting){
        if(searchDefaultOnBottom.isDefaultSearch){
          setDefaultSearchOnSkip(
            "https://api.perxins.com/services/defaultSearchOnSkip?skip="
            + searchDefaultOnBottom.skip
            )
        }
        else{
          setNextSearchQuery(true)
        }
        
      }
    })

    if(node) observer.current.observe(node)
  },[])

  const observerEvent = React.useRef()
  const lastEventObserver = React.useCallback((node)=>{
    if(observerEvent.current) {
      observerEvent.current.disconnect()
    }
    observerEvent.current = new IntersectionObserver(entries =>{
      if(entries[0].isIntersecting){
        if(searchDefaultOnBottom.isDefaultSearch){
          setDefaultSearchOnSkip(
            "https://api.perxins.com/events/defaultSearchOnSkip?skip="
            + searchDefaultOnBottom.skip
            )
        }
        else{
          setNextSearchQuery(true)
        }
      }
    })
    if(node) observerEvent.current.observe(node)
  },[])

  let lastDay = ""
  const isNewDay = (serviceTime, isPaying, weekDays, continuesEventsEndDay) => {
    if(serviceTime===lastDay){
      return
    }
    if(isPaying){
      return <p>Recomendados <hr/></p>
    }
    if(weekDays){
      return <p>Repetidos los {weekEntireDay[+weekDays]}<hr/></p>
    }
    if(continuesEventsEndDay && lastDay !== "continuesEventsEndDay"){
      lastDay = "continuesEventsEndDay";
      return <div><p>Eventos de más de un día</p> <hr/></div>
    }
    if(serviceTime) {
      lastDay = serviceTime
      serviceTime = new Date(serviceTime)
      return <p>{serviceTime.getDate()+1} - {serviceTime.getMonth()+1} <hr/></p>
    }
  }

  return (
    <ReactHelmet
    title={`Buscar ${serviceOrEvent==="service"?"Locales":"Eventos"}`}
    description={`Buscar ${serviceOrEvent==="service"?"Locales":"Eventos"} en La Habana`}
    >
    <div>
      {search
      ?<form onSubmit={onSearch} id="authContainer"> 
      {error&& <p className="errorMessage">Compruebe su conexión</p>}
      <p className="font-size-25 font-color-white">Buscar en Perxins</p>
        <p className="font-size-25 font-color-gray">{serviceOrEvent==="service"?"Locales":"Eventos"}</p>
        <FormControl 
          className="border-blue inputs-changer"
          variant="standard" 
          sx={{ m: 1, minWidth: 120 }}
        >
        <InputLabel 
          id="demo-simple-select-helper-label" 
          style={{color:"white"}}
        >
          Provincia
        </InputLabel>
        <Select 
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label='Provincia'
          name='province'
          value={query.province}
          onChange={handleQueryChange("province")}
          className="border-blue font-size-25 font-color-white inputs-shape"
          color="primary"
          required
          //defaultValue={"La Habana"}
          style={{color: "white"}}
          >
            { provinceAndTownships.map((e,key) => 
             <MenuItem key={key} value={e.province}>{e.province}</MenuItem>
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
            value={query.township}
            onChange={handleQueryChange("township")}
            className="font-color-white inputs-shape box-shadow"
            color="primary"
            required
            style={{color: "white"}}
          >
            { provinceAndTownships.map((e,key) => {
            if(e.province === query.province){
             return e.township.map((township,key2)=>
                <MenuItem key={key} key2={key2} value={township}>{township}</MenuItem>
                )
            }
            })}
          </Select>
          </FormControl>
          <SelectionType 
            serviceOrEvent={serviceOrEvent}
            query={query}
            handleQueryChange={handleQueryChange}
          />
          {/* <button onClick={()=> setOpenDialog(true)}>hola</button> */}
      {serviceOrEvent==="event"&&
        <div>
          <input 
            placeholder="Elige un Día" 
            type="date"
            id="anchor-playground"
            style={{
              height: "1.4375em",
              padding: "13px 2vw 15px 2vw",
              background: "#2e343b00",
              fontFamily:'Montserrat, sans-serif',
              border: 0,
              width: "80vw",
              borderBottom: "1px solid #008cff"
            }}
            className="font-color-white margin-top-3vh"
            label="Días"
            name="eventsDays"
            value={query.eventsDays[query.eventsDays.length - 1]}
            required
            onChange={(e)=> {if(!query.eventsDays.some(day =>day===e.target.value ))setQuery({...query, eventsDays: [...query.eventsDays, e.target.value]})}}
            />
      </div>}
      {serviceOrEvent==="event" &&
        <div className='centerElement'>
          {query.eventsDays.map((e,key)=>
          <div
          key={key}
          className='eventsDays' 
          onClick={()=>{
            setQuery({...query, eventsDays : [...query.eventsDays.filter(date=> date!==e)]})
          }}
          style={{"flexDirection":"row"}}>
            <p className="d-f f-d-c t-a-c">{eventsDaysFormate(e)}</p>
          </div>
          )}
        </div>
      }

      <FormControl className="border-pallid-blue inputs-changer" variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Preferencia Músical</InputLabel>
          <Select 
          placeholder=" "
          id="selectButton"
          label='Preferencia Músical'
          name='typeOfMusicPlayed'
          value={query.typeOfMusicPlayed}
          onChange={handleQueryChange("typeOfMusicPlayed")}
          className="inputs-changer font-size-25 font-color-white inputs-shape"
          color="primary"
          defaultValue={""}
          >
          {typeOfMusicPlayedForSearch.map((e,key)=>
          <MenuItem key={key} value={e}>{e}</MenuItem>
            )}
        </Select>
        </FormControl>
        <div className="d-f j-c-c w-85vw">
        </div>
        
        <button 
        type="submit"
        className="d-f j-c-c a-i-c b-button font-color-white border-0 h-45px inputs-shape margin-top-5vh font-size-25 margin-top-3vh">
          <p style={{marginRight: "10px"}}>Buscar</p> <Search/>
        </button>
        <div style={{marginBottom:"3vw"}}></div>
      </form>
      :
      <div className="d-f j-c-c a-i-c f-d-c a-c-c">
        {loginError&& <p className="t-a-c errorMessage">Debe iniciar sesión</p>}
      <p style={{
        background: "#181818",
        padding: "5px",
        borderRadius: "16px",
        marginTop: "3vh",
        color: "white",
      }}>Resultados de la busqueda:</p>
      {
      serviceOrEvent==="service"?
        serviceReduxStore.map((service, key) => {
        return (
          <div ref={lastElementObserver} key={key}>
          <Link to={`/${serviceOrEvent}/${service._id}`}>
            <Cards 
              service={service}
              serviceOrEvent={serviceOrEvent}
              key={key}>
                {footerCard(service)}
            </Cards>
          </Link>
          </div>
        )}):
        eventReduxStore.map((service, key) => {
          return (
            <div 
            ref={lastEventObserver}
            key={key}
            >
            <div className="font-color-white" style={{marginTop: "3vh"}}>
              <p>{isNewDay(service.time.eventsDays, service.isPaying, service.time.weekDays, service.time.continuesEventsEndDay)}</p>
              
              </div>
            <Link to={`/${serviceOrEvent}/${service._id}`}>
            <Cards 
              service={service}
              serviceOrEvent={serviceOrEvent}
              key={key}>
                {footerCard(service)}
            </Cards>
            </Link>
            </div>
          )})
        }

        {nextSearchQuery&&<div className="p-r" style={{margin: "5vh 0 15vh 0", width: "90%"}}>
          <p className="font-color-white">Desea ver otras ofertas en:</p>
          <div style={{width:"90%", top: "30px"}} className="p-a">
            {townshipBinds.map((bindsPerTownship) => {
            if(bindsPerTownship.township === query.township){
              return (bindsPerTownship.connections.map((e,key2) => <button
              key={key2}
              className=" border-radius-50 font-color-white"
              style={{
                padding: "3px 8px",
                fontSize: "16px",
                letterSpacing: "0.5px",
                border: "0px",
                margin: "2px 5px",
                borderRadius: "50px",
                background: "#0e0e0e"
              }}
              onClick={()=>getNewDataAfterBottom(e)}
              >{e}</button>))
            }
          })}
          </div>
          </div>}
      </div>
      }
      
      <div onClick={()=>{
          setSearch(!search)
          searchDefaultOnBottom.isDefaultSearch = false
          }} className="circleButton" id="circleButtonLeft">
          <Search color="white" className="svgIcon"/>
        </div>
        <ShareModal 
          quote={shareValues.quote}
          url={shareValues.url}
          hashtag={"QuieroSalir!!"}
          open={open}
          onClose={handleClose}
          />
    </div>
    <SubmitDialog
    open={openDialog}
    setOpen={setOpenDialog}
    />
    </ReactHelmet>
  );
}

export default SearchAndFind;
/* <TextField 
          label='Nombre'
          name='name' 
          type="text" 
          value={query.name} 
          onChange={handleQueryChange("name")}
          color="primary"
        variant="standard"
        className="font-color-white inputs-shape box-shadow margin-top-5vh"
        /> */