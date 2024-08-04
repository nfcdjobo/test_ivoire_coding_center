
import Index from './Index';
import Login from './Login';
import Register from './Register';
 import Profile from './Profile';
import Mesblogs from './Mesblogs';
import Newblog from './Newblog.';
import Categories from './Categories';
import Enattente from './Enattente';
import Edite from './Edite';
import Lecture from './Lecture';

export const Routing = {
    home: {
        path: "/",
        name: "Home",
        element: Index
    },
    login: {
        path: "/connexion",
        name: "Login",
        element: Login
    },
    register: {
        path: "/inscription",
        name: "Register",
        element: Register
    },
    profile: {
        path: "/profile",
        name: "Profile",
        element: Profile
    },
    mesBlogs: {
        path: "/mes-blogs",
        name: "Mes Blogs",
        element: Mesblogs
    },
    newBlog: {
        path: "/new-blog",
        name: "New Blog",
        element: Newblog
    },
    categories: {
        path: "/categories",
        name: "Categories",
        element: Categories
    },
    blogEnAttente: {
        path: "/blog-en-attend",
        name: "Blog en Attente",
        element: Enattente
    },
    edite: {
        path: "/edite",
        name: "Edite",
        element: Edite
    },
    lecture: {
        path: "/lecture",
        name: "Lecture",
        element: Lecture
    }
};
