import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function BasicAccordion({
    name,
    children,
}) {
  return (
        <Accordion
        sx={{
            minHeight:"15px",
            background: "transparent",
            border:"transparent",
            width: "210px",
            boxShadow: "0px 2px 1px -1px rgba(255, 255, 255, 0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)"
        }}
        >
            <AccordionSummary
                sx={{
                minHeight:"15px",
                background: "transparent",
                border:"transparent",
                color: "white"
            }}
                expandIcon={<ExpandMoreIcon
                    
                    sx={{color:"white"}}
                    />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
            <Typography>
                {name}
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
      </Accordion>
  )
}

export default BasicAccordion