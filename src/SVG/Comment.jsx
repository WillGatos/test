import React from 'react'

function Comment({color="#40A3DA"}) {
  return (
    <><svg width="30" height="30" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 2.20667H22.5V15.4467H3.9625L2.5 16.7376V2.20667ZM2.5 0C1.125 0 0.0125 0.993 0.0125 2.20667L0 22.0667L5 17.6533H22.5C23.875 17.6533 25 16.6603 25 15.4467V2.20667C25 0.993 23.875 0 22.5 0H2.5ZM5 12.6883H20V14.895H5V12.6883ZM4.99417 7.92405H19.9875V9.93H4.9923V6.57388L4.99417 7.92405ZM5 4.06238H20V6.26905H5V4.41333V4.06238Z" fill={color}/>
    </svg></>
  )
}

export default Comment