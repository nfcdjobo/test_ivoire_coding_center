// Composant Input : Champ de saisie générique
import React, { useState } from "react";
import { get_cookie } from "../../cookies/cookies";
import { Create } from "../../cookies/usermanagement";

export const Input = (props) => {
  return (
    <div>
      {/* Label du champ de saisie */}
      <label
        htmlFor={props.htmlFor}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.label}
      </label>
      {/* Champ de saisie */}
      <input
        type={props.type} // Type de l'input (text, number, etc.)
        required={props.required} // Indique si le champ est requis
        name={props.name} // Nom du champ
        id={props.id} // ID du champ
        placeholder={props.placeholder} // Texte d'exemple dans le champ
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={props.onChange} // Fonction de gestion des changements
      />
    </div>
  );
};

// Composant InputEmail : Champ de saisie pour l'email
export const InputEmail = (props) => {
  return (
    <div>
      {/* Label du champ email */}
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Votre email
      </label>
      {/* Champ de saisie pour l'email */}
      <input
        type="email" // Type de l'input (email)
        required // Indique que le champ est requis
        name="email" // Nom du champ
        id="email" // ID du champ
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
};

// Composant InputPassword : Champ de saisie pour le mot de passe
export const InputPassword = (props) => {
  return (
    <div>
      {/* Label du champ mot de passe */}
      <label
        htmlFor="password"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Votre Mot de passe
      </label>
      {/* Champ de saisie pour le mot de passe */}
      <input
        type="password" // Type de l'input (mot de passe)
        required // Indique que le champ est requis
        name="password" // Nom du champ
        id="password" // ID du champ
        placeholder="••••••••" // Texte d'exemple dans le champ
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
};

// Composant InputSubmit : Bouton de soumission du formulaire
export const InputSubmit = (props) => {
  const { textContent } = props; // Texte du bouton
  return (
    <button
      type="submit" // Type du bouton (soumission du formulaire)
      className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-6"
    >
      {textContent} {/* Texte affiché sur le bouton */}
    </button>
  );
};

// Composant AutreOption : Option alternative pour l'inscription ou la connexion
export const AutreOption = (props) => {
  const { oterOption } = props; // Options pour l'autre option (question, chemin, texte)
  return (
    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
      {oterOption.question} {/* Question ou message */}
      <a
        href={oterOption.path}
        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
      >
        {oterOption.contentText} {/* Texte du lien */}
      </a>
    </p>
  );
};

// Composant AutreGroup : Groupe d'options supplémentaires avec un lien
export const AutreGroup = (props) => {
  const { inputRemember } = props; // Options pour le groupe d'options
  return (
    <>
      {inputRemember ? (
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              {/* Champ de saisie si inputRemember est défini */}
              {inputRemember.htmlFor ? (
                <input
                  id={inputRemember.id}
                  name={inputRemember.name}
                  aria-describedby={inputRemember.ariaDescribedby}
                  type={inputRemember.type}
                  className={inputRemember.className}
                />
              ) : (
                ""
              )}
            </div>
            <div className="ml-3 text-sm">
              {/* Label pour le champ de saisie */}
              {inputRemember.htmlFor ? (
                <label
                  htmlFor={inputRemember.htmlFor}
                  className={inputRemember.LabelleClassName}
                >
                  {inputRemember.label}
                </label>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* Lien supplémentaire */}
          <a
            href={inputRemember.linkPath}
            className={inputRemember.linkClassName}
          >
            {inputRemember.linkTexte}
          </a>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

// Composant Titre : Affichage d'un titre
export const Titre = (props) => {
  const { titre } = props; // Texte du titre
  return (
    <div className="mx-auto mt-9 max-w-8xl">
      <div class="flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-black dark:text-white">
            {titre} {/* Texte du titre */}
          </h1>
        </div>
      </div>
    </div>
  );
};

export const Modal = ({ isOpen, onClose, id }) => {
  const cookie = get_cookie("cookies_blog");
  const [formData, setFormData] = useState({
    blog: id,
    auteur: cookie.id,
    commentaire: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    const newCommentaire = Create("commentaires", formData);
    alert(newCommentaire.message);
    if (newCommentaire.succes) {
      onClose(); // Close the modal after submission
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-md w-full relative">
        <h2 className="text-lg font-bold mb-4">
          Commentaire pour l'article {id}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="commentaire"
              className="block text-sm font-medium text-gray-700"
            >
              Saisir
            </label>
            <textarea
              id="commentaire"
              name="commentaire"
              value={formData.commentaire}
              onChange={handleChange}
              placeholder="Entrez votre commentaire"
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-1 py-1 rounded shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
            >
              Envoyer
            </button>
            <button
              type="button"
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center"
            >
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="blue"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </form>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
