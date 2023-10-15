// QueryPerros.jsx
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
  let nombre = lorem.generateWords(2);
  let descripcion = lorem.generateSentences(3);
  console.log(data)
  return { data, nombre, descripcion };
};
