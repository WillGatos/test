import React from 'react'

function SlideButtons({arrow, setActualSlide, number, classToApply}) {
  return (
    <p 
    style={{width: "25px",height: "25px"}}
    className={`font-size-20 b-gray t-a-c circular-radius ${classToApply}`}
       onClick={()=>{
        setActualSlide(prevNumber=>prevNumber-number)
      }}> {`${arrow}`}</p>
  )
}

export default SlideButtons