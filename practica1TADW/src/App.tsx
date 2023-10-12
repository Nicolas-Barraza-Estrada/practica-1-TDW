import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Home from './Pages/Home'

//import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
    <Home></Home>
    </QueryClientProvider>
    </>
  )
}

export default App
