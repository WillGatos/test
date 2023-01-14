import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';
import axios from "axios"
import { useState } from 'react';
//import { useHistory } from 'react-router-dom';

export default function UsersAccordion({
    routes,
    users,
    searchBarValue,
}) {
  const {
    isAuthRoute,
    isAdminRoute,
  } = routes;

  const [expanded, setExpanded] = useState(false);
  //const history = useHistory()
  const accessToken = localStorage.getItem("accessToken");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const changeIsAuthRoute = (id) => {
    axios.get( isAuthRoute + id,
    {headers: {'Authorization': 'Bearer '+ accessToken}})
    .catch((error) => console.log(error))
  }

  const changeIsAdminRoute = (id) => {
    axios.get( isAdminRoute + id,
    {headers: {'Authorization': 'Bearer '+ accessToken}})
    .catch((error) => console.log(error))
  }

  return (
    <div>
        {users?.filter((val)=>{
            if(searchBarValue===""){
                return val;
            } else if (val.email.toLowerCase().includes(searchBarValue.toLowerCase())){
                return val;
            }
          }).map((user, key)=>(
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
                {user.email}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>{user.day}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button
              onClick={()=>changeIsAuthRoute(user._id)}
              >
                IsOwner
              </Button>
              <Button
                onClick={()=>changeIsAdminRoute(user._id)}
              >
                IsAdmin
              </Button>
            </AccordionDetails>
          </Accordion>
        ))}
      
    </div>
  );
}