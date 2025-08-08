import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa el cliente de ReactDOM
import './index.css'; // Importa tus estilos CSS globales (si los tienes)
import App from './App'; // Importa el componente principal de tu aplicación

// Crea la raíz de React para renderizar tu aplicación
// Esto es parte de la API de React 18 para un mejor rendimiento
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza el componente principal de tu aplicación dentro del elemento con id="root"
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si tienes un archivo index.css, asegúrate de que esté en la misma carpeta 'src'
// o ajusta la ruta de importación './index.css' según sea necesario.