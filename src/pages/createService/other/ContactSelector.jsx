import React from 'react'
import Checkbox from '@mui/material/Checkbox';
function ContactSelector({
    directContact,
    setDirectContact,
    contactButtons,
    setContactButtons,
    serviceOrEvent
}) {
  return (
    <div className='d-f f-w-w'>
            {directContact.map((e, key)=>
                {return(
                <div className="d-f j-c-c a-i-c">
                <Checkbox
                    checked={e.state}
                    onChange={(event) => {
                        setDirectContact(()=> {
                            return directContact.map(es=>{
                                if(es.button===e.button){
                                    es.state = event.target.checked
                                }
                                return es
                            })

                        });
                    }}
                    inputProps={{ 'aria-label': 'controlled' }}
                    />
                {e.icon}
                </div>)
                    
                })}

            {contactButtons.map((e)=>
            {   
                if((serviceOrEvent==="event" && e.button === "whatsApp") || serviceOrEvent === "service"){
                return (<div className="d-f j-c-c a-i-c">
                <Checkbox
                    checked={e.state}
                    onChange={(event) => {
                        setContactButtons(()=> {
                            return contactButtons.map(es=>{
                                if(es.button===e.button){
                                    es.state = event.target.checked
                                }
                                return es
                            })

                        });
                    }}
                    inputProps={{ 'aria-label': 'controlled' }}
                    />
                <img src={e.icon} alt={e.button}/>
                </div>)
                }
            }
            )}
            </div>
  )
}

export default ContactSelector