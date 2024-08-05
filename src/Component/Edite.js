import React, { useState } from "react";  // Importation de React et du hook useState
import { CKEditor } from "ckeditor4-react";  // Importation du composant CKEditor
import Footer from "./Footer";  // Importation du composant Footer
import Header from "./Header";  // Importation du composant Header
import { get_cookie } from "../cookies/cookies";  // Importation de la fonction get_cookie à partir du fichier cookies.js dans le dossier cookies
import { Create, Find, FindById, FindOne, FindOneAndUpdate } from "../cookies/usermanagement";  // Importation des fonctions de gestion utilisateur
import { useLocation, useNavigate } from "react-router-dom";  // Importation des hooks useLocation et useNavigate de react-router-dom
import { Titre } from "./SemiComposent/SemiComponent";  // Importation du composant Titre à partir de SemiComponent.js dans le dossier SemiComposent

const useQuery = () => {
    return new URLSearchParams(useLocation().search);  // Définition d'un hook personnalisé pour récupérer les paramètres de l'URL
};

function Edite(props) {  // Définition du composant fonctionnel Edite
  const cookies = get_cookie("cookies_blog");  // Récupération des cookies nommés "cookies_blog"
  if (!cookies) window.location.href = "/connexion";  // Si les cookies n'existent pas, redirige vers la page de connexion

  const navigate = useNavigate();  // Initialisation du hook useNavigate pour la navigation
  const reference = Number(useQuery().get('poste'));  // Récupération du paramètre 'poste' de l'URL et conversion en nombre

  const blog = FindById("blogs", reference);  // Récupération du blog correspondant à l'ID de référence

  // Déclaration des états locaux pour les différents champs du blog
  const [titre, setTitre] = useState(blog.titre);
  const [description, setDescription] = useState(blog.description);
  const [contenu, setContenu] = useState(blog.contenu);
  const [action, setAction] = useState(Number(blog.action) ? 1 : 0);
  const [categorie, setCategories] = useState(blog.categorie);
  const [error, setError] = useState("");
  const [couverture, setCouverture] = useState(blog.couverture);

  const categories = Find("categories");  // Récupération des catégories disponibles

  // Fonction pour gérer les changements dans le CKEditor
  const handleEditorChange = (event) => {
    setContenu(event.editor.getData());
  };

  // Fonction pour gérer les changements d'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCouverture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault();  // Empêche la soumission par défaut du formulaire

    if (contenu.trim() === "") {  // Vérifie si le contenu du blog est vide
      setError("Le contenu du blog est requis.");
      return;
    }

    // Collecte les données du formulaire
    const formData = {
      titre,
      description,
      contenu,
      action,
      categorie,
      user_id: cookies.id,
      couverture,
      date_publication: action ? new Date() : null
    };

    const newBlog = FindOneAndUpdate("blogs", formData, reference);  // Met à jour le blog existant

    // Réinitialise les champs du formulaire
    setTitre("");
    setDescription("");
    setContenu("");
    setCategories("");
    setCouverture("");
    setAction(1);

    alert(newBlog.message);  // Affiche un message d'alerte avec la réponse du serveur

    navigate('/mes-blogs');  // Redirige vers la page 'mes-blogs'
    if (Number(newBlog.data.action)) {  // Vérifie si le blog est publié
      alert("Blog créé et publié avec succès");
      navigate("/mes-blogs");  // Redirige vers la page 'mes-blogs'
    } else {
      alert("Blog créé et en attente de publication");
      navigate("/blog-en-attend");  // Redirige vers la page 'blog-en-attend'
    }
  };

  return (
    <>
      <Header />
      
      <Titre titre="Mise à jour de Blog"/>
      
                        


      <div className="">
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
                  <label className="text-xl text-gray-600">Image de couverture</label>
                  <br />
                  <input
                    type="file"
                    className="border-2 border-gray-300 p-2 w-full"
                    name="couverture"
                    id="couverture"
                    onChange={handleImageChange}
                    
                  />
                  { (
                    <div className="mt-4">
                      <img src={couverture || blog.couverture} alt="Preview" className="max-w-full h-auto" />
                    </div>
                  )  }
                </div>

                <div className="mb-4">
                  <label className="text-xl text-gray-600">Catégorie <span className="text-red-500">*</span></label>
                  <br />
                  <select className="border-2 border-gray-300 p-2 w-full" required name="categorie" onChange={(e) => setCategories(e.target.value)}>
                    {categories.sort((a, b) => a.libelle.localeCompare(b.libelle)).map((cat, index) => (
                      <option key={index} selected={cat.id === blog.id} value={cat.id}>{cat.libelle}</option>
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
                    initData={contenu}
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
                    <option value="1" selected={Number(action) === 1}>Sauvegarder et publier</option>
                    <option value="0" selected={Number(action) === 0}>Sauvegarder dans brouillon</option>
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

export default Edite;
