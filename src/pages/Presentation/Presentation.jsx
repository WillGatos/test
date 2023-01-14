import React, {useState} from 'react'
import './Presentation.css'

import WelcomePage from './pages/WelcomePage'
import EverythingReady from './pages/EverythingReady'
import SlideButtons from './Components/SlideButtons'

import Hook from './pages/Hook'
function Presentation({deferredPrompt}) {
    const [actualStep, setActualStep] = useState(0)


    const presentationSlides = ()=>{

        switch(actualStep){
          case 0:
            return <WelcomePage />
          case 1:
            return <Hook />
          case 2:
          return <EverythingReady />
        default:
          return
      }
          
      }


    return (
        <div
        className='
        d-f a-i-c
        font-color-white
        f-d-c
        presentationPage
        j-c-f-e
        '>
            {presentationSlides()}
            {actualStep!==2&&
            <div className='b-main d-f bottomButton'>
                {actualStep!==0&&
                <SlideButtons
                setActualSlide={setActualStep}
                arrow="<"
                number={1}
                classToApply={"buttonLeft"}
                />
                }
                <SlideButtons
                setActualSlide={setActualStep}
                arrow=">"
                number={-1}
                classToApply={"buttonRight"}
                />
            </div>}
        </div>
    )
}

export default Presentation