import React,{useState, useRef, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import GoogleMapsIcon from "../SVG/GoogleMaps.png"
import "./IndividualPage.css"
import { Dialog, IconButton } from '@mui/material/';
import GoogleMaps from '../Components/GoogleMaps';
import useCheckToken from '../Hooks/useCheckToken';
import { AuthContext } from '../helpers/AuthContext';
import Rating from '@mui/material/Rating';
import PagesFooter from './PagesFooter';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from "react-router-dom";

import {localType, eventType} from '../helpers/iconsRefs'
import {eventsDaysFormate} from '../helpers/eventsDaysRendering'
import weekDay from '../helpers/weekDay';
import UnsubscribeButton from '../common/Components/UnsubscribeButton';
import SubscribeButton from '../common/Components/SubscribeButton';
import eventsDaysRendering from '../helpers/eventsDaysRendering';
import ReactHelmet from '../common/Components/SEO/ReactHelmet';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

function IndividualPage({serviceOrEvent}) {
    const [numberOfUsersRating, setNumberOfUsersRating] = useState(0)

    const [individualService, setIndividualService] = useState({
        name: "",
        type: "",
        description: "",
        cover: "",
        township: "",
        exactDirection:{
            principalStreet:"",
            firstMiddleStreet: "",
            secondMiddleStreet: "",
            number: "",
        },
        time:{
            startDays: "",
            endDays: "",
            startHour: "",
            exitHour: "",
        },
        contact: {
            email: "",
            phone:"",
            instagram: "",
            facebook: "",
            twitter: "",
            webSite: ""
        },
        principalImage: "",
        typeOfMusicPlayed:"",
        secondaryImages: [],
        avgPeopleServiceTreatmentRating: 0,
        avgPricingServiceRating: 0,
        avgServiceQualityRating: 0,
        events : [],
    })

    const reservationInput = useRef(null);
    const setApiCall = useCheckToken(()=>{})

    const [availabilityStatus, setAvailabilityStatus] = useState(false)

    const [ newRatingValues, setNewRatingValues] = useState({
        peopleServiceTreatmentRating : 0,
        pricingServiceRating : 0,
        serviceQualityRating : 0,
    })

    const [ modalImage, setModalImage ] = useState()
    const [ openImageModal, setOpenImageModal ] = useState(false);
    const [ openRating, setOpenRating ] = useState(false);
    const { authState, setAuthState, setOpenLoadingBackdrop } = React.useContext(AuthContext);
    const [loginError, setLoginError] = useState(false)
    const [seeMap, setSeeMap] = useState(false)
    const {id} = useParams();

    const handleClickOpenRating = (value) => {
        setOpenRating(true);
      };

      const handleCloseOfImageModal = () => {
        setOpenImageModal(false);
      };
      const handleCloseRating = () => {
        setOpenRating(false);
      };
      

    const ChangeURL = (string)=>{
        const urlArray = string.split("/");
        return urlArray[urlArray.length - 1];
    }

    const sendRating = ()=>{
        setApiCall(
        "post",
        "https://api.perxins.com/services/rateService", 
        {serviceId: individualService._id,
        ratings:{
            "serviceQualityRating": {
                rating: newRatingValues.serviceQualityRating,
            },
            "peopleServiceTreatmentRating":{
                rating: newRatingValues.peopleServiceTreatmentRating,
            },
            "pricingServiceRating":{
                rating: newRatingValues.pricingServiceRating,
            },
        }
        } )
        .then(e => setIndividualService({...individualService, ...e.data}))
        .catch(e=> {
                setLoginError(true)
        })
    }
    useEffect(() => {
          setApiCall("get",`https://api.perxins.com/${serviceOrEvent}s/${id}`)
          .then(response=>{
            if(serviceOrEvent === "service"){
                const data = response.data.service;
                setNumberOfUsersRating(response.data.numberOfUsersThatHasRate)
                setIndividualService(data);
            }
            else {
                const data = response.data
                setIndividualService(data);
            }
            setOpenLoadingBackdrop(false)

          })
          .then(()=>{
            let date = new Date().getHours();
            const aperture = +individualService.time.startHour.split(":")[0]
            let closure = +individualService.time.exitHour.split(":")[0]
            if(aperture>closure) closure += 24;
            if(aperture>date) date += 24;
            if((aperture<date)&&(date<closure)){
                setAvailabilityStatus(true)//True es Abierto
            }
            else{
                setAvailabilityStatus(false)// False es cerrado
            }
            setOpenLoadingBackdrop(false) 
          }
          )
          .catch(()=> setOpenLoadingBackdrop(false))
    }, [])
    const searchIcon = (individualService) => {
        let iconsRef = "";
        if(serviceOrEvent==="service"){
             localType.forEach(e=> {
                if(e.type===individualService.type)
                iconsRef = e.icon;
                })
        } else {
            eventType.forEach(e=> {
                if(e.type===individualService.type)
                iconsRef = e.icon;
                })
        }
        return iconsRef;
    }


    return (
    <ReactHelmet
    title={individualService.name}
    description={individualService.description}
    keywords={`${individualService.name}, ${individualService.type}, Música ${individualService.typeOfMusicPlayed}`}
    >
        <div className='individualPageContainer font-color-white'>
            
            {loginError && <p className="errorMessage">Por favor, inicie sesión</p>}
            <div>
                <div>
                    <div style={{marginBottom: "2vh", objectFit:"cover"}}className='principalImageContainer'>
                    <img 
                    onClick={()=>{setOpenImageModal(true); setModalImage(individualService.principalImage)}}
                    className="individualImage"
                    src={individualService.principalImage}
                    alt="Great Place"/>
                    </div>
                    <p className="font-size-25">{individualService.name}</p>
                    <p className="typeIndividualPage font-color-secondary" style={{marginBottom: "15px"}}><img src={searchIcon(individualService)} alt="d"/></p>
                    <div className='d-f f-d-c j-c-f-s' style={{textAlign: "start",
                                                                background: "white",
                                                                color: "black",
                                                                minHeight: "200px",
                                                                paddingLeft: "15px",
                                                                }}>
                        

                        {individualService.description !== "" &&
                        <>
                            <p className='font-size-20' style={{margin: "15px 0 15px 1rem"}}>
                                Descripción
                            </p>
                            <p className='descriptionIndividualPage' style={{marginLeft: "30px"}}>
                                {individualService.description}
                            </p>
                        </>
                        }
                        
                        {individualService.typeOfMusicPlayed!=="Ninguno"&&<div>
                            <p className='t-a-c'>Música: <span>{individualService.typeOfMusicPlayed}</span></p>
                        </div>}
                    </div>
                </div>
                <div
                style={{margin: "5vh 0px"}}
                className="d-f j-c-s-a"
                >
                    <div className='t-a-s'>
                        <p style={{marginLeft: "15px"}} className='font-size-20 margin-bottom-5px'>Dirección</p>
                        <div style={{marginLeft: "25px"}}>
                            <p>{individualService.township} </p>
                            {serviceOrEvent!=="service"&&<p>{individualService.placeToSetEvent}</p>}
                            <p>{individualService.exactDirection.principalStreet}​  {individualService.exactDirection.number} </p>
                            <p>e/ {individualService.exactDirection.firstMiddleStreet} y {individualService.exactDirection.secondMiddleStreet}</p>
                        </div>
                    </div>
                    <IconButton className="d-f j-c-c a-i-c" onClick={()=>{setSeeMap(true)}}>
                        <img src={GoogleMapsIcon} alt="google maps"/>
                        <p style={{fontSize: "16px", marginLeft: "5px"}} className='font-color-white'>Ver Mapa</p>
                    </IconButton>
                </div>
                {seeMap
                    &&<GoogleMaps 
                        principalStreet={individualService.exactDirection.principalStreet}
                        secondaryStreet={individualService.exactDirection.firstMiddleStreet}
                        province={individualService.exactDirection.province} 
                    />
                }
                <hr style={{width: "80%", margin: "auto"}}/>
                <div className='d-f j-c-s-a' style={{margin: "30px -43px 50px"}}>
                    <div className="t-a-s">
                        <p className='font-size-21 margin-bottom-5px'>Horario</p>
                        <div style={{marginLeft: "1rem"}}>
                            {serviceOrEvent==="service"?
                            <p>{individualService.time.startDays} - {individualService.time.endDays}</p>:
                            <p className='d-f j-c-s-b f-d-c'>{eventsDaysRendering(individualService.time)}</p>
                            }
                            <p>{individualService.time.startHour} - {individualService.time.exitHour}</p>
                            {(availabilityStatus&&serviceOrEvent==="service")?<p style={{color:"#63F960"}}>Abierto</p>:<p style={{color:"#F96060"}}>Cerrado</p>}
                        </div>
                    </div>
                        <div className='t-a-s'>
                            <p className='font-size-21 margin-bottom-5px' >Entradas</p>
                            <div style={{marginLeft: "1rem"}}>
                                {+individualService.cover!==0&&<p>Cover/ {individualService.cover}CUP</p>}
                                {+individualService.coverForFEU!==0&&<p>FEU/ {individualService.coverForFEU}CUP</p>}
                            </div>
                        </div>
                    </div>

            {serviceOrEvent==="service"&& <div style={{margin: "3vh 0"}}>
                {authState?.subscriptions?.some((e)=>{
                    return (e._id === individualService._id)
                })
                ?<UnsubscribeButton
                setAuthState={setAuthState}
                serviceId={individualService._id}
                />
                :<SubscribeButton
                authState={authState}
                setAuthState={setAuthState}
                service={individualService}
                setLoginError={setLoginError}
                />
                }
            </div>}
                
                {serviceOrEvent==="service"&&
                <div onClick={()=>{handleClickOpenRating()}}>
                <div
                style={{
                    margin: "8vh 0 15px 0"
                    }}>
                    <p className='t-a-c'>Puntuaciones  ({numberOfUsersRating})</p>
                     <hr/>
                     </div>
                    <div className='d-f' style={{justifyContent: "space-around", marginBottom: "3vh"}}>
                        <div style={{textAlign:"left"}}>
                        <p className='margin-bottom-5px'>Serv. al Cliente </p>
                        <p className='margin-bottom-5px'>Precios </p>
                        <div className='margin-bottom-5px'>
                            <p>Serv. Ofrecido </p>
                            <p className='t-a-c'>( Como {individualService.type} )</p>
                        </div>
                    </div>
                    
                    <div style={{alignItems: "flex-start",}} className='d-f f-d-c ratingShow'>
                         <div className="d-f a-c-c t-a-c a-i-c j-c-c">
                            <Rating value={individualService.avgPeopleServiceTreatmentRating} readOnly/> <h4>{individualService.avgPeopleServiceTreatmentRating}</h4>
                        </div>
                        <div className="d-f a-c-c t-a-c a-i-c j-c-c">
                            <Rating value={individualService.avgPricingServiceRating} readOnly/><h4>{individualService.avgPricingServiceRating}</h4>
                        </div >
                        <div className="d-f a-c-c t-a-c a-i-c j-c-c">
                            <Rating value={individualService.avgServiceQualityRating} readOnly/><h4>{individualService.avgServiceQualityRating}</h4>
                        </div>
                    </div>
                    </div>
                </div>}
                
                {(serviceOrEvent==="service" 
                && individualService.secondaryImages.length !== 0)
                &&
                <div style={{marginBottom: "3vh"}}>
                <div className="t-a-s font-color-white">
                    <p style={{ 
                    display: "inline",
                    background: "#0F83C3",
                    padding: "5px 5px 0 5px",
                    borderTopRightRadius: "15px",
                    marginLeft: "auto"}} className="t-a-s">Imagenes Secundarias </p>
                    <hr style={{color:"#0F83C3", height: "3px", background: "rgb(15, 131, 195)"}}/>
                </div>
                <div className='d-f secondaryImagesIndividualPage'>
                    {individualService.secondaryImages.map((e, key) => (
                        <div key={key} onClick={()=>{setOpenImageModal(true); setModalImage(e)}}>
                            <LazyLoadImage
                                src={`http://res.cloudinary.com/dolzgvsos/image/upload/c_scale,h_450,w_350/v1/${serviceOrEvent==="service"?"service":"events"}/${ChangeURL(e)}`}
                                effect="blur"
                                />
                            
                            </div>
                    ))}
                ​</div>
                </div>}

                {(serviceOrEvent==="service" && individualService.events.length !== 0) &&<div style={{marginBottom: "3vh"}}>
                <div className="t-a-s font-color-white">
                    <p style={{ 
                    display: "inline",
                    background: "#0F83C3",
                    padding: "5px 5px 0 5px",
                    borderTopRightRadius: "15px",
                    marginLeft: "auto"}} className="t-a-s">Eventos Próximos</p>
                    <hr style={{color:"#0F83C3", height: "3px", background: "rgb(15, 131, 195)"}}/>
                </div>
                <div className='d-f secondaryImagesIndividualPage'>
                    
                    {individualService.events?.map((e, key) => (
                        <Link key={key} to={`/event/${e._id}`}>
                            <div className='p-r' style={{marginRight: "15px"}} >
                                <img  src={e.principalImage} alt="Aquí debería ir algo..." className="secondaryImages"/>
                                <div className="p-a" style={{ bottom: 0,right: 0,color: "white",background: "rgb(15, 131, 195)",padding: "5px"}}>
                                    <p>{e.time.eventsDays ? eventsDaysFormate(e.time.eventsDays) : weekDay[+e.time.weekDays] } / {e.time.startHour} - {e.time.exitHour}</p>
                                    <p>{e.name} </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                ​</div>
                </div>}
            </div>
            <PagesFooter
            pageFootersName = {individualService.name}
            facebookLink = {individualService.contact.facebook}
            TwitterLink = {individualService.contact.twitter}
            InstagramLink = {individualService.contact.instagram}
            phone = {individualService.contact.phone}
            whatsApp = {individualService.contact.whatsApp}
            email = {individualService.contact.email}
            >
                <p>{(individualService.contact.webSite&&serviceOrEvent==="service")&& 
                <a target='_blank' href={`https://${individualService.contact.webSite}`}>
                    <div className='d-f j-c-c a-i-c'>
                    <InsertLinkIcon style={{color:"white"}} href={individualService.contact.webSite} />
                    <span className='font-color-white t-a-c'>{individualService.contact.webSite}</span></div></a>}
                {(!individualService.contact.webSite && serviceOrEvent==="service")&& "No tiene Página Web"}</p>
                
                {individualService.allowReservation && individualService.contact.whatsApp &&
                    <div onClick={()=>{
                        reservationInput.current.scrollIntoView();
                    }}
                    className="p-2vw margin-top-3vh">
                        <button
                         onClick={()=>window.open("https://wa.me/" + individualService.contact.whatsApp + "?text=Esto es de Perxins")}
                         className='footerButton ReservationButton'>
                        Reservar ya mismo
                        </button>
                    </div>
                }
            </PagesFooter>

            <Dialog 
            onClose={handleCloseRating}
            open={openRating}
            id="dialog">
                <div id="ratingDialog">
                <div>
                    <p>Serv. al Cliente</p>
                    <Rating 
                        onChange={(event, newValue) => {
                            setNewRatingValues({...newRatingValues,peopleServiceTreatmentRating:newValue });
                        }}
                        value={newRatingValues.peopleServiceTreatmentRating} /> 
                </div>
                <div>
                <p>Precios</p>
                <Rating 
                    onChange={(event, newValue) => {
                        setNewRatingValues({...newRatingValues,pricingServiceRating:newValue });
                        
                    }}
                    value={newRatingValues.pricingServiceRating} />
                </div>
                <div>
                <p>Calidad de Servicio</p>
                <Rating 
                onChange={(event, newValue) => {
                    setNewRatingValues({...newRatingValues,serviceQualityRating:newValue });
                }}
                    value={newRatingValues.serviceQualityRating} />
                </div>
                <button 
                style={{
                    borderRadius: "8px",
                    width: "64vw",
                    color: "white",
                    height: "6vh",
                }}
                className="backgroundRed box-shadow margin-top-5vh font-size-25 margin-top-3vh"
                onClick={()=>{handleCloseRating(); sendRating();}}> Puntuar</button>
                </div>
            </Dialog>

            <Dialog onClose={handleCloseOfImageModal} open={openImageModal} id="dialog">
                <img src={modalImage} style={{width: "94vw"}} alt="Img"/>
            </Dialog>
        </div>
    </ReactHelmet>
    )
}


export default IndividualPage;
