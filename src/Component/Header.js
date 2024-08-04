import React, { useState, useEffect } from 'react';
import { get_cookie } from "../cookies/cookies";

function Header(props) {
    const [open, setOpen] = useState(false);
    const [option, transformHeader] = useState(false);
    const [activeOption, setActiveOption] = useState("");

    useEffect(() => {
        const cookies = get_cookie("cookies_blog");
        if (cookies) {
            transformHeader(Boolean(cookies));
        }
    }, []);

    const handleOptionClick = (optionName) => {
        setActiveOption(optionName);
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
                                    <a className="hover:bg-gray-400 rounded m-2 p-2" href="/deconnexion" rel="noopener noreferrer"> Déconnexion </a>
                                    <a className="hover:bg-gray-400 rounded m-2 p-2" href="/profile" rel="noopener noreferrer"> profile </a>
                                    <button id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown hover <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                                    </svg>
                                    </button>
                                    <div id="dropdownHover" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                                        <li>
                                            <a href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                        </li>
                                        <li>
                                            <a href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                        </li>
                                        <li>
                                            <a href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                                        </li>
                                        </ul>
                                    </div>
                                </>
                            ) : 
                            (
                                <>
                                    <a className="hover:bg-gray-400 rounded m-2 p-2" href="/connexion" rel="noopener noreferrer"> Connexion </a>
                                    <a className="hover:bg-gray-400 rounded m-2 p-2" href="/inscription" rel="noopener noreferrer"> S'inscrire </a>
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
                            className={`hover:bg-gray-400 rounded py-2 px-4 mx-2 ${activeOption === "Mes Blogs" ? "bg-gray-400" : ""}`}
                            onClick={() => handleOptionClick(option ? "Mes Blogs" : "Technologies")}
                        >
                            {option ? "Mes Blogs" : "Technologies"}
                        </a>
                        {option && (
                            <>
                                <a
                                    href="/new-blog"
                                    className={`hover:bg-gray-400 rounded py-2 px-4 mx-2 ${activeOption === "Nouveau" ? "bg-gray-400" : ""}`}
                                    onClick={() => handleOptionClick("Nouveau")}
                                >
                                    Créér Nouveau Blog
                                </a>
                                <a
                                    href="/blog-en-attend"
                                    className={`hover:bg-gray-400 rounded py-2 px-4 mx-2 ${activeOption === "En attente" ? "bg-gray-400" : ""}`}
                                    onClick={() => handleOptionClick("En attente")}
                                >
                                    Brouillons
                                </a>
                                <a
                                    href="/politics"
                                    className={`hover:bg-gray-400 rounded py-2 px-4 mx-2 ${activeOption === "Autres Publications" ? "bg-gray-400" : ""}`}
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
