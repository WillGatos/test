import React from 'react'

function Mail({color="#AD265E"}) {
  return (
    <>
    <svg width="25" height="22" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
        d="M18.9 0H2.1C0.945 0 0.0105 1.06875 0.0105 2.375L0 16.625C0 17.9312 0.945 19 2.1 19H18.9C20.055 19 21 17.9312 21 16.625V2.375C21 1.06875 20.055 0 18.9 0ZM18.9 4.75L10.5 10.6875L2.1 4.75V2.375L10.5 8.3125L18.9 2.375V4.75Z" 
        fill={color}
        />
    </svg>
    </>
  )
}

export default Mail