import React, { useState, useEffect } from 'react';

import { LoremIpsum } from "lorem-ipsum";


  
function Profile() {
  const [dogData, setDogData] = useState({ image: '', name: 'Dog Name', description: 'Dog Description' });

  useEffect(() => {
    // Fetch dog image using the Dog API
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((response) => response.json())
      .then((data) => {
        console.log("Imagen cargada con éxito.");
        if (data.status === 'success') {
          const newProfile = {
            name: 'Dog Name', // Puedes establecer el nombre como desees
            description: 'Dog Description', // Puedes establecer la descripción como desees
            imageUrl: data.message,
          };
          setDogData(newProfile);
        }
      })
      .catch((error) => {
        console.error('Error al cargar la imagen:', error);
      });
  }, []);

  return (
    <div className="profile">
      <img src={dogData.imageUrl} alt="Dog" />
      <h2>{dogData.name}</h2>
      <p>{dogData.description}</p>
    </div>
  );
}

export default Profile;


