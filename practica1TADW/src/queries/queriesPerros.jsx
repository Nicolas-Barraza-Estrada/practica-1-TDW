import React, { useState, useEffect } from 'react';
import { LoremIpsum } from "lorem-ipsum";
import { useQuery } from "react-query";
import axios from "axios";

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

export function useQueryPerros() {
  return useQuery(["QueryPerros"], QueryPerros, {
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: false,
    enabled: true,
  });
}

export const QueryPerros = async () => {
  let urlBase = "https://dog.ceo/api/breeds/image/random";
  const { data } = await axios.get(urlBase);
  
  // Generar un nombre de 6 letras
  const nombre = generateRandomName(6);
  
  // Generar un párrafo de longitud aleatoria pero corta
  const descripcion = lorem.generateSentences(getRandomInt(2, 5));
  
  return { link: data.message, nombre, descripcion };
};

function generateRandomName(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
