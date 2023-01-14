import React,{useEffect, useRef} from 'react'
import NotificationsIcon from "../../../SVG/NotificationsIcon"
import GoogleMaps from "../../../SVG/GoogleMaps.png"
import Bolt from "../../../SVG/Bolt"

function Hook() {
    const container = useRef()
    useEffect(()=>{
        container.current.classList.add('slide-in')
    },[])
/*     useEffect(()=>{
        getSubscription()
      },[]) */
    return (
        <div
        ref={container}
        style={{  margin: "5vh 8vw 0",height: "100%"}}
        className="margin-bottom-5 slider"
        >
            <p className='font-size-25 horizontalCenter margin-bottom-5'>
            Hecha para quien quiera <span className="font-color-green">disfrutar de la vida al máximo</span> y no perderse una oportunidad de hacerlo. Perxins te ofrece:</p>
            <div className="d-f j-c-c a-i-c f-d-c">
                <div className='d-f margin-bottom-8'>
                    <NotificationsIcon/>
                    <p className='font-size-20 margin-left-3 font-size-20'>Notificaciones de los locales a los que te <span className="b-blue" style={{
                        borderRadius:"20px",
                        padding: "1px 10px"}}>suscríbas</span></p>
                </div>
                <div className='font-size-20 d-f margin-bottom-8'>
                    <img src={GoogleMaps} style={{height: "30px",width: "20px"}} alt=""/>
                    <p className='margin-left-3'>Acceso a&nbsp;
                    <span className='font-color-blue'>G</span>
                    <span className='font-color-red'>o</span>
                    <span className='font-color-yellow'>o</span>
                    <span className='font-color-blue'>g</span>
                    <span className='font-color-green'>l</span>
                    <span className='font-color-red'>e</span>
                    
                    <span className='font-color-blue'>M</span>
                    <span className='font-color-red'>a</span>
                    <span className='font-color-green'>p</span>
                    <span className='font-color-blue'>s</span>
                    &nbsp;
                     desde la App</p>
                </div>
                <div className='font-size-20 d-f margin-bottom-8'>
                <Bolt/>
                <p className='margin-left-3'>
                Garantizamos la mejor velocidad después de la&nbsp;
                <span 
                className="border-button-yellow"
                style={{textDecoration: "underline"}}
                >primera vista</span>&nbsp;
                a la página
                </p>
                </div>
            </div>
            
        </div>
    )
}

export default Hook
