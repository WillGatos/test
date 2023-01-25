import React, {useState, useRef} from 'react'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/NotificationsActive';
import axios from 'axios'
//import CardContentModel from '../Cards/CardContentModel';
import Badge from '@mui/material/Badge';
import { AuthContext } from '../../helpers/AuthContext'
import { Link } from "react-router-dom";
import eventsDaysRendering from '../../helpers/eventsDaysRendering';

function Notifications({setIsNotificationPanelOpen, isNotificationPanelOpen}) {
    const [notificationsList, setNotificationsList] = useState([])
    const skip = useRef()
    const { authState, setAuthState } = React.useContext(AuthContext);
    const accessToken = localStorage.getItem("accessToken")
    const hasLoaded = useRef()
    const [chargingData, setChargingData] = useState(true)
    const [hasMore, setHasMore] = useState(true)

    const findNotification = () => {
      setChargingData(true)
      setIsNotificationPanelOpen(true)
        if(!hasLoaded.current){
          console.log("hasLoaded.current",!hasLoaded.current)
        skip.current = 0
        axios.post(`http://localhost:3001/user/findNotifications?limit=10&skip=${skip.current}`,{},
        {headers: {'Authorization': 'Bearer '+ accessToken}})
        .then(e=> {
            setAuthState({...authState, notifications: 0});
            setNotificationsList(e.data.notifications);
            setHasMore(true);
            setChargingData(false)
        })
        .catch(e => {
          setChargingData(false)
          console.log(e)})
        hasLoaded.current = true
        }
        console.log("hasLoaded.current2",!hasLoaded.current)
    }

    const observer = React.useRef()
    const lastElementObserver = React.useCallback((node)=>{

    if(observer.current) {
      //que hace disconnect?
      observer.current.disconnect()
    }
    observer.current = new IntersectionObserver(entries =>{

      if(entries[0].isIntersecting && hasMore){
        setChargingData(true)
        console.log("skip.current", skip.current)
        skip.current = skip.current + 10
        axios.post(`http://localhost:3001/user/findNotifications?limit=10&skip=${skip.current}`,{},
        {headers: {'Authorization': 'Bearer '+ accessToken}})
        .then((e) => {
          console.log(e.data.notifications.length !== 0)
            if(e.data.notifications.length !== 0 ){
              setNotificationsList(prevList => [...prevList, ...e.data.notifications])
            }
            else{
                setHasMore(false)
            }
            setChargingData(false)
        })
        .catch(e => {
          setChargingData(false)
        })
      }
    })
    if(node) observer.current.observe(node)
  },[])
    
  return (
    <>
    <div
        style={{marginRight: "10px"}}
        id="notificationIconContainer"
        className="d-f font-color-white"
        >
              {isNotificationPanelOpen
                
                ? <NotificationsIcon /> 
                : <Badge badgeContent={authState.numberOfNotificationsUnseen} color="primary">
                    <NotificationsNoneIcon onClick={()=>{findNotification()}}/>
                  </Badge>}
              </div>
              {isNotificationPanelOpen &&
              <div
              style={{  padding: "15px 0px",
                        height: "80vh",
                        display: "flex",
                        overflowY: "auto",
                        width: "320px"
                      }}
              className= {
                  isNotificationPanelOpen
                  ? "notificationMenu avatar-menu-active"
                  : "notificationMenu"
              }
              onClick={()=>{
                  setIsNotificationPanelOpen(prevState => !prevState)
              }}>
               {notificationsList.map((e, key) => {
                const { _id, name, type, placeToSetEvent} = e;
                
                const { startDays, endDays="" , eventsDays="", weekDays = "" } = e.time;
                return (
                    <Link to={`/event/${_id}`}>
                    <div 
                    style={{width: "320px",
                     margin: "10px 0px" 
                    }} 
                    ref={lastElementObserver} key={key}>
                        

                        <div style={{margin: "10px 0"}} className="font-color-white t-a-s d-f f-d-r">
                          <div className="d-f j-c-c t-a-c">
                            <p className="d-f t-a-c a-i-c f-d-c" style={{margin: "0 15px"}}>
                              {eventsDaysRendering({startDays, eventsDays, weekDays ,endDays})}
                            </p>
                          </div>
                            <div className="d-f j-c-c f-d-c"
                              style={{
                                letterSpacing: "1px",
                                paddingBottom: "1vh"
                              }}>
                              <p>
                              <span>{type!=="Presentación Teatral"&& type}</span>
                              <span>{name}</span> / <span>{placeToSetEvent}</span></p>
                            </div>
                        </div>
                        <hr style={{ color: "#333", width: "40%", margin: "auto"}}/>
                    </div>
                    </Link>
                  )})}
                  {chargingData&&
                  <div style={{width:"100%"}}>
                  <p style={{
                    marginLeft: "auto", 
                    marginRight: "auto",
                    width: "10px", 
                    height: "10px", 
                    borderWidth: "5px"
                    }} 
                    className="loading-spinner font-color-white"></p>
                    </div>}
                  {!hasMore && <p style={{marginLeft: "auto", marginRight: "auto", width: "90%"}} className="d-f j-c-c font-color-white">No hay más notificaciones por ahora</p>}
              </div>
            }
    </>
  )
}

export default Notifications