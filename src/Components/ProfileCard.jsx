import React from 'react'
import FavoriteWhite from "../SVG/FavoriteWhite";
import Eye from "../SVG/Eye";
import ShareIcon from '@mui/icons-material/Share';
import Comment from "../SVG/Comment";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NotificationsIcon from '../SVG/NotificationsIcon';
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext"
function ProfileCard({
  element, 
  iconsArray, 
  serviceOrEvent,
  children, 
  activeMenu,
  setActiveMenu
}) {
    const { setAuthState } = useContext(AuthContext);
    const history = useHistory()
    const accessToken = localStorage.getItem("accessToken")

    const deleteSelection = (selection,id) => {
        axios
        .delete(`http://localhost:3001/${selection}s/${id}`, {
          headers:  {'Authorization': 'Bearer '+ accessToken},
        })
        .then(() => setAuthState(prevState=> {
          if(selection === "service"){
            return {...prevState, servicesOwned: prevState.servicesOwned.filter(e => {
              console.log(e._id !== id)
              return e._id !== id
            })}
          }
          if(selection === "event"){
            return {...prevState, eventsOwned: prevState.eventsOwned.filter(e => {
              console.log(e._id !== id)
              return e._id !== id})}
          }
      }))
        .catch()
      }
    const UpdateSelection = (selection,id) => {
        history.push(`/update${selection}/${id}`)
    }

  return (
    
    <div 
    className='d-f j-c-c'
    style={{
        padding: "2vw",
        background: "#1b1818",
        borderRadius: "10px",
        border: `1px solid ${element.isPaying? "#faaf00": "white"}`,
        marginBottom: `${serviceOrEvent==="service"?"50px": "35px"}`,
        maxWidth: "450px"
        }}>
    <div
    id="cardContainer"  
    className="p-r d-f j-c-s-b f-d-c font-color-white"
    style={{
        maxHeight: "230px", height:"50vh", padding: "21px", width: "80vw", border: `1px solid ${element.isPaying? "#faaf00": "white"}`,
        background: "linear-gradient(to bottom right, #505050, #000) bottom right, linear-gradient(to bottom left, #505050, #000) bottom left, linear-gradient(to top left, #505050, #000) top left, linear-gradient(to top right, #505050, #000) top right"
        }}>
    <h3 className='p-r' style={{width: "40%"}}>{element.type} {element.name}</h3>
    <Link
     to={`/${serviceOrEvent}/${element._id}`}
     className="font-color-white"
     style={{textDecoration: "underline"}}
     >Ver Publicación</Link>
    <p>{iconsArray.map((localClassification,key) =>
              {if(localClassification.type===element.type) return <img 
                key={key}
                className="p-a"
                style={{
                top: "10%",
                right: "50%",
                transform: "translate(50%, -50%)",
                }}
              src={localClassification.icon}
              alt=""/>
            return null
            }
              )}</p>
    <div style={{alignItems: "flex-start",}} className='d-f ratingShow'>
        {children}
    </div>
    <div className="d-f j-c-s-a a-i-c t-a-c" id="profileCardIcons">
                <p><FavoriteWhite/>{element.numberOfLikes}</p>
                <p><Eye/>{element.numberOfViews}</p>
                <p><ShareIcon/>{element.numberOfShares}</p>
                {serviceOrEvent==="service"&&<p style={{width: "24px",height: "40px"}}><NotificationsIcon/>{element.numberOfSubscribers}</p>}
                <p><Link to={`/${serviceOrEvent}/message/${element._id}`} className="font-color-white"><Comment color="#F55252"/>{element.messages.length}</Link></p>
              </div>
              <p onClick={()=>setActiveMenu(element._id)}
              className="p-a font-color-white"
                    style={{fontSize: "30px",top: "-8px",right: "15px"}}>...</p>
              {activeMenu===element._id && <div className= {
                    activeMenu===element._id 
                    ?"avatar-menu deployedMenu"
                    :"avatar-menu"}>
                        <p
                        onClick={()=>{
                          UpdateSelection(serviceOrEvent,element._id)
                        }}
                        className="t-a-c d-f j-c-c a-i-c p-10"><EditIcon/>Editar</p>
                        <p
                        onClick={()=>{deleteSelection(serviceOrEvent,element._id)}}
                        className="t-a-c d-f j-c-c a-i-c p-10"><DeleteIcon/> Elimiar</p>
                </div>}
    </div>
    </div>
    
  )
}

export default ProfileCard
//