// Importation des fonctions nécessaires pour le rendu et la vérification des éléments de l'application
import { render, screen } from '@testing-library/react';
// Importation du composant principal de l'application
import App from './App';

// Définition d'un test pour vérifier le rendu d'un élément spécifique dans l'application
test('renders learn react link', () => {
  // Rendu du composant App dans le contexte de test
  render(<App />);
  
  // Recherche d'un élément contenant le texte "learn react" (insensible à la casse)
  const linkElement = screen.getByText(/learn react/i);
  
  // Vérification que cet élément est présent dans le document
  expect(linkElement).toBeInTheDocument();
});
