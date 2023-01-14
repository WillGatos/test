import {useContext} from 'react'
import { Dialog } from '@mui/material/';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../helpers/AuthContext';
function SearchServiceDialog() {
    const {
        setLoginError,
        searchServiceDialogOpen,
        setSearchServiceDialogOpen
    } = useContext(AuthContext)
    const history = useHistory();
    const handleClose = () => {
    setSearchServiceDialogOpen(false);
  };
  const accessToken = localStorage.getItem("accessToken");
  return (
    <Dialog onClose={handleClose} open={searchServiceDialogOpen} id="dialog">
                <div style={{
                background: "#0a0a0a",
                borderRadius: "5px",
                width: "82vw",
                padding: "50px 0",
                display: "flex",
                flexDirection: "column",
                height: "20vh",
                alignItems: "center",
                maxWidth: "350px"
                }} >
                <p 
                className="font-color-white font-size-20"
                style={{marginBottom:"15px"}}
                >Insertar en la aplicación</p>
                <div className='d-f' style={{height:"100%"}}>
                    <button style={{width: "130px"}} onClick={()=>{
                accessToken?(
                    history.push("/createService")
                    ):(
                    setLoginError(true)
                    )
                    setSearchServiceDialogOpen(false)}
                } className="businessCardButton greenBackground">Local</button>
                    <button style={{width: "130px"}} onClick={()=>{
                    accessToken?(history.push("/createEvent")):(setLoginError(true))
                    setSearchServiceDialogOpen(false)
                        }} className="businessCardButton greenBackground">Eventos</button>
                </div>
                <button style={{heigth: "60px"}} onClick={()=>{history.push("/proServicesOffers")}} className="businessCardButton proVersionButton" >Versión Pro</button>
                </div>
            </Dialog>
  )
}

export default SearchServiceDialog