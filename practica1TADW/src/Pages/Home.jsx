import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Profile from './Components/dogProfile';
import Grid from '@mui/material/Grid';

function Home() {
  const [reload, setReload] = useState(0);

  const handleReload = () => {
    setReload(reload + 1);
  }

  return (
    <Grid container spacing={40} style={{ height: '200vh' }}>
        <Grid item xs={12} sm={4} sx={{ maxWidth: 10 }}>
            <div className="home">
                <Button variant="contained" color="primary" onClick={handleReload}>Cargar de Nuevo</Button>
                <Profile key={reload} />
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
