
import { get_cookie, save_cookie } from "../cookies/cookies";
import { AutreGroup, AutreOption, Input, InputEmail, InputPassword, InputSubmit } from "./SemiComposent/SemiComponent";
import React, { useState } from 'react';
import { Connexion } from "../cookies/usermanagement";

function Login(props) {
    const [value, setvalue] = useState('');
    const cookies = get_cookie("cookies_blog");
    if(cookies) window.location.href = "/profile";

    const handlePasswordChange = (event) => {
        setvalue(event.target.value);
    };

    const savin_login=event=>{
        event.preventDefault();
        const email = event.target.email;
        const password = event.target.password;
        const remember = event.target.remember;

        const data = {
            email: email.value,
            password: password.value
        }

        const user = Connexion(data);

        alert(user.message);
        if(user.succes){
            save_cookie(user.data)
            window.location.href = "/profile";
        }else{
            if(user.message === "Ce compte d'existe pas"){
                window.location.href = "/inscription";
            }
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
        linkPath: "/inscription",
        linkClassName: "text-sm font-medium text-primary-600 hover:underline dark:text-primary-500",
        linkTexte: "Mot de passe oublié ?",
    }

    const oterOption = {
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
