import React, { useState, useEffect } from 'react';  // Importation des hooks useState et useEffect de React
import { get_cookie, destrory } from "../cookies/cookies";  // Importation des fonctions get_cookie et destrory du fichier cookies.js dans le dossier cookies

function Header(props) {  // Définition du composant fonctionnel Header
    const [open, setOpen] = useState(false);  // Déclaration de l'état local pour gérer l'ouverture du menu
    const [option, transformHeader] = useState(false);  // Déclaration de l'état local pour gérer les options du header
    const [activeOption, setActiveOption] = useState("");  // Déclaration de l'état local pour suivre l'option active
    const currentPath = window.location.pathname;  // Récupération du chemin d'accès actuel

    useEffect(() => {  // Utilisation du hook useEffect pour exécuter du code au montage du composant
        const cookies = get_cookie("cookies_blog");  // Récupération des cookies nommés "cookies_blog"
        if (cookies) {
            transformHeader(Boolean(cookies));  // Mise à jour de l'état option si les cookies existent
        }
    }, []);  // Tableau de dépendances vide, donc l'effet se déclenche uniquement au montage du composant

    const handleOptionClick = (optionName) => {  // Fonction pour gérer le clic sur une option
        setActiveOption(optionName);  // Mise à jour de l'état activeOption avec le nom de l'option cliquée
    };

    return (
        <>
            <nav className="w-full py-4 bg-blue-800 shadow">
                <div className="w-full container mx-auto flex flex-wrap items-center justify-between">
                    <ul className="flex items-center justify-between font-bold text-sm text-white uppercase no-underline">
                        <li>
                            <a
                                className={`hover:text-gray-200 hover:underline px-4 ${activeOption === "Boutique" ? "text-gray-200 underline" : ""}`}
                                href="/shop"
                                onClick={() => handleOptionClick("Boutique")}
                            >
                                Boutique
                            </a>
                        </li>
                        <li>
                            <a
                                className={`hover:text-gray-200 hover:underline px-4 ${activeOption === "À propos" ? "text-gray-200 underline" : ""}`}
                                href="/about"
                                onClick={() => handleOptionClick("À propos")}
                            >
                                À propos
                            </a>
                        </li>
                    </ul>

                    <div className="flex items-center text-lg no-underline text-white pr-6">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a className="pl-6" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a className="pl-6" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a className="pl-6" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        {
                            option ? 
                            (
                                <>
                                    <a href="/profile" className={`hover:bg-gray-400 rounded py-2 px-4 mx-2 ${currentPath.includes("/profile") ? "bg-gray-400" : ""}`}> Profile </a>
                                    <button className="hover:bg-gray-400 rounded m-2 p-2" onClick={() => destrory("cookies_blog")} rel="noopener noreferrer"> Déconnexion </button>
                                </>
                            ) : 
                            (
                                <>
                                    <a className={currentPath.includes("/connexion") ?"bg-gray-400 rounded m-2 p-2" : "hover:bg-gray-400 rounded m-2 p-2"} href="/connexion" rel="noopener noreferrer"> Connexion </a>
                                    <a className={currentPath.includes("/inscription") ?"bg-gray-400 rounded m-2 p-2" : "hover:bg-gray-400 rounded m-2 p-2"} href="/inscription" rel="noopener noreferrer"> S'inscrire </a>
                                </>
                            )
                        }
                    </div>
                </div>
            </nav>

            {
                !option ? 
                (
                    <header className="w-full container mx-auto">
                        <div className="flex flex-col items-center py-12">
                            <a className="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl" href="/">
                                Blog minimaliste
                            </a>
                            <p className="text-lg text-gray-600">
                                Lorem Ipsum Dolor Sit Amet
                            </p>
                        </div>
                    </header>
                ) : ""
            }

            <nav className="w-full py-4 border-t border-b bg-gray-100">
                <div className="block sm:hidden">
                    <button
                        className="block md:hidden text-base font-bold uppercase text-center flex justify-center items-center"
                        onClick={() => setOpen(!open)}
                    >
                        Topics <i className={`fas ml-2 ${open ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </button>
                </div>
                <div className={`${open ? 'block' : 'hidden'} w-full flex-grow sm:flex sm:items-center sm:w-auto`}>
                    <div className="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
                        
                        <a
                            href={option ? "/mes-blogs" : "/connexion"}
                            className={`hover:bg-gray-400 rounded py-2 px-4 mx-2 ${currentPath.includes("/mes-blogs") ? "bg-gray-400" : ""}`}
                            onClick={() => handleOptionClick(option ? "Mes Blogs" : "Technologies")}
                        >
                            {option ? "Mes Blogs" : "Technologies"}
                        </a>
                        {option && (
                            <>
                                <a
                                    href="/new-blog"
                                    className={`hover:bg-gray-400 rounded py-2 px-4 mx-2 ${currentPath.includes("/new-blog") ? "bg-gray-400" : ""}`}
                                    onClick={() => handleOptionClick("Nouveau")}
                                >
                                    Créer Nouveau Blog
                                </a>
                                <a
                                    href="/blog-en-attend"
                                    className={`hover:bg-gray-400 rounded py-2 px-4 mx-2 ${currentPath.includes("/blog-en-attend") ? "bg-gray-400" : ""}`}
                                    onClick={() => handleOptionClick("En attente")}
                                >
                                    Brouillons
                                </a>
                                <a
                                    href="/autres-blogs"
                                    className={`hover:bg-gray-400 rounded py-2 px-4 mx-2 ${currentPath.includes("/autres-blogs") ? "bg-gray-400" : ""}`}
                                    onClick={() => handleOptionClick("Autres Publications")}
                                >
                                    Autres Publications
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
