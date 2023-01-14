import React from 'react'
import InsertLinkIcon from '@mui/icons-material/InsertLink';

function SectionWeb({
    individualService,
    serviceOrEvent
}) {
    const {contact} = individualService;
  return (
    <div><p>{(contact.webSite && serviceOrEvent==="service")&& 
    <a target='_blank' href={`https://${contact.webSite}`}>
        <div className='d-f j-c-c a-i-c'>
            <InsertLinkIcon style={{color:"white"}} href={contact.webSite} />
            <span className='font-color-white t-a-c'>{contact.webSite}</span>
        </div>
    </a>}
    {(!individualService.contact.webSite && serviceOrEvent==="service")&& "No tiene Página Web"}</p></div>
  )
}

export default SectionWeb