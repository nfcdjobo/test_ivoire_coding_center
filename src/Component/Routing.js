// Importation des composants pour les différentes pages de l'application
import Index from './Index';  // Page d'accueil
import Login from './Login';  // Page de connexion
import Register from './Register';  // Page d'inscription
import Profile from './Profile';  // Page de profil utilisateur
import Mesblogs from './Mesblogs';  // Page des blogs de l'utilisateur
import Newblog from './Newblog';  // Page de création d'un nouveau blog
import Categories from './Categories';  // Page des catégories
import Enattente from './Enattente';  // Page des blogs en attente de publication
import Edite from './Edite';  // Page d'édition d'un blog
import Lecture from './Lecture';  // Page de lecture d'un blog
import Autres from './Autres';  // Page des autres blogs

// Définition des routes de l'application
export const Routing = {
    home: {
        path: "/",  // Chemin pour la page d'accueil
        name: "Home",  // Nom de la route
        element: Index  // Composant associé à cette route
    },
    login: {
        path: "/connexion",  // Chemin pour la page de connexion
        name: "Login",  // Nom de la route
        element: Login  // Composant associé à cette route
    },
    register: {
        path: "/inscription",  // Chemin pour la page d'inscription
        name: "Register",  // Nom de la route
        element: Register  // Composant associé à cette route
    },
    profile: {
        path: "/profile",  // Chemin pour la page de profil utilisateur
        name: "Profile",  // Nom de la route
        element: Profile  // Composant associé à cette route
    },
    mesBlogs: {
        path: "/mes-blogs",  // Chemin pour la page des blogs de l'utilisateur
        name: "Mes Blogs",  // Nom de la route
        element: Mesblogs  // Composant associé à cette route
    },
    newBlog: {
        path: "/new-blog",  // Chemin pour la page de création d'un nouveau blog
        name: "New Blog",  // Nom de la route
        element: Newblog  // Composant associé à cette route
    },
    categories: {
        path: "/categories",  // Chemin pour la page des catégories
        name: "Categories",  // Nom de la route
        element: Categories  // Composant associé à cette route
    },
    blogEnAttente: {
        path: "/blog-en-attend",  // Chemin pour la page des blogs en attente de publication
        name: "Blog en Attente",  // Nom de la route
        element: Enattente  // Composant associé à cette route
    },
    edite: {
        path: "/edite",  // Chemin pour la page d'édition d'un blog
        name: "Edite",  // Nom de la route
        element: Edite  // Composant associé à cette route
    },
    lecture: {
        path: "/lecture",  // Chemin pour la page de lecture d'un blog
        name: "Lecture",  // Nom de la route
        element: Lecture  // Composant associé à cette route
    },
    autres: {
        path: "/autres-blogs",  // Chemin pour la page des autres blogs
        name: "Autres",  // Nom de la route
        element: Autres  // Composant associé à cette route
    }
};
