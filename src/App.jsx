import React from 'react'
import "./App.css"
import { Helmet } from 'react-helmet'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import CrudUsuarios from './pages/CrudUsuarioPages'

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route
            path='/rh/added/pacientes'
            element={
              <>
                <Helmet>
                  <title>Adicionar pacientes</title>
                </Helmet>
                <CrudUsuarios/>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
  )
}

export default App
