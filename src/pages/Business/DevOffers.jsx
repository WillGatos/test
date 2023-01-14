import React from 'react'
import PagesFooter from '../PagesFooter'
function DevOffers() {
  return (
    <div >
        <div className='margin-20px'>
            <h1 className='font-size-32'>Perxins</h1>
            <h4 className='font-size-20 margin-bottom-20px'>Desarrollo y diseño Web</h4>
            <div className='margin-bottom-20px'>
                <p style={{marginBottom:"10px"}}>Tenga nuestras ofertas a la mano...</p>
                <p>Sitios Web <span className='font-color-green'>Promocional</span>:</p>
                <p className='margin-left-20px'>1000 CUP Diseño</p>
                <p className='margin-left-20px'>2000 CUP Desarrollo</p>
                <p style={{margin: '5px',}}>Costes Fijos por <span className='font-color-green'>año</span>:</p>
                <p className='margin-left-20px'>1200 CUP Costes de Mant.</p>
                <p className='margin-left-20px'>1500 CUP Sitio de Hosting</p>
                <p className='margin-left-20px'>Varía            Dominio</p>
            </div>
            <div style={{marginBottom: "60px"}
            }> 
                <p className='font-color-green'>Sistemas de Gestión:</p>
                <p>Dado lo variada que puede ser este tipo de ofertas,
                   los costes para realizar estos impulsadores de su negocio pueden variar. </p>
                   <br/>
                   <p>Si le interesa, contactenos.</p>
            </div>
        </div>
        <PagesFooter
        pageFootersName = "PERXINS"
        facebookLink = "https://m.facebook.com/Perxins-103949482452169"
        TwitterLink = "https://mobile.twitter.com/perxinsencuba"
        InstagramLink = "https://www.instagram.com/perxinsencuba/"
        phone = "+5358419139"
        email = "perxins@gmail.com"
        />
    </div>
  )
}

export default DevOffers