// eslint-disable-next-line no-unused-vars
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import { DataContextProvider } from './useContext/DataContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <Home />
  // </React.StrictMode>,
    <BrowserRouter>
      <DataContextProvider>
        <App />
      </DataContextProvider>
    </BrowserRouter>
)
