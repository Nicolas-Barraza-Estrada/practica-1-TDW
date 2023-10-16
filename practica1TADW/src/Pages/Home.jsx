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
} from "@mui/material";

function Home() {
 const { data, isLoading, isError } = useQueryPerros();
  const [aceptados, setAceptados] = useState([]);
  const [rechazados, setRechazados] = useState([]);



  const handleAceptar = (valor) => {
  };

  const handleRechazar = (valor) => {
  };

  return (
    <Grid container spacing={4} style={{ height: '200vh' }}>
      <Grid item xs={12} sm={4} sx={{ maxWidth: 10 }}>
        <div className="home">
          <h2>Perfil</h2>
          {isLoading ? (
            <p>Cargando datos...</p>
          ) : isError ? (
            <Alert severity="error">Error al cargar datos</Alert>
          ) : (
            <Card>
              <CardMedia component="img" image={data.data.message} />
              <CardContent>
                Nombre : {data.nombre} <br />
                Descripción : {data.descripcion}
              </CardContent>
            </Card>
          )}
          <Button variant="contained" color="primary" onClick={() => handleAceptar()}>Aceptar</Button>
          <Button variant="contained" color="primary" onClick={() => handleRechazar()}>Rechazar</Button>
        </div>
      </Grid>
      <Grid item xs={12} sm={4}>
        <div className="section">
          <h2>Aceptados</h2>
        </div>
      </Grid>
      <Grid item xs={12} sm={4}>
        <div className="section">
          <h2>Rechazados</h2>
        </div>
      </Grid>
    </Grid>
  );
}

export default Home;
