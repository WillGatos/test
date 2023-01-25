import Send from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import React,{ useEffect, useContext, useState } from 'react'
import useCheckToken from '../../../Hooks/useCheckToken';
import { AuthContext } from "../../../helpers/AuthContext";
import "./poll.css"
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

function Poll() {
    let value = 0;
    const { authState } = useContext(AuthContext)
    const [propose, setPropose] = useState([])
    const [rechargePage, setRechargePage] = useState(0)
    const [createNewSuggestion, setCreateNewSuggestion] = useState(false)
    const [newSuggestion, setNewSuggestion] = useState({suggestion:"", proposeDescription:""})
    const setApiCall = useCheckToken(()=>{})
    const onVote= (suggestionId)=>{
        setApiCall(
            "post",
            `http://localhost:3001/support/vote/${suggestionId}`,
            null
            )
        .then(() => setRechargePage(prevState=> prevState +1))
        .catch(e => console.log(e.message))
    }

    const createSuggestion=()=>{
        setApiCall("post","http://localhost:3001/support", newSuggestion)
        .then(() => setRechargePage(prevState=> prevState+1))
        .catch(e => console.log(e.message))
    }
    const countingVotes = (e)=>{
        value += e;
    }

    useEffect(()=>{
        setApiCall("get","http://localhost:3001/support")
        .then(e => {
            console.log(e.data)
            setPropose(e.data)
        })
        .catch()
    },[rechargePage, setApiCall])
    return (
    <div>
        <h1 className="font-size-64">PERXINS</h1>
        <h3 className='font-size-25'>Encuesta</h3>
            <h3 className="t-a-c font-size-25 font-color-white margin-top-5vh">Cambios que quieres</h3>
            {propose.map(e => countingVotes(e.voters.length))}
            {propose.map((e,key) => (
                <div key={e._id} className="suggestionContainer p-r" style={{
                    border : e.voters.includes(authState._id)? "4px solid rgb(45, 45, 45)": "4px solid #979797",
                    background: "aliceblue" }}>
                    <h3>{e.suggestion}</h3>
                   {e.proposeDescription&&<h3>{e.proposeDescription}</h3>}
                    {/* <ProgressBar 
                    completed={Math.floor(e.voters.length * 100 /value)} 
                    bgColor={"#181818"}/> Multiplicacion cruzada para lograr que se generen los %  */}
                    <div onClick={()=>{onVote(e._id)}} style={{top: 0, right: 0,}} className="supportLikes p-a">
                         {e.voters.includes(authState._id)?<Favorite />: <FavoriteBorder/>}{e.voters.length}
                    </div>
                    
                </div>
            ))}
            <div onClick={()=>{setCreateNewSuggestion(true)}} className="toggledForm"> 
            {createNewSuggestion
            ?<div>
                <input
                id="pollInput"
                type="text"
                name="suggestion"
                style={{fontSize: "25px"}}
                className='toggledInput' 
                value={newSuggestion.suggestion}
                label="Sugerencia"
                onChange={(e)=>{
                    setNewSuggestion({"suggestion":e.target.value});
                }}
                required={true}
                />
                <Button id='toggledButton' onClick={createSuggestion}><Send /></Button> 
                <textarea
                id="pollInput"
                placeholder='Descripción(Opcional)'
                style={{
                    width:"100%",
                    marginTop: "1vh",
                    height: "10vh",
                    fontSize: "20px"}}
                className='toggledInput font-size-20'
                rows={4}
                onChange={(e)=>setNewSuggestion({...newSuggestion, proposeDescription: e.target.value})}
                ></textarea>
            </div>
            :<h3>Crear nueva sugerencia</h3>}
            </div> 
    </div>
    )
}

export default Poll
