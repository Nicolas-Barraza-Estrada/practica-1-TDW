import React from 'react';
import Grid from '@mui/material/Grid';
import './App.css'

function App() {
  return (
    <Grid container spacing={80} style={{ height: '200vh' }}>
      <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
        <div className="section">
          <h2>Perfil</h2>
          {/* Agrega tu contenido de "imagen" aquí */}
        </div>
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
        <div className="section">
          <h2>Aceptados</h2>
          {/* Agrega tu contenido de "aceptados" aquí */}
        </div>
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
        <div className="section">
          <h2>Rechazados</h2>
          {/* Agrega tu contenido de "rechazados" aquí */}
        </div>
      </Grid>
    </Grid>
  );
}

export default App;

