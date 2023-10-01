import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
// import { UserProvider } from './Components/Hooks/useUser'
import ProviderWrappedApp from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ProviderWrappedApp />

);

