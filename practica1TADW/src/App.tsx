import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import './App.css';

function App() {
  const [perfilList, setImagenList] = useState([]);
  const [aceptadosList, setAceptadosList] = useState([]);
  const [rechazadosList, setRechazadosList] = useState([]);
  const [textoCargado, setTextoCargado] = useState(''); // Estado para almacenar el texto cargado

  function aceptar() {
    console.log('aceptado');
  }
  function cargarTexto() {
    // Genera un número aleatorio entre 1 y 100 (puedes personalizar el rango según tus necesidades)
    const textoGenerado = Math.floor(Math.random() * 100) + 1;
    setTextoCargado(textoGenerado.toString()); // Convierte el número en una cadena para mostrarlo
  }
  
  return (
    <Grid container spacing={80} style={{ height: '200vh'  }}>
      <Grid item xs={12} sm={4}>
        <div className="section">
          <h2>Perfil</h2>
          {textoCargado && <p>{textoCargado}</p>} {/* Muestra el texto cargado si existe */}
          <Button variant="outlined" disableElevation onClick={() => cargarTexto()}>Cargar</Button>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>{<Button variant="contained" color="primary" size="large" onClick={() => aceptar()}>aceptar</Button>}</div>
            <div>{<Button variant="contained" color="secondary" size="large">Rechazar</Button>}</div>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={4}>
        <div className="section">
          <h2>Aceptados</h2>
          {/* Agrega tu contenido de "aceptados" aquí */}
        </div>
      </Grid>
      <Grid item xs={12} sm={4}>
        <div className="section">
          <h2>Rechazados</h2>
          {/* Agrega tu contenido de "rechazados" aquí */}
        </div>
      </Grid>
    </Grid>
  );
}

export default App;
