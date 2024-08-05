// Importation de React, la bibliothèque principale pour construire l'interface utilisateur
import React from 'react';
// Importation de la fonction ReactDOM pour rendre le composant React dans le DOM
import ReactDOM from 'react-dom/client';
// Importation des styles globaux pour l'application
import './index.css';
// Importation du composant principal de l'application
import App from './App';
// Importation de la fonction pour mesurer les performances de l'application
import reportWebVitals from './reportWebVitals';

// Création d'un "root" pour le rendu de l'application React dans l'élément HTML avec l'id "root"
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendu du composant App dans le root avec le mode strict de React activé
root.render(
  <React.StrictMode>
    {/* Le composant App est le point d'entrée principal de l'application */}
    <App />
  </React.StrictMode>
);

// Appel de la fonction pour mesurer les performances de l'application (par défaut, elle ne fait rien)
reportWebVitals();
