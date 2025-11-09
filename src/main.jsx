import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { AddedItemContextProvider } from './context/AddedItemContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    
    

    <AddedItemContextProvider>

      
      <AuthContextProvider>
        
          <App />

      </AuthContextProvider>  

    </AddedItemContextProvider>



      

   
   
    

    </BrowserRouter>
  </StrictMode>
)
