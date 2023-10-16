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
} from "@mui/material";

function Home() {
  const { data, isLoading, isError, refetch } = useQueryPerros();
  const [aceptados, setAceptados] = useState([]);
  const [rechazados, setRechazados] = useState([]);

  const mostratData = (valor) => {
    console.log(valor);
  };

  const handleAceptar = (perro) => {
    setAceptados((aceptados) => [perro,...aceptados]);
    //console.log(aceptados)
    refetch(); // Recargar el perfil del perro
  };

  const handleRechazar = (perro) => {
    setRechazados((rechazados) => [perro,...rechazados]);
    //console.log(aceptados)
    refetch(); // Recargar el perfil del perro
  };

  return (
    <Grid container spacing={4} style={{ height: '100vh',width:'160vh' }}>
      <Grid item xs={12} sm={4} sx={{ maxWidth: 10 }}>
        <div className="home">
          <h2>............Perfil</h2>
          {isLoading ? (
            <p>Cargando datos...</p>
          ) : isError ? (
            <Alert severity="error">Error al cargar datos</Alert>
          ) : (
            <Card sx={{ maxWidth: 300}}>
              <CardMedia component="img" image={data.link} />
              
              <CardContent>
                Nombre : {data.nombre} <br/>
                Descripción : {data.descripcion}
              </CardContent>
            </Card>
          )}
          <Button variant="contained" color="primary" onClick={() => handleAceptar(data)}>Aceptar</Button><br/>
          <Button variant="contained" color="primary" onClick={() => handleRechazar(data)}>Rechazar</Button><br/>
        </div>
      </Grid>
      <Grid item xs={12} sm={4}>
        <div className="section">
          <h2>............Aceptados</h2>
          {aceptados.map((item, index) => (
            
<>
            <Card sx={{ maxWidth: 300}}>
            <CardMedia component="img" image={item.link} />
            <CardContent>
              Nombre : {item.nombre} <br/>
              Descripción : {item.descripcion}
            </CardContent>
          </Card>
          </>
          ))}

        </div>
      </Grid>
      <Grid item xs={12} sm={4}>
        <div className="section">
          <h2>............Rechazados</h2>
          {rechazados.map((item, index) => (
            <Card sx={{ maxWidth: 300}}>
            <CardMedia component="img" image={item.link} />
            <CardContent>
              Nombre : {item.nombre} <br/>
              Descripción : {item.descripcion}
              <br/>
            </CardContent>
          </Card>
          
          ))}
        </div>
      </Grid>
    </Grid>
  );
}

export default Home;
