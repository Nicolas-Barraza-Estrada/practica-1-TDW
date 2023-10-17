import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useQueryPerros } from '../queries/queriesPerros';
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



function Home() {
  const { data, isLoading, isError, refetch } = useQueryPerros();
  const [aceptados, setAceptados] = useState([]);
  const [rechazados, setRechazados] = useState([]);
  const [expandedDescription, setExpandedDescription] = useState(null);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  const handleAceptar = (perro) => {
    if (!aceptados.includes(perro)) {
      setAceptados((aceptados) => [perro, ...aceptados]);
      refetch();
    }
  };

  const handleRechazar = (perro) => {
    if (!rechazados.includes(perro)) {
      setRechazados((rechazados) => [perro, ...rechazados]);
      refetch();
    }
  };

  const retractarAceptar = (perro) => {
    if (!rechazados.includes(perro)) {
      setRechazados((rechazados) => [perro, ...rechazados]);
      let otros = aceptados.filter((item) => item !== perro);
      setAceptados(otros);
    }
  };

  const retractarRechazar = (perro) => {
    if (!aceptados.includes(perro)) {
      setAceptados((aceptados) => [perro, ...aceptados]);
      let otros = rechazados.filter((item) => item !== perro);
      setRechazados(otros);
    }
  };

  return (
  <Grid container spacing={4} style={{ height: '100vh', width: '160vh' }}marginLeft={1} >
    <Grid item xs={12} sm={4} md={4} >
          <div className="home">
            <Typography variant="h4" align="left" padding={1}>Perfil</Typography>
            {isLoading ? (
              <CircularProgress />
            ) : isError ? (
              <Alert severity="error">Error al cargar datos</Alert>
            ) : (
              <Card sx={{ maxWidth: 350, maxHeight: 400, minWidth: 350, minHeight: 200 }}>
                <CardMedia component="img" image={data?.link} sx={{ maxWidth: 350, maxHeight: 200, minWidth: 350, minHeight: 80 }} />
                <CardContent style={{ overflow: 'auto' }}>
                  Nombre: {data?.nombre} <br />
                  Descripción: {data?.descripcion}
                </CardContent>
              </Card>
            )}
            <Button variant="contained" color="primary" onClick={() => handleAceptar(data)}>Aceptar</Button>
            <Button variant="contained" color="secondary" onClick={() => handleRechazar(data)}>Rechazar</Button><br />
          </div>
        </Grid>

      <Grid item xs={12} sm={4} md={4}>
        <div className="section" style={{ maxHeight: '100vh', overflow: 'auto' }}>
          <Typography variant="h4" align="left" padding={1}>Aceptados</Typography>
          {aceptados.map((item, index) => (
            <div key={index}>
              <Divider />
              <Card sx={{ maxWidth: 350,maxHeight:310,minWidth: 350,minHeight:200  }}>
                
                <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <CardMedia component="img" image={item.link} sx={{ maxWidth: 80,maxHeight:80,minWidth: 80,minHeight:80}} />
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">{item.nombre}</Typography>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" color="secondary" onClick={() => retractarAceptar(item)}>Rechazar</Button>
                    </Grid>
                  </Grid>
  
                  <Accordion expanded={expanded === index}
                    onChange={handleChange(index)}  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header">Descripción</AccordionSummary>
                    <AccordionDetails>
                      <Typography>{item.descripcion}</Typography>
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </Card></div>
          ))}
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <div className="section" style={{ maxHeight: '100vh', overflow: 'auto' }}>
          <Typography variant="h4" align="left" padding={1}>Rechazados</Typography>
          {rechazados.map((item, index) => (
            <div key={index}>
              <Divider />
              <Card sx={{ maxWidth: 350,maxHeight:310,minWidth: 350,minHeight:200 }}>
                
                <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <CardMedia component="img" image={item.link} sx={{ maxWidth: 80,maxHeight:80,minWidth: 80,minHeight:80 }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">{item.nombre}</Typography>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" color="primary" onClick={() => retractarRechazar(item)}>Aceptar </Button>
                    </Grid>
                  </Grid>
                  <Accordion
                    expanded={expandedDescription === index}
                    onChange={() => setExpandedDescription(expandedDescription === index ? null : index)}
                  > 
                    <AccordionSummary 
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${index}bh-content`}
                      id={`panel${index}bh-header`}>Descripción</AccordionSummary>
                    <AccordionDetails>
                      <Typography>{item.descripcion}</Typography>
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </Card>
              
            </div>
          ))}
        </div>
      </Grid>
    </Grid>
  );
}

export default Home;
