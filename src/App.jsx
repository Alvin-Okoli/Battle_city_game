import { useRef, useEffect } from 'react'
import MakeGame from './Components/MakeGame'
import Auth from './Components/Auth'
import Game from './game setup/Game'
import "./App.css"
import {createBrowserRouter, createRoutesFromChildren, Route, RouterProvider} from 'react-router-dom'


function App() {  
  const router = createBrowserRouter(
    createRoutesFromChildren(
      <>
        <Route path='/' element={<Auth/>}/>
        <Route path='/game' element={<Game/>}/>
      </>
    )
  )

  return (
    <RouterProvider router={router}/>
  )
}

export default App
