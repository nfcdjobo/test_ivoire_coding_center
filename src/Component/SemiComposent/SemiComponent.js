
export const  Input = (props) => {
    return (
        <div>
            <label htmlFor={props.htmlFor} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{props.label}</label>
            <input type={props.type} required={props.required} name={props.name} id={props.id} placeholder={props.placeholder} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={props.onChange}/>
        </div>
    );
}

export const  InputEmail = (props) => {
    return (
        <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre email</label>
            <input type="email" required name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
    );
}

export const  InputPassword = (props) => {
    return (
        <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre Mot de passe</label>
            <input type="password" required name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
    );
}

export const  InputSubmit = (props) => {
    const {textContent} = props;
    return (
        <button type="submit" className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-6">{textContent}</button>
    );
}

export const  AutreOption = (props) => {
    const {oterOption} = props;
    return (
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            {oterOption.question} <a href={oterOption.path} className="font-medium text-primary-600 hover:underline dark:text-primary-500">{oterOption.contentText}</a>
        </p>
    );
}

export const  AutreGroup = (props) => {
    const {inputRemember} = props;
    return (
        <>
        { inputRemember ? (
                <div className="flex items-center justify-between">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            {inputRemember.htmlFor ? <input id={inputRemember.id} name={inputRemember.name} aria-describedby={inputRemember.ariaDescribedby} type={inputRemember.type} className={inputRemember.className}/> : ""}
                        </div>
                        <div className="ml-3 text-sm">
                            { inputRemember.htmlFor ? <label htmlFor={inputRemember.htmlFor} className={inputRemember.LabelleClassName}>{inputRemember.label}</label> : ""}
                        </div>
                    </div>
                    <a href={inputRemember.linkPath} className={inputRemember.linkClassName}>{inputRemember.linkTexte}</a>
                </div>
            ) : ""
        }
        {/* // <div className="flex items-center justify-between">
        //     <div className="flex items-start">
        //         <div className="flex items-center h-5">
        //             {inputRemember && inputRemember.htmlFor ? <input id={inputRemember.id} aria-describedby={inputRemember.ariaDescribedby} type={inputRemember.type} className={inputRemember.className}/> : ""}
        //         </div>
        //         <div className="ml-3 text-sm">
        //             {inputRemember && inputRemember.htmlFor ? <label htmlFor={inputRemember.htmlFor} className={inputRemember.LabelleClassName}>{inputRemember.label}</label> : ""}
        //         </div>
        //     </div>
        //     {inputRemember ? <a href={inputRemember.linkPath} className={inputRemember.linkClassName}>{inputRemember.linkTexte}</a> : ""}
        // </div> */}
        </>
    );
}