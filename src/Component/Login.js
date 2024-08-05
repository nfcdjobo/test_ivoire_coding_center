import { get_cookie, save_cookie } from "../cookies/cookies";  // Importation des fonctions get_cookie et save_cookie à partir du fichier cookies.js dans le dossier cookies
import { AutreGroup, AutreOption, Input, InputEmail, InputPassword, InputSubmit } from "./SemiComposent/SemiComponent";  // Importation de plusieurs composants à partir de SemiComponent.js dans le dossier SemiComposent
import React, { useState } from 'react';  // Importation de React et du hook useState
import { Connexion } from "../cookies/usermanagement";  // Importation de la fonction Connexion à partir du fichier usermanagement.js dans le dossier cookies

function Login(props) {  // Définition du composant fonctionnel Login
    const [value, setvalue] = useState('');  // Déclaration d'un état local pour la valeur du champ de saisie
    const cookies = get_cookie("cookies_blog");  // Récupération des cookies nommés "cookies_blog"
    if(cookies) window.location.href = "/profile";  // Si les cookies existent, redirige vers la page de profil

    const handlePasswordChange = (event) => {  // Fonction de gestion du changement de mot de passe
        setvalue(event.target.value);  // Mise à jour de l'état local avec la nouvelle valeur du champ de saisie
    };

    const savin_login = event => {  // Fonction de gestion de la soumission du formulaire
        event.preventDefault();  // Empêche le rechargement de la page lors de la soumission du formulaire
        const email = event.target.email;  // Récupération de la valeur de l'email du formulaire
        const password = event.target.password;  // Récupération de la valeur du mot de passe du formulaire
        const remember = event.target.remember;  // Récupération de la valeur de l'option "Se souvenir de moi"

        const data = {
            email: email.value,
            password: password.value
        }

        const user = Connexion(data);  // Appel de la fonction Connexion avec les données de l'utilisateur

        alert(user.message);  // Affiche un message d'alerte avec la réponse de la connexion
        if(user.succes){  // Si la connexion est réussie
            save_cookie(user.data)  // Enregistre les données de l'utilisateur dans les cookies
            window.location.href = "/profile";  // Redirige vers la page de profil
        } else {  // Si la connexion échoue
            if(user.message === "Ce compte d'existe pas"){  // Si le message indique que le compte n'existe pas
                window.location.href = "/inscription";  // Redirige vers la page d'inscription
            }
        }
    }

    const inputRemember = {  // Définition des propriétés pour le champ "Se souvenir de moi"
        htmlFor: "remember",
        id: "remember",
        name: "remember",
        ariaDescribedby: "remember",
        type: "checkbox",
        className: "w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800",
        LabelleClassName: "text-gray-500 dark:text-gray-300",
        label: "Se souvenir de moi",
        linkPath: "/inscription",
        linkClassName: "text-sm font-medium text-primary-600 hover:underline dark:text-primary-500",
        linkTexte: "Mot de passe oublié ?",
    }

    const oterOption = {  // Définition des propriétés pour l'option "Inscription"
        question: "N'avez-vous pas de compte ?",
        path: "/inscription",
        contentText: "Inscription"
    }
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                Blog Minimaliste  
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Connectez-vous à votre compte
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="post" onSubmit={savin_login}>
                        <Input label={"Email"} type={"email"} value={value} placeholder={"Entrez votre email"} name={"email"} required={true} htmlFor={"email"} id={"email"} onChange={handlePasswordChange}/>
                        
                        <Input label={"Mot de passe"} type={"password"} value={value} placeholder={"Mot de passe"} name={"password"} required={true} htmlFor={"password"} id={"password"} onChange={handlePasswordChange}/>
                        
                        <AutreGroup inputRemember={inputRemember}/>
                        <InputSubmit textContent={"Connexion"}/>
                        <AutreOption oterOption={oterOption}/>            
                    </form>
                </div>
            </div>
        </div>
    </section>
    );
}

export default Login;
