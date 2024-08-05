// Fonction pour sauvegarder les données dans le localStorage sous la clé "cookies_blog"
// Les données sont d'abord converties en chaîne JSON avant d'être stockées
export const save_cookie = data => {
    localStorage.setItem("cookies_blog", JSON.stringify(data));
};

// Fonction pour récupérer les données du localStorage en utilisant le nom de la clé
// Si la clé n'existe pas, la fonction retourne false
export const get_cookie = cookie_name => {
    return localStorage.getItem(cookie_name) ? JSON.parse(localStorage.getItem(cookie_name)) : false;
};

// Fonction pour supprimer une entrée spécifique du localStorage en utilisant le nom de la clé
// Après suppression, la page est rechargée
export const destrory = cle => {
    localStorage.removeItem(cle);
    window.location.reload();
};
