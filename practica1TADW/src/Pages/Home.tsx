import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 5,
    min: 4
  }
});

const pageStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const Profile = ({ profile, loadProfileImage, acceptProfile, rejectProfile }) => {
  return (
    <div className="section">
      <h2>Perfil</h2>
      {profile.imagenUrl && (
        <img
          src={profile.imagenUrl}
          alt="Imagen de perro"
          style={{ width: '300px', height: 'auto' }}
        />
      )}
      <div>{profile.nombre}</div>
      <div>{profile.descripcion}</div>
      <Button variant="outlined" disableElevation onClick={loadProfileImage}>
        Cargar ahora
      </Button>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Button variant="contained" color="primary" size="large" onClick={acceptProfile}>
            Aceptar
          </Button>
        </div>
        <div>
          <Button variant="contained" color="secondary" size="large" onClick={rejectProfile}>
            Rechazar
          </Button>
        </div>
      </div>
    </div>
  );
};

function Home() {
  const [imagenUrl, setImagenUrl] = useState('');
  const [aceptadosList, setAceptadosList] = useState([]);
  const [rechazadosList, setRechazadosList] = useState([]);
  const [profile, setProfile] = useState({ nombre: '', descripcion: '', imagenUrl: '' });

  const loadProfileImage = () => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          const newProfile = {
            nombre: lorem.generateWords(2),
            descripcion: lorem.generateSentences(3),
            imagenUrl: data.message,
          };
          setProfile(newProfile);
        }
      })
      .catch((error) => {
        console.error('Error al cargar la imagen:', error);
      });
  };

  useEffect(() => {
    loadProfileImage();
  }, []);

  const acceptProfile = () => {
    setAceptadosList([...aceptadosList, profile]);
    loadProfileImage();
  }

  const rejectProfile = () => {
    setRechazadosList([...rechazadosList, profile]);
    loadProfileImage();
  }

  return (
    <Grid container spacing={4} style={pageStyle}>
      <Grid item xs={12} sm={4}>
        <Profile profile={profile} loadProfileImage={loadProfileImage} acceptProfile={acceptProfile} rejectProfile={rejectProfile} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <div className="section">
          <h2>Aceptados</h2>
          {aceptadosList.map((acceptedProfile, index) => (
            <div key={index}>
              <strong>Nombre:</strong> {acceptedProfile.nombre}
              <br />
              <strong>Descripción:</strong> {acceptedProfile.descripcion}
              <br />
              <img src={acceptedProfile.imagenUrl} alt="Imagen de perro" style={{ width: '150px', height: 'auto' }} />
            </div>
          ))}
        </div>
      </Grid>
      <Grid item xs={12} sm={4}>
        <div className="section">
          <h2>Rechazados</h2>
          {rechazadosList.map((rejectedProfile, index) => (
            <div key={index}>
              <strong>Nombre:</strong> {rejectedProfile.nombre}
              <br />
              <strong>Descripción:</strong> {rejectedProfile.descripcion}
              <br />
              <img src={rejectedProfile.imagenUrl} alt="Imagen de perro" style={{ width: '150px', height: 'auto' }} />
            </div>
          ))}
        </div>
      </Grid>
    </Grid>
  );
}

export default Home;
