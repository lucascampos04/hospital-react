import React from 'react'
import "./App.css"
import { Helmet } from 'react-helmet'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import CrudUsuarios from './pages/CrudUsuarioPages'
import LoginPage from './pages/LoginPages'

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

          <Route
            path='/login'
            element={
              <>
                <Helmet>
                  <title>Login</title>
                </Helmet>
                <LoginPage/>
              </>
            }
          
          />
        </Routes>
      </BrowserRouter>
  )
}

export default App
