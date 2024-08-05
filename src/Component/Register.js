import { AutreGroup, AutreOption, Input, InputSubmit } from "./SemiComposent/SemiComponent";
import React, { useState } from 'react';
import { get_cookie, save_cookie } from "../cookies/cookies";
import { Create } from "../cookies/usermanagement";



function Inscription(props) {
    const [value, setvalue] = useState('');
    const [photo, setPhoto] = useState('');
    const cookies = get_cookie("cookies_blog");
    if(cookies) window.location.href = "/profile";


    const handlePasswordChange = (event) => {
        setvalue(event.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPhoto(reader.result);
          };
          
          reader.readAsDataURL(file);
        }
      };

    const savin_login = event => {
        event.preventDefault();
        const nom=event.target.nom;
        const prenom = event.target.prenom;
        const email = event.target.email;
        
        const password = event.target.password;
        const passwordConfirm = event.target.passwordConfirm;
        if(password.value !== passwordConfirm.value){
            alert("Mot de passe de confirmation incorrect !");
            return;
        }

        const data = {
            nom: nom.value,
            prenom: prenom.value,
            email: email.value,
            photo,
            password: password.value,
            passwordConfirm: passwordConfirm.value
        }

        const newUser = Create("users", data);

        if(!newUser.succes){
            alert(newUser.message)
            if(newUser.message === "Ce compte est déjà utilisé"){
                window.location.href = "/connexion";
            }
            
        }else{
            alert(newUser.message);
            window.location.href = "/connexion";
        }
    }

    const inputRemember = {
        htmlFor: "remember",
        id: "remember",
        name: "remember",
        ariaDescribedby: "remember",
        type: "checkbox",
        className: "w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800",
        LabelleClassName: "text-gray-500 dark:text-gray-300",
        label: "Se souvenir de moi",
        linkPath: "/connexion",
        linkClassName: "text-sm font-medium text-primary-600 hover:underline dark:text-primary-500",
        linkTexte: "Mot de passe oublié ?",
    }

    const oterOption = {
        question: "Avez-vous déjà un compte ?",
        path: "/connexion",
        contentText: "Connexion"
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