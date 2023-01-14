import { Dialog } from '@mui/material/';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
//import GoogleMaps from '../Components/GoogleMaps';
import { AuthContext } from '../helpers/AuthContext';
import useCheckToken from '../Hooks/useCheckToken';
import "./IndividualPage.css";
import PagesFooter from './PagesFooter';
import SecondaryImagesSection from './IndividualPages/Sections/SecondaryImagesSection';
import SectionWeb from './IndividualPages/Sections/SectionWeb';
import ReactHelmet from '../common/Components/SEO/ReactHelmet';
import SubscribeButton from '../common/Components/SubscribeButton';
import UnsubscribeButton from '../common/Components/UnsubscribeButton';
//import { eventsDaysFormate } from '../helpers/eventsDaysRendering';
import { eventType, localType } from '../helpers/iconsRefs';
//import weekDay from '../helpers/weekDay';

import RatingSection from './IndividualPages/Sections/RatingSection';
import Section1 from './IndividualPages/Sections/Section1';
import Section2 from './IndividualPages/Sections/Section2';
import Section3 from './IndividualPages/Sections/Section3';
import ReservationSection from './IndividualPages/Sections/ReservationSection';
import DialogSection from './IndividualPages/Sections/DialogSection';
import EventsSection from './IndividualPages/Sections/EventsSection';

function IndividualPage({serviceOrEvent}) {
    const [numberOfUsersRating, setNumberOfUsersRating] = useState(0)

    const [individualService, setIndividualService] = useState({
        name: "",
        type: "",
        description: "",
        cover: {
            ForMen:0,
            ForWomen:0,
            WorkingWithUs:0,
            Regular:0,
            ForFEU:0,
        },
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
        setOpenLoadingBackdrop(true)
          setApiCall("get",`https://api.perxins.com/${serviceOrEvent}s/${id}`)
          .then(response=>{
            if(serviceOrEvent === "service"){
                const data = response.data.service;
                setNumberOfUsersRating(response.data.numberOfUsersThatHasRate)
                setIndividualService(data);
                setOpenLoadingBackdrop(false)
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
                <Section1
                    individualService={individualService}
                    searchIcon={searchIcon}
                    setModalImage={setModalImage}
                    setOpenImageModal={setOpenImageModal}
                />

                <Section2
                    individualService={individualService}
                    serviceOrEvent={serviceOrEvent}
                />
                <hr style={{width: "80%", margin: "auto"}}/>
                
                <Section3
                    availabilityStatus={availabilityStatus}
                    individualService={individualService}
                    serviceOrEvent={serviceOrEvent}
                />

            {serviceOrEvent==="service"&& 
            <div style={{margin: "3vh 0"}}>
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

                            
            <RatingSection
                    handleClickOpenRating={handleClickOpenRating}
                    individualService={individualService}
                    numberOfUsersRating={numberOfUsersRating}
                    serviceOrEvent={serviceOrEvent}
                />

            <EventsSection
                individualService={individualService}
                serviceOrEvent={serviceOrEvent}
            />

            <SecondaryImagesSection
                ChangeURL={ChangeURL}
                individualService={individualService}
                serviceOrEvent={serviceOrEvent}
                setModalImage={setModalImage}
                setOpenImageModal={setOpenImageModal}
            />

        
            </div>
            <PagesFooter
                individualService={individualService}
            >
                <SectionWeb
                    individualService={individualService}
                    serviceOrEvent={serviceOrEvent}
                />
                

                <ReservationSection
                    individualService={individualService}
                    reservationInput={reservationInput}
                />
                
            </PagesFooter>

            <Dialog 
            onClose={handleCloseRating}
            open={openRating}
            id="dialog">
                <DialogSection
                    newRatingValues = {newRatingValues}
                    setNewRatingValues = {setNewRatingValues}
                    handleCloseRating = {handleCloseRating}
                    sendRating = {sendRating}
                />
            </Dialog>

            <Dialog onClose={handleCloseOfImageModal} open={openImageModal} id="dialog">
                <img src={modalImage} style={{width: "94vw"}} alt="Img"/>
            </Dialog>
        </div>
    </ReactHelmet>
    )
}


export default IndividualPage;
