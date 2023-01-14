import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import axios from "axios"
import { useState } from 'react';

export default function ServicesAccordion({
    routes,
    services,
    searchBarValue,
}) {
  const {
    perxinsGiftRoute,
    isPayingRoute,
    updateRoute,
    deleteRoute
  } = routes;

  const [expanded, setExpanded] = useState(false);
  const history = useHistory()
  const accessToken = localStorage.getItem("accessToken");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const createPerxinsGift = (id) => {
    axios.get( perxinsGiftRoute + id,
    {headers: {'Authorization': 'Bearer '+ accessToken}})
    .catch((error) => console.log(error))
  }

  const isPaying = (id) => {
    axios.get( isPayingRoute + id,
    {headers: {'Authorization': 'Bearer '+ accessToken}})
    .catch((error) => console.log(error))
  }

  const deleteService = (id) => {
    axios.delete(deleteRoute + id,
    {headers:  {'Authorization': 'Bearer '+ accessToken}})
  }

  return (
    <div>
        {services?.filter((val)=>{
            if(searchBarValue===""){
                return val;
            } else if (val.name.toLowerCase().includes(searchBarValue.toLowerCase())){
                return val;
            }
          }).map((event, key)=>(
            <Accordion
             key={key}
             expanded={expanded === key} 
             onChange={handleChange(key)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                {event.name}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}> - {event.isPaying && "Pagando"}</Typography>
              <Typography sx={{ color: 'text.secondary' }}> - {event.perxinsGift && "Regalo de Perxins"}</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Button
              onClick={()=>history.push(updateRoute + event._id)}
            >  Editar
              </Button>
              <Button
                onClick={()=>deleteService(event._id)}
              >
                Eliminar
              </Button>
              <Button
              onClick={()=>isPaying(event._id)}
              >
                IsPaying
              </Button>
              <Button
                onClick={()=>createPerxinsGift(event._id)}
              >
                PerxinsGift
              </Button>
            </AccordionDetails>
          </Accordion>
        ))}
      
    </div>
  );
}