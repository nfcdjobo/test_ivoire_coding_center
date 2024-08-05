// Importation du fichier CSS pour le style de l'application
import './App.css';

// Importation de la fonction Suspense pour la gestion du chargement asynchrone
import { Suspense } from 'react';

// Importation des composants nécessaires pour le routage de l'application
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importation des routes définies dans le composant Routing
import { Routing } from './Component/Routing';

// Définition du composant principal de l'application
function App() {
  return (
    // Configuration du routeur pour la navigation entre les pages
    <Router>
      {/* Gestion de l'état de chargement pour les composants chargés de manière asynchrone */}
      <Suspense fallback={<div className={"chargement"}>Loading...</div>}>
        {/* Définition des routes de l'application */}
        <Routes>
          {/* Création des routes dynamiquement à partir des valeurs du composant Routing */}
          {Object.values(Routing).map((route) => (
            // Définition de chaque route avec son chemin et son composant associé
            <Route key={route.name} path={route.path} element={<route.element />} />
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
}

// Exportation du composant App pour qu'il puisse être utilisé ailleurs dans l'application
export default App;
