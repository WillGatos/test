import React,{useLayoutEffect} from 'react'

function TopProgressBar({ progressBarState, children }) {
  useLayoutEffect(()=>{
    return()=>{ clearTimeout() }
  },[])
  return (
    <div>
      <div style={{width:`${progressBarState}%`, height: "5px",}} className="progressBar"></div>
      {children}
    </div>
  )
}

export default TopProgressBar