import React from 'react'
import PagesFooter from '../PagesFooter'

function ProServicesOffers() {
  return (
    <div >
        <div className='margin-20px'>
            <h1 className='font-size-32'>Perxins</h1>
            <h4 className='font-size-20 margin-bottom-20px'>Promoción versión <br/>Pro</h4>
            <p>Elija entre nuestros planes para la obtención de mayor clientela.</p>
            <p className='font-color-green'>Pago Fijo:</p>
                <p className='margin-left-20px'>
                  Pague de manera fija 700 CUP al mes para mantenerse visible siempre a todo público interesado en su modelo de negocio.
            </p>
            <br/>
            
            <div style={{marginBottom: "100px"}}> 
            <div className='margin-bottom-20px'>
                <p style={{margin: '5px 0'}} className='font-color-green'>Pague por los resultados...</p> 
                <p className='margin-left-20px'>1-CUP por usuario que visite su página.</p>
                <p className='margin-left-20px'>20-CUP por cada usuario que le contacte a traves de  nuestra plataforma</p>

            </div>
                <p>Si le interesa, no dude en contactarnos.</p>
            </div>
        </div>
        <PagesFooter
        pageFootersName = "PERXINS"
        facebookLink = "https://m.facebook.com/Perxins-103949482452169"
        TwitterLink = "https://mobile.twitter.com/perxinsencuba/"
        InstagramLink = "https://www.instagram.com/perxinsencuba/"
        phone = "+5358419139"
        email = "perxins@gmail.com"
        />
    </div>
  )
}

export default ProServicesOffers