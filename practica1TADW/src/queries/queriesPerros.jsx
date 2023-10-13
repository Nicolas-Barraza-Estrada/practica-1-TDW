// QueryPerros.jsx
import React, { useState, useEffect } from 'react';
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

export const QueryPerros = ({ onProfileLoaded }) => {
  const loadProfileImage = () => {
    console.log("Cargando imagen...");
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((response) => response.json())
      .then((data) => {
        console.log("Imagen cargada con éxito.");
        if (data.status === 'success') {
          const newProfile = {
            nombre: lorem.generateWords(2),
            descripcion: lorem.generateSentences(3),
            imagenUrl: data.message,
          };
          onProfileLoaded(newProfile);
        }
      })
      .catch((error) => {
        console.error('Error al cargar la imagen:', error);
      });
  };
  

  useEffect(() => {
    loadProfileImage();
  }, []);

  return null;
};