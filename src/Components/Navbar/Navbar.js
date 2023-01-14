import React, { useRef, useContext } from 'react';
import Drawer from '@mui/material/Drawer';
import {Link} from "react-router-dom"
import Menu from '../../SVG/Menu';
import installPrompt from '../../helpers/installPrompt';

export default function TemporaryDrawer({displayOfInstallButton, deferredPrompt}) {
  const linksContainer = useRef()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
    style={{
      width: "300px",
      background: "#181A1D",
      minHeight: "100%"
    }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    ><h3 
    className="font-color-white p-a font-size-25" 
    style={{top:"36px",left: "-22px", transform: "rotateZ(270deg)", letterSpacing: "2px"}}>
      menú
    </h3 >
    <div className="p-a b-white barMenuAnimation" ></div>
      <div className="d-f a-i-c f-d-c">
        <div 
          ref={linksContainer}
          id="Link"
          className="d-f a-i-c f-d-c" 
          initial="close"
          animate="open"
        >
            <div ><Link to={`/`} >Inicio</Link></div>
            <div ><Link to="/service" >Locales</Link></div>
            <div ><Link to="/event" >Eventos</Link></div>
            <div ><Link to="/businessOffers" >Negocios</Link></div>
            <div
            onClick={()=>installPrompt(displayOfInstallButton, deferredPrompt)}
            >
              </div>
        </div>
        <h2 className='font-size-40 font-color-white'>Perxins</h2>
    </div>
  </div>
  );

  return (
    <div >
      
        <React.Fragment >
        <div className="left-navbar">
          <h1 onClick={toggleDrawer('left', true)} id="menu"> <Menu /> </h1>
        </div>
        <Drawer 
        anchor={'left'} 
        open={state['left']} 
        onClose={toggleDrawer('left', false)} 
        id=""
        >
            {list('left')}
        </Drawer>
        </React.Fragment>
      
    </div>
  );
}
