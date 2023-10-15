import React, { useState, useEffect } from 'react';
import Profile from './Components/dogProfile';
import Grid from '@mui/material/Grid';
import { useQueryPerros } from '../queries/queriesPerros';
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";

function Home() {
  const { data, isLoading, isError, refetch } = useQueryPerros();
  const [aceptados, setAceptados] = useState([]);
  const [rechazados, setRechazados] = useState([]);

  const mostratData = (valor) => {
    console.log(valor);
  };

  const handleAceptar = (perro) => {
    if (!aceptados.includes(perro)) {
    setAceptados((aceptados) => [perro, ...aceptados]);
    refetch(); // Recargar el perfil del perro
    }
    
  };

  const handleRechazar = (perro) => {
    if (!rechazados.includes(perro)) {
      setRechazados((rechazados) => [perro, ...rechazados]);
      refetch(); // Recargar el perfil del perro
    }
    
  };

  const retractarAceptar = (perro) => {
    if (!rechazados.includes(perro)) {
      setRechazados((rechazados) => [perro, ...rechazados]);
      let otros;
      otros = aceptados.filter((item) => item !== perro);
      setAceptados(otros);
    }

  };

  const retractarRechazar = (perro) => {
    if (!aceptados.includes(perro)) {
      setAceptados((aceptados) => [perro, ...aceptados]);
      let otros;
      otros = rechazados.filter((item) => item !== perro);
      setRechazados(otros);
    }
  };

  return (
    <Grid container spacing={4} style={{ height: '100vh', width: '160vh' }}>
      <Grid item xs={12} sm={4}>
        <div className="home">
        <Typography variant="h4" align="left">Perfil</Typography>
          {isLoading ? (
            <p>Cargando datos...</p>
          ) : isError ? (
            <Alert severity="error">Error al cargar datos</Alert>
          ) : (
            <Card sx={{ maxWidth: 300 }}>
              <CardMedia component="img" image={data.link} />
              <CardContent>
                Nombre : {data.nombre} <br />
                Descripción : {data.descripcion}
              </CardContent>
            </Card>
          )}
          <Button variant="contained" color="primary" onClick={() => handleAceptar(data)}>Aceptar</Button><br />
          <Button variant="contained" color="primary" onClick={() => handleRechazar(data)}>Rechazar</Button><br />
        </div>
      </Grid>
      <Grid item xs={12} sm={4}>
        <div className="section">
        <Typography variant="h4" align="left">Aceptados</Typography>
          {aceptados.map((item, index) => (
            <div key={index}>
              <Divider />
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia component="img" image={item.link} />
                <CardContent>
                  Nombre : {item.nombre} <br />
                  Descripción : {item.descripcion}
                </CardContent>
              </Card>
              <Button variant="contained" color="primary" onClick={() => retractarAceptar(item)}>Rechazar</Button><br />
            </div>
          ))}
        </div>
      </Grid>
      <Grid item xs={12} sm={4}>
        <div className="section">
        <Typography variant="h4" align="left">Rechazados</Typography>
          {rechazados.map((item, index) => (
            <div key={index}>
              <Divider />
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia component="img" image={item.link} />
                <CardContent>
                  Nombre : {item.nombre} <br />
                  Descripción : {item.descripcion}
                  <br />
                </CardContent>
              </Card>
              <Button variant="contained" color="primary" onClick={() => retractarRechazar(item)}>Aceptar</Button><br />
            </div>
          ))}
        </div>
      </Grid>
    </Grid>
  );
}

export default Home;
