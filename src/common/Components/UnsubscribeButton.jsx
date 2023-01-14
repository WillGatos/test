import React from 'react'
import useCheckToken from '../../Hooks/useCheckToken'
function UnsubscribeButton({setAuthState, serviceId, fontSize}) {
  const setApiCall = useCheckToken(()=>{})
    const unSubscribeToService = () => {
        setApiCall("get", `https://api.perxins.com/user/unsubscription/${serviceId}`)
        .then(()=> {setAuthState(prevState=>{
            const subscriptions = prevState.subscriptions.filter(e=> e._id!==serviceId)
            return ({...prevState, subscriptions})
        })})
        .catch(e=> console.log(e))
    }
  return (
    <button 
        onClick={()=>{unSubscribeToService()}}
        className="border-radius-50 font-size-20 font-color-white"
        style={{padding: "7px 30px",
                background: "rgb(110 110 110)",
                border: "0px",
                fontSize}}>
                Desuscribirse
    </button>
  )
}

export default UnsubscribeButton