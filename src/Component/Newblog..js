import React, { useState } from "react";
import { CKEditor } from "ckeditor4-react";
import Footer from "./Footer";
import Header from "./Header";
import { get_cookie } from "../cookies/cookies";
import { Create, Find } from "../cookies/usermanagement";
import { useNavigate } from "react-router-dom";



function Newblog(props) {
  const cookies = get_cookie("cookies_blog");
  if (!cookies) window.location.href = "/connexion";
  const natigate = useNavigate();

  // State to manage form data
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [contenu, setContenu] = useState("");
  const [action, setAction] = useState(1);
  const [categorie, setCategories] = useState("");
  const [error, setError] = useState("");
  const [couverture, setCouverture] = useState("");

  const categories = Find("categories");

  // Handle CKEditor changes
  const handleEditorChange = (event) => {
    setContenu(event.editor.getData());
  };

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

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    if (contenu.trim() === "") {
      setError("Le contenu du blog est requis.");
      return;
    }

    // Gather form data
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


      const newBlog = Create("blogs", formData);

      // Optionally clear the form fields or show a success message
      setTitre("");
      setDescription("");
      setContenu("");
      setCategories("");
      setCouverture("");
      setAction(1);
      if(Number(newBlog.data.action)){
        alert("Blog créé et publié avec succès");
        natigate("/mes-blogs");
      }else{
        alert("Blog créé et en attente de publication");
        natigate("/blog-en-attend")
      }
  };

  return (
    <>
      <Header />
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
