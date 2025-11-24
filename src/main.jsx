import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import AppPage from './pages/AppPage.jsx'
import AnimalDetailsPage from './pages/AnimalDetailsPage.jsx'
import { UserDataProvider } from './contexts/UserData'
import AuthLayout from './layouts/Auth.jsx'
import { InteractionProvider } from './contexts/Interaction.jsx'
import { AnimalsDataProvider } from './contexts/Animals.jsx'
import AddAnimalPage from './pages/AddAnimalPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserDataProvider>
      <AnimalsDataProvider>
      <InteractionProvider>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="app" element={<AuthLayout />} >
              <Route index element={<AppPage />} />
              <Route path='add' element={<AddAnimalPage />} />
              <Route path='animal/:id' element={<AnimalDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

      </InteractionProvider>
      </AnimalsDataProvider>
    </UserDataProvider>
  </StrictMode>,
)
