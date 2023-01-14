import React, {useState, useContext} from 'react'
import {useParams, useLocation} from 'react-router-dom'
import "./Messages.css"
import Send from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';
import { AuthContext } from '../../helpers/AuthContext';
import {Image} from "cloudinary-react";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

function Messages({serviceOrEvent}) {
    const [message, setMessage] = useState()
    const [loginError, setLoginError] = useState(false)
    const [messageList, setMessageList] = useState([])
    const [activeMenu, setActiveMenu] = useState("")
    const [switchState, setSwitchState] = React.useState(true)
    const [toEditComment, setToEditComment] = useState("")

    const { authState } = useContext(AuthContext);
    const {id} = useParams();
    const location = useLocation();
    const accessToken = localStorage.getItem("accessToken")
    

    React.useEffect(()=>{
        console.log(location)
        axios.get(`https://api.perxins.com/${serviceOrEvent}s/message/${id}`)
        .then((e)=>{
            setMessageList(e.data.messages);
        })
        .catch(e=> setLoginError(true))
    },[])

    const ChangeURL = (string)=>{
        const urlArray = string.split("/");
        return urlArray[urlArray.length - 1];
    }
    const createMessage=()=>{
        axios.post(
        `https://api.perxins.com/${serviceOrEvent}Messages/${id}`, 
        { messages: message },
        {headers: {'Authorization': 'Bearer '+ accessToken}}
        )
        .then(() => setMessageList(prevState=> {
            return [...prevState,
                {
            userId : authState._id,
            username: authState.username,
            picture: authState.userPicture,
            messages: message}] }))
        .catch(e => setLoginError(true))
    }

    const switchUpdateCreate = ()=>{
        setSwitchState(prevState => !prevState)
    }

    const updateMessage = async ()=>{
        await axios.patch(
        `https://api.perxins.com/${serviceOrEvent}Messages/${toEditComment}`,
        { messages: message },
        {headers: {'Authorization': 'Bearer '+ accessToken}})
        .then(() => setMessageList(prevState=> {

            const newState = prevState.map(e => {
                if(e._id !== toEditComment){
                    return e;
                } else {
                    e.messages = message;
                    return e;
                }})
            return newState
        }))
        .then(()=>switchUpdateCreate())
        .catch(e => setLoginError(true))
    }

    const deleteMessage= async (messageId)=>{
        await axios.delete(
        `https://api.perxins.com/${serviceOrEvent}Messages/${id}/${messageId}`,
        {headers: {'Authorization': 'Bearer '+ accessToken}})
        .then(() => setMessageList(prevState=> {

            const newState = prevState.filter(e => {
                return e._id !== messageId})
            return newState
        }))
        .catch(e => setLoginError(true))
    }

    return (
        <div id="authContainer" onClick={()=> {if(activeMenu !== "")setActiveMenu("")}}>
            {loginError&& <p className="errorMessage">Debe Iniciar Sesión</p>}
            <h3 className="font-color-white">Comentarios</h3>
            {messageList.map(e=>
                <div key={e._id} 
                style={{width:"80vw", alignItems:"flex-start", position: "relative"}} 
                className="font-color-white d-f j-c-c a-i-c messagesCard box-shadow"> 
                {activeMenu===e._id&&<div className= {
                    activeMenu===e._id 
                    ?"avatar-menu deployedMenu"
                    :"avatar-menu"}>
                        <p
                        onClick={()=>{
                            setToEditComment(e._id)
                            switchUpdateCreate()
                        }}
                        className="t-a-c d-f j-c-c a-i-c p-10"><EditIcon/>Editar</p>
                        <p
                        onClick={()=>deleteMessage(e._id)}
                        className="t-a-c d-f j-c-c a-i-c p-10"><DeleteIcon/> Elimiar</p>
                </div>}
                    <Avatar style={{
                    alignSelf: "center",
                    margin: "auto",
                    height: "55px",
                    width: "55px",
                    }}>{
                        e.picture!==""?
                    <Image
                    cloudName="dolzgvsos"
                    publicId={`UsersPics/${ChangeURL(e.picture)}`}
                    width="80"
                    crop="scale"
                    />:
                    e.username[0]}
                    </Avatar>
                    {/* setCommentMenu(!commentMenu) */}
                    {authState._id === e.userId && <p 
                    onClick={()=>{
                        setActiveMenu(e._id)
                        }}
                    style={{
                        position: "absolute",
                        color: "white",
                        fontSize: "30px",
                        top: "-8px",
                        right: "15px",}}>
                            ...</p>}
                    <div style={{
                    alignItems: "flex-start", 
                    width: "80%",
                    }} className="d-f j-c-c a-i-c f-d-c">
                    <p style={{margin: "10px"}}>{e.username}</p>
                    <p style={{marginBottom: "15px", marginLeft: "10px"}}>{e.messages}</p>
                    </div>
                </div>)}
                <div>
                {switchState===false&&<p 
                style={{
                    background: "#141414",
                    color: "#fff",
                    padding: "5px",
                    width: "57px",
                    borderTopRightRadius: "50px",
                }}>Editar</p>}
                <FormControl style={{ width: '85vw', marginBottom: "3vw" }} variant="standard">
          <InputLabel htmlFor="filled-adornment-password" id="font-color-white">Comentario</InputLabel>
          <FilledInput
            required
            autoComplete="off"
            type="text"
            name="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={()=>{
                    if(switchState){
                        createMessage();
                        setMessage("");
                    } else {
                        updateMessage()
                    }
                    }}
                  edge="end"
                >
                  <Send className="font-color-white" />
                </IconButton>
              </InputAdornment>
            }    
            color="primary"
            variant="standard"
            style={{width:"85vw"}}
            className="font-color-white inputs-shape box-shadow"
            value={message}
            onChange={(e)=>{
                setMessage(e.target.value);
            }}
          />
          </FormControl>
          </div>
        </div>
    )
}

export default Messages
