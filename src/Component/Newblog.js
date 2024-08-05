import React, { useState } from "react";  // Importation des hooks useState et des éléments de React
import { CKEditor } from "ckeditor4-react";  // Importation du composant CKEditor pour l'édition de texte riche
import Footer from "./Footer";  // Importation du composant Footer
import Header from "./Header";  // Importation du composant Header
import { get_cookie } from "../cookies/cookies";  // Importation de la fonction get_cookie du fichier cookies.js dans le dossier cookies
import { Create, Find } from "../cookies/usermanagement";  // Importation des fonctions Create et Find du fichier usermanagement.js dans le dossier cookies
import { useNavigate } from "react-router-dom";  // Importation du hook useNavigate pour la navigation
import { Titre } from "./SemiComposent/SemiComponent";  // Importation du composant Titre de SemiComponent.js dans le dossier SemiComposent

function Newblog(props) {  // Définition du composant fonctionnel Newblog
  const cookies = get_cookie("cookies_blog");  // Récupération des cookies nommés "cookies_blog"
  if (!cookies) window.location.href = "/connexion";  // Redirection vers la page de connexion si les cookies n'existent pas
  const navigate = useNavigate();  // Initialisation du hook useNavigate pour la navigation

  // State pour gérer les données du formulaire
  const [titre, setTitre] = useState("");  // État pour le titre du blog
  const [description, setDescription] = useState("");  // État pour la description du blog
  const [contenu, setContenu] = useState("");  // État pour le contenu du blog
  const [action, setAction] = useState(1);  // État pour la publication (1 = publié, 0 = en attente)
  const [categorie, setCategories] = useState("");  // État pour la catégorie du blog
  const [error, setError] = useState("");  // État pour les messages d'erreur
  const [couverture, setCouverture] = useState("");  // État pour l'image de couverture du blog

  const categories = Find("categories");  // Récupération des catégories via la fonction Find

  // Gestion des changements dans CKEditor
  const handleEditorChange = (event) => {
    setContenu(event.editor.getData());  // Mise à jour de l'état 'contenu' avec les données de l'éditeur
  };

  // Gestion des changements d'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];  // Récupération du fichier sélectionné
    if (file) {
      const reader = new FileReader();  // Création d'un FileReader pour lire le fichier
      reader.onloadend = () => {
        setCouverture(reader.result);  // Mise à jour de l'état 'couverture' avec le résultat de la lecture du fichier
      };
      reader.readAsDataURL(file);  // Lecture du fichier en tant qu'URL de données
    }
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault();  // Empêche le comportement par défaut de soumission du formulaire

    if (contenu.trim() === "") {
      setError("Le contenu du blog est requis.");  // Affiche une erreur si le contenu est vide
      return;
    }

    // Rassemblement des données du formulaire
    const formData = {
      titre,
      description,
      contenu,
      action,
      categorie,
      user_id: cookies.id,  // Utilisation de l'ID de l'utilisateur à partir des cookies
      couverture,
      date_publication: action ? new Date() : null  // Définition de la date de publication en fonction de l'action
    };

    const newBlog = Create("blogs", formData);  // Création du nouveau blog via la fonction Create

    // Réinitialisation des champs du formulaire ou affichage d'un message de succès
    setTitre("");
    setDescription("");
    setContenu("");
    setCategories("");
    setCouverture("");
    setAction(1);
    if (Number(newBlog.data.action)) {
      alert("Blog créé et publié avec succès");  // Affiche un message de succès si le blog est publié
      navigate("/mes-blogs");  // Redirection vers la page des blogs
    } else {
      alert("Blog créé et en attente de publication");  // Affiche un message si le blog est en attente de publication
      navigate("/blog-en-attend");  // Redirection vers la page des blogs en attente
    }
  };

  return (
    <>
      <Header />
      <Titre titre="Rédaction de nouveau blog"/>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="text-xl text-gray-600">
                    Titre <span className="text-red-500">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    className="border-2 border-gray-300 p-2 w-full"
                    name="titre"
                    id="titre"
                    placeholder="Entrez le titre"
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="text-xl text-gray-600">Description</label>
                  <br />
                  <input
                    type="text"
                    className="border-2 border-gray-300 p-2 w-full"
                    name="description"
                    id="description"
                    placeholder="(Optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="text-xl text-gray-600">Image de couverture <span className="text-red-500">*</span></label>
                  <br />
                  <input
                    type="file"
                    className="border-2 border-gray-300 p-2 w-full"
                    name="couverture"
                    id="couverture"
                    onChange={handleImageChange}
                    required
                  />
                  {couverture && (
                    <div className="mt-4">
                      <img src={couverture} alt="Preview" className="max-w-full h-auto" />
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="text-xl text-gray-600">Catégorie <span className="text-red-500">*</span></label>
                  <br />
                  <select
                    className="border-2 border-gray-300 p-2 w-full"
                    required
                    name="categorie"
                    
                    onChange={(e) => setCategories(e.target.value)}
                  >
                    <option  value="" selected disabled>Choisir une catégorie</option>
                    {categories.sort((a, b) => a.libelle.localeCompare(b.libelle)).map((cat, index) => (
                      <option key={index} value={cat.id}>{cat.libelle}</option>
                    ))}
                  </select>
                </div>


                <div className="mb-8">
                  <label className="text-xl text-gray-600">
                    Contenu <span className="text-red-500">*</span>
                  </label>
                  <br />
                  <CKEditor
                    data={contenu}
                    onChange={handleEditorChange}
                    name="contenu"
                  />

                  {error && (
                    <div className="text-red-500 mt-2">{error}</div>
                  )}
                </div>
                <div className="flex p-1">
                  <select
                    className="border-2 border-gray-300 border-r p-2"
                    name="action"
                    value={action}
                    onChange={(e) => setAction(Number(e.target.value))}
                  >
                    <option value="1">Sauvegarder et publier</option>
                    <option value="0">Sauvegarder dans brouillon</option>
                  </select>
                  <button
                    type="submit"
                    className="p-3 bg-blue-500 text-white hover:bg-blue-400"
                  >
                    Soumettre
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Newblog;
