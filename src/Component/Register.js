import { AutreOption, Input, InputSubmit } from "./SemiComposent/SemiComponent";  // Importation des composants Input, InputSubmit et AutreOption
import React, { useState } from 'react';  // Importation des hooks useState et de React
import { get_cookie } from "../cookies/cookies";  // Importation de la fonction get_cookie du fichier cookies.js dans le dossier cookies
import { Create } from "../cookies/usermanagement";  // Importation de la fonction Create du fichier usermanagement.js dans le dossier cookies

function Inscription(props) {  // Définition du composant fonctionnel Inscription
    const [value, setvalue] = useState('');  // État pour la gestion de la valeur du mot de passe
    const [photo, setPhoto] = useState('');  // État pour la gestion de la photo de profil
    const cookies = get_cookie("cookies_blog");  // Récupération des cookies nommés "cookies_blog"
    if (cookies) window.location.href = "/profile";  // Redirection vers la page de profil si les cookies existent

    // Gestion des changements dans le champ de mot de passe
    const handlePasswordChange = (event) => {
        setvalue(event.target.value);  // Mise à jour de l'état 'value' avec la valeur du champ de mot de passe
    };

    // Gestion des changements d'image
    const handleImageChange = (e) => {
        const file = e.target.files[0];  // Récupération du fichier sélectionné
        if (file) {
            const reader = new FileReader();  // Création d'un FileReader pour lire le fichier
            reader.onloadend = () => {
                setPhoto(reader.result);  // Mise à jour de l'état 'photo' avec le résultat de la lecture du fichier
            };
            reader.readAsDataURL(file);  // Lecture du fichier en tant qu'URL de données
        }
    };

    // Gestion de la soumission du formulaire
    const savin_login = event => {
        event.preventDefault();  // Empêche le comportement par défaut de soumission du formulaire

        const nom = event.target.nom;  // Récupération du champ nom
        const prenom = event.target.prenom;  // Récupération du champ prénom
        const email = event.target.email;  // Récupération du champ email
        const password = event.target.password;  // Récupération du champ mot de passe
        const passwordConfirm = event.target.passwordConfirm;  // Récupération du champ confirmation du mot de passe

        if (password.value !== passwordConfirm.value) {
            alert("Mot de passe de confirmation incorrect !");  // Affiche une erreur si les mots de passe ne correspondent pas
            return;
        }

        // Rassemblement des données du formulaire
        const data = {
            nom: nom.value,
            prenom: prenom.value,
            email: email.value,
            photo,
            password: password.value,
            passwordConfirm: passwordConfirm.value
        };

        const newUser = Create("users", data);  // Création du nouvel utilisateur via la fonction Create

        if (!newUser.succes) {
            alert(newUser.message);  // Affiche un message d'erreur si la création de l'utilisateur échoue
            if (newUser.message === "Ce compte est déjà utilisé") {
                window.location.href = "/connexion";  // Redirection vers la page de connexion si le compte est déjà utilisé
            }
        } else {
            alert(newUser.message);  // Affiche un message de succès
            window.location.href = "/connexion";  // Redirection vers la page de connexion après l'inscription réussie
        }
    };

    // Définition des options pour la redirection
    const oterOption = {
        question: "Avez-vous déjà un compte ?",  // Question affichée aux utilisateurs qui ont déjà un compte
        path: "/connexion",  // Chemin de redirection pour les utilisateurs qui ont déjà un compte
        contentText: "Connexion"  // Texte du lien de redirection
    };
    
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                Blog Minimaliste  
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Créez votre compte
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="post" onSubmit={savin_login}>

                        <Input label={"Nom"} type={"text"} value={value} placeholder={"Entrez votre nom de famille"} name={"nom"} required={true} htmlFor={"nom"} id={"nom"} onChange={handlePasswordChange}/>
                        <Input label={"Prénom"} type={"text"} value={value} placeholder={"Entrez votre prénom"} name={"prenom"} required={true} htmlFor={"prenom"} id={"prenom"} onChange={handlePasswordChange}/>

                        <Input label={"Photo de profile"} type={"file"} value={photo} placeholder={"Entrez votre photo de profile"} name={"photo"} required={true} htmlFor={"photo"} id={"photo"} onChange={handleImageChange}/>

                        <Input label={"Email"} type={"email"} value={value} placeholder={"Entrez votre email"} name={"email"} required={true} htmlFor={"email"} id={"email"} onChange={handlePasswordChange}/>
                        
                        <Input label={"Mot de passe"} type={"password"} value={value} placeholder={"Entrez un mot de passe"} name={"password"} required={true} htmlFor={"password"} id={"password"} onChange={handlePasswordChange}/>

                        <Input label={"Confirmez mot de passe"} type={"password"} value={value} placeholder={"Répétez le mot de passe"} name={"passwordConfirm"} required={true} htmlFor={"passwordConfirm"} id={"passwordConfirm"} onChange={handlePasswordChange}/>
                        
                        <InputSubmit textContent={"Sauvegarder"}/>

                        <AutreOption oterOption={oterOption}/>
                    </form>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Inscription;