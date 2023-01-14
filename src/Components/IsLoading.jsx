import React from 'react'

function IsLoading({isLoading, children}, ) {
    console.log("HOOAAA", {children})
  return <>{isLoading ? <div style={{margin: "auto", height: "40%"}} className='d-f j-c-c a-c-c a-i-c'>
            <p className="t-a-c loading-spinner"></p>
        </div>
        :<div>{children}</div>}</>
}

export default IsLoading