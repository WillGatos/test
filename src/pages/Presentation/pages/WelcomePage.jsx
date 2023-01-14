import React,{useEffect, useRef} from 'react'

function WelcomePage() {

    const container = useRef()
    useEffect(()=>{
        container.current.classList.add('slide-in')
    },[])

    return (
        <div ref={container} style={{margin: "0px 25px 50px"}} className='slider'>
            <p className='font-size-40'>Perxins</p>
            <p className='font-size-25 margin-top-3vh'>
                Imagina querer <span className="font-color-blue">salir</span>
                <br/>
                 pero no saber a <span className="font-color-blue">donde</span>...</p>
            <p className='font-size-25 margin-top-3vh'>¡ Esta es la página que lo resuelve !</p>
        </div>
    )
}

export default WelcomePage
