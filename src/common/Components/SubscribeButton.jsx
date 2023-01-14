import React from 'react'
import useCheckToken from '../../Hooks/useCheckToken'
import notifyMe from '../../helpers/notifyMe'

function SubscribeButton({authState, setAuthState, service, fontSize, setLoginError}) {
    const setApiCall = useCheckToken(()=>{})
    const subscribeToService = () => {
        setApiCall("get", `https://api.perxins.com/user/subscription/${service._id}`)
        .then(()=> {setAuthState({...authState, subscriptions: [...authState.subscriptions, service]})})
        .catch(e=> setLoginError(true))
    }
  return (
    <button 
        onClick={()=>{subscribeToService(); notifyMe()}}
        className="border-radius-50 font-size-20 font-color-white"
        style={{padding: "7px 30px",
            background: "#0F83C3",
            border: "0px",
            fontSize}}>
            Suscribirse
    </button>
  )
}

export default SubscribeButton