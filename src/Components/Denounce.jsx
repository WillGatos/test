import React from 'react'
import useCheckToken from '../Hooks/useCheckToken'

function Denounce({toSendBody, setSuccess, route}) {
    const setApiCall = useCheckToken(()=>{})

    const sendDenounce = ()=>{
        setApiCall("post", `https://api.perxins.com/services/${route}`,toSendBody )
        .then(()=>{
            setSuccess(true)
        })
        .catch(()=>{
            setSuccess(false)
        })
    }

    return (
        <>
            <div 
            className="p-2vw font-size-20 margin-top-3vh font-color-white "
            onClick={()=>{sendDenounce()}} >
                <button className="footerButton denounceButton">Denunciar</button>
            </div>
        </>
    )
}

export default Denounce
