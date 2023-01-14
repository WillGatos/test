import React from 'react'
import "./textField.css"
function TextField({placeHolder, children}) {
  return (
    <>
    {console.log(children)}
    <div class="container">
    <div class="input-set">
        <div class="input-part input">
        <div class="material-input">
            <input placeholder={placeHolder}/>
            <label>{placeHolder}</label>
        </div>
        </div>
        {children&&<div class="input-part icon">{children}</div>}
    </div>
    </div>
    </>
  )
}

export default TextField