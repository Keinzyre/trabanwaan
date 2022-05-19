import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

function FAQS(props) {
  const [expanded, setExpanded] = useState(false);
  const text =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            How does this work?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{text}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Question 2
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{text}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Question 3
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{text}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Where can i reach your support?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{text}</Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default FAQS;
