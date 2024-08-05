


import { Find, SaveCategorie } from "../cookies/usermanagement";  // Importation de la fonction SaveCategorie à partir du fichier usermanagement dans le dossier cookies
import { FindById, FormatDate } from "../cookies/usermanagement";  // Importation des fonctions FindById et FormatDate du fichier usermanagement.js dans le dossier cookies
import Footer from "./Footer";  // Importation du composant Footer
import Header from "./Header";  // Importation du composant Header
import { useLocation } from "react-router-dom";  // Importation du hook useLocation de react-router-dom pour accéder à l'emplacement actuel dans l'application
import { Titre } from "./SemiComposent/SemiComponent";  // Importation du composant Titre de SemiComponent.js dans le dossier SemiComposent

const useQuery = () => {
    return new URLSearchParams(useLocation().search);  // Définition de la fonction useQuery pour récupérer les paramètres de requête de l'URL
};

function Index(props) {  // Définition du composant fonctionnel Index

    const blogs = Find("blogs");  // Recherche du blog par son identifiant en utilisant la fonction FindById

    const randomValue = Math.floor(Math.random() * blogs.length);

    const blog = blogs[randomValue];
    
    const categories = [  // Déclaration d'un tableau d'objets pour les catégories
        {
            "libelle": "Technologie",
        },
        {
            "libelle": "Éducation",
        },
        {
            "libelle": "Santé",
        },
        {
            "libelle": "Voyage",
        },
        {
            "libelle": "Finance",
        },
        {
            "libelle": "Divertissement",
        },
        {
            "libelle": "Sport",
        },
        {
            "libelle": "Technologie",
        }
    ];

    categories.map(item => SaveCategorie("categories", item));  // Parcours de chaque élément du tableau categories et enregistrement de chaque catégorie à l'aide de la fonction SaveCategorie

    return (
        <>
            <Header />
            <Titre titre="Lecture de Blog"/>
            <div className="container mx-auto flex flex-wrap py-6">

                <section className="w-full md:w-2/3 flex flex-col items-center px-3">

                    <article className="flex flex-col  my-4">
                    
                        
                        <a href="/" className="hover:opacity-75">
                            <img src="" alt=""/>
                        </a>
                        <div className="bg-white flex flex-col justify-start p-1">
                            <a href="#" className="text-blue-700 text-sm font-bold uppercase pb-4">{FindById("categories", blog.categorie).libelle}</a>
                            <a href="#" className="text-3xl font-bold hover:text-gray-700 pb-4">{blog.titre}</a>
                            <p className="text-sm pb-8">Par <a href="#" className="font-semibold hover:text-gray-800"> {FindById("users", blog.user_id).nom+" "+FindById("users", blog.user_id).prenom}</a>, Publiée le {FormatDate(new Date(blog.date_publication))}
                            </p>
                            <h1 className="text-2xl font-bold pb-3">{blog.description}</h1>
                        </div>
                        <div className="p-2" dangerouslySetInnerHTML={{ __html: blog.contenu }}/>
                    </article>
                </section>

                <aside className="w-full md:w-1/3 flex flex-col items-center px-3">

                    <div className="w-full bg-white shadow flex flex-col my-4 p-6">
                        <p className="text-xl font-semibold pb-5">À propos</p>
                        <p className="pb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mattis est eu odio sagittis tristique. Vestibulum ut finibus leo. In hac habitasse platea dictumst.</p>
                        <a href="/" className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4">
                            Apprendre a nous connaitre
                        </a>
                    </div>

                    <div className="w-full bg-white shadow flex flex-col my-4 p-6">
                        <p className="text-xl font-semibold pb-5">Instagram</p>
                        <div className="grid grid-cols-3 gap-3">
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=1" alt=""/>
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=2" alt=""/>
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=3" alt=""/>
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=4" alt=""/>
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=5" alt=""/>
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=6" alt=""/>
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=7" alt=""/>
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=8" alt=""/>
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=9" alt=""/>
                        </div>
                        <a href="/" className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-6">
                            <i className="fab fa-instagram mr-2"></i> Suivez @djobo
                        </a>
                    </div>

                </aside>
            </div>
            <Footer/>
        </>
    )
}

export default Index;