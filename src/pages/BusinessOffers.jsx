import {useEffect} from 'react'
import Gears from "../SVG/Gears.svg"
import Promotion from "../SVG/Promotion.svg"
import WebDev from "../SVG/WebDev.svg"
import PagesFooter from './PagesFooter'
import { useHistory } from "react-router-dom";
import {useContext} from 'react'
import { AuthContext } from '../helpers/AuthContext'
function BusinessOffers() {
    const individualService = {
        contact:{
        pageFootersName : "PERXINS",
        facebookLink : "https://m.facebook.com/Perxins-103949482452169",
        TwitterLink : "https://mobile.twitter.com/Perxinsencuba",
        InstagramLink : "https://www.instagram.com/PerxinsenCuba",
        whatsApp : "+5358419139",
        email : "perxins@gmail.com",
        }
    }

    useEffect(()=>{
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    },[])
    const history = useHistory();
    const {loginError, setSearchServiceDialogOpen} = useContext(AuthContext)

  return (
    <div  style={{ minHeight: "100vh", width: "100%"}}>
        {loginError && <p className="errorMessage">Por favor, inicie sesión</p>}
        <h2 style={{margin: "0px 25px"}} className='font-color-white font-size-32'>Perxins</h2>
        <h3 style={{margin: "0 25px"}} className='font-color-white font-size-25'>Ofertas de Negocios</h3>
        <div className='j-c-s-e d-f a-i-c f-d-c' style={{margin: "10px 25px"}}>
        
            <section style={{margin: "45px 0 15px 0px"}} className='font-color-white m-v-20'>
                <h3 className="p-r z-i-2 m-t-15 font-size-25 l-s-1">Promoción de su servicio o evento</h3>
                <hr/>
                <p className="p-r z-i-2 m-t-15 font-size-20 l-s-1">Coloquese por encima de su 
                <span  className='font-color-green'> competencia </span>
                 en nuestra aplicación y obtenga mayor clientela. 
                 <span className='font-color-green'> Ellos ya lo están haciendo</span>.</p>
                <div className='d-f j-c-c f-d-c a-i-c'>
                    <img src={Promotion} style={{width: 50,height: 30, margin: "10px 0 5px 0"}} alt=""/>
                    <button onClick={()=>{
                            setSearchServiceDialogOpen(true)
                            //history.push("/email")
                    }} className="businessCardButton greenBackground">Me interesa</button>
                </div>
            </section>

            <section style={{margin: "45px 0"}} className='font-color-white m-v-20'>
                <h3 className="p-r z-i-2 m-t-15 font-size-25 l-s-1">Desarrollo y diseño Web/Mobile</h3>
                <hr/>
                <p className="p-r z-i-2 m-t-15 font-size-20 l-s-1">Hoy ya la mayoría tiene un telefono con internet, y con esto, cada día buscamos más. 
                ¿<span className='font-color-green'>Qué encontraran</span> tus posibles clientes <span className='font-color-green'>cuando te busquen</span> en internet ?</p>
                <div className='d-f j-c-c f-d-c a-i-c'>
                    <img className="" style={{width: 50,height: 40, margin: "10px 0 5px 0"}} src={WebDev} alt=""/>
                    <button onClick={()=>{
                            history.push("/devOffers")
                    }} className="businessCardButton greenBackground">Me interesa</button>
                </div>
            </section>
            <section style={{margin: "45px 0"}} className='font-color-white m-v-20'>
                <h3 className="p-r z-i-2 m-t-15 font-size-25 l-s-1">Automatizacion de Servicios</h3>
                <hr/>
                <p className="p-r z-i-2 m-t-15 font-size-20 l-s-1"><span className='font-color-green'> Reduzca sus costos</span> al mínimo y <span className='font-color-green'>mejore su imagen</span> al máximo automatizando todo el proceso servicio al cliente con nuestros sistemas.</p>
                <div className='d-f j-c-c f-d-c a-i-c'>
                    <img className="" style={{width: 50,height: 50,  margin: "10px 0 5px 0"}} src={Gears} alt=""/>
                    <button onClick={()=>{
                            history.push("/email")
                    }} className="businessCardButton greenBackground">Me interesa</button>
                </div>
            </section>
            </div>
        <PagesFooter
            individualService={individualService}
        />
    </div>
  )
}

export default BusinessOffers