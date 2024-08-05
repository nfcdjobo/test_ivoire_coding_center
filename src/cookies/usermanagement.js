// Importation de la bibliothèque js-cookie pour gérer les cookies
import Cookies from "js-cookie";

// Fonction pour trouver un élément par ID dans un modèle donné
export const FindById = (modele, id) => {
    // Vérifie si le modèle est 'blogs' ou 'users', sinon utilise les cookies
    let fetchDatas = ["blogs", "users"].includes(modele) ? localStorage[modele] : Cookies.get(modele);
    
    // Retourne null si aucune donnée n'est trouvée
    if(!fetchDatas) return null;
    
    // Parse les données JSON en objet JavaScript
    fetchDatas = JSON.parse(fetchDatas);
    
    // Trouve l'élément avec l'ID spécifié, converti en nombre pour la comparaison
    const user = fetchDatas.find(item => Number(item.id) === Number(id));
    
    // Retourne l'élément trouvé ou null si aucun élément n'est trouvé
    return user ?? null;
}

// Fonction pour trouver un élément par une propriété et une valeur spécifiques
export const FindOne = (modele, property, value) => {
    // Vérifie si le modèle est 'blogs' ou 'users', sinon utilise les cookies
    let fetchDatas = ["blogs", "users"].includes(modele) ? localStorage[modele] : Cookies.get(modele);
    
    // Retourne null si aucune donnée n'est trouvée
    if(!fetchDatas) return null;
    
    // Parse les données JSON en objet JavaScript
    fetchDatas = JSON.parse(fetchDatas);
    
    // Trouve l'élément où la propriété spécifiée a la valeur donnée
    const data = fetchDatas.find(item => item[property] === value);
    
    // Retourne l'élément trouvé ou null si aucun élément n'est trouvé
    return data;
}

// Fonction pour trouver un élément par une propriété et une valeur spécifiques
export const FindMany = (modele, property, value) => {
    // Vérifie si le modèle est 'blogs' ou 'users', sinon utilise les cookies
    let fetchDatas = ["blogs", "users"].includes(modele) ? localStorage[modele] : Cookies.get(modele);
    
    // Retourne null si aucune donnée n'est trouvée
    if(!fetchDatas) return null;
    
    // Parse les données JSON en objet JavaScript
    fetchDatas = JSON.parse(fetchDatas);
    
    // Trouve l'élément où la propriété spécifiée a la valeur donnée
    const data = fetchDatas.filter(item => item[property] === value);
    
    // Retourne l'élément trouvé ou null si aucun élément n'est trouvé
    return data;
}

// Fonction pour trouver tous les éléments d'un modèle donné
export const Find = (modele) => {
    // Vérifie si le modèle est 'blogs' ou 'users', sinon utilise les cookies
    let fetchDatas = ["blogs", "users"].includes(modele) ? localStorage[modele] : Cookies.get(modele);
    
    // Retourne un tableau vide si aucune donnée n'est trouvée ou si les données sont vides
    return !fetchDatas || !fetchDatas.length ? [] : JSON.parse(fetchDatas);
}

// Fonction pour créer ou ajouter un élément à un modèle donné
export const Create = (modele, data) => {
    // Liste des modèles supportés
    const modeles = ["users", "blogs", "commentaires", "partages", "likes", "categories"];
    
    // Retourne une erreur si le modèle n'existe pas
    if(!modeles.includes(modele)) return {status: 400, message: `Le modèle ${modele} n'existe pas`, succes: false}
    
    // Retourne null si les données sont vides
    if(!Object.keys(data).length) return null;
    
    // Ajoute les dates de création et de mise à jour
    data.created_at = new Date();
    data.updated_at = new Date();
    
    // Gestion de la création pour le modèle "users"
    if(modele === "users"){
        const { email, password, passwordConfirm } = data;
        
        // Vérifie si le mot de passe est suffisamment long
        if(password.length < 4 ) return {status: 400, succes: false, message: "Mot de passe doit contenir au moins 4 caractères"};
        
        // Vérifie si les mots de passe correspondent
        if(password !== passwordConfirm) return {status: 400, message: "Mot de passe de confirmation incorrect"};
        
        // Vérifie si un utilisateur avec le même email existe déjà
        const user = FindOne(modele, "email", email);
        if(user) return {status: 400, message: "Ce compte est déjà utilisé"};
        
        // Récupère les utilisateurs existants
        let users = Find(modele);
        
        // Si aucun utilisateur n'existe, initialise la liste avec le nouvel utilisateur
        if(!users.length){
            data.id = 1;
            data = [data];
            localStorage.setItem("users", JSON.stringify(data));
        } else {
            // Trouve le dernier ID et l'incrémente pour le nouvel utilisateur
            const userss = users.sort((a, b) => b.id - a.id);
            data.id = userss[0].id + 1;
            users.push(data);
            localStorage.setItem("users", JSON.stringify(users));
        }
        
        // Retourne une réponse de succès avec les données du nouvel utilisateur
        return {status: 200, succes: true, message: "Created successfully", data};
    
    // Gestion de la création pour le modèle "blogs"
    } else if(modele === "blogs"){
        // Récupère les blogs existants
        let collection = localStorage[modele];
        
        // Si aucun blog n'existe, initialise la liste avec le nouveau blog
        if(!collection || !JSON.parse(collection).length){
            data.id = 1;
            const collect = [data];
            localStorage.setItem("blogs", JSON.stringify(collect));
            return {status: 200, succes: true, message: "Created successfully", data};
        } else {
            // Trouve le dernier ID et l'incrémente pour le nouveau blog
            const blogss = JSON.parse(collection).sort((a, b) => b.id - a.id);
            data.id = blogss[0].id + 1;
            blogss.push(data);
            localStorage.setItem("blogs", JSON.stringify(blogss));
            return {status: 200, succes: true, message: "Created successfully", data};
        }
    
    // Gestion des autres modèles
    } else {
        let collection = Find(modele);
        
        // Si aucun élément n'existe, initialise la liste avec le nouvel élément
        if(!collection.length){
            data.id = 1;
            const collect = [data];
            Cookies.set(modele, JSON.stringify(collect), { expires: 90, path: '/'});
            return {status: 200, succes: true, message: "Created successfully", data};
        } else {
            // Trouve le dernier ID et l'incrémente pour le nouvel élément
            const blogss = collection.sort((a, b) => b.id - a.id);
            data.id = blogss[0].id + 1;
            collection.push(data);
            Cookies.set(modele, JSON.stringify(collection), { expires: 90, path: '/'});
            return {status: 200, succes: true, message: "Created successfully", data};
        }
    }
}

// Fonction pour sauvegarder une catégorie si elle n'existe pas déjà
export const SaveCategorie = (modele, data) => {
    // Récupère les données du modèle spécifié
    const fetchDatas = Find(modele);
    
    // Vérifie si une catégorie avec le même libellé existe déjà
    const find = fetchDatas.find(item => item.libelle == data.libelle)
    
    // Crée une nouvelle catégorie si elle n'existe pas
    if(!find){
        Create(modele, data);
    }
};

// Fonction pour gérer la connexion des utilisateurs
export const Connexion = (data) => {
    // Retourne null si les données sont vides
    if(!Object.keys(data).length) return null;
    
    const { email, password } = data;
    
    // Récupère les utilisateurs existants
    const users = Find("users");
    
    // Vérifie si l'utilisateur avec l'email donné existe
    if(!users.find(item => item.email === email)) return {status: 404, succes: false, message: "Ce compte n'existe pas"};
    
    // Trouve l'utilisateur avec l'email et le mot de passe donnés
    const user = users.find(item => item.email === email && item.password === password);
    
    // Retourne une réponse de succès ou d'échec de la connexion
    return user ? {status: 200, succes: true, message: "Connexion effectuée avec succès", data: user} : {status: 400, succes: false, message: "Email ou mot de passe incorrect"};
}

// Fonction pour mettre à jour un élément par ID dans un modèle donné
export const FindOneAndUpdate = (modele, data, reference) => {
    // Liste des modèles supportés
    const modeles = ["users", "blogs", "commentaires", "partages", "likes", "categories"];
    
    // Retourne une erreur si le modèle n'existe pas
    if(!modeles.includes(modele)) return {status: 400, message: `Le modèle ${modele} n'existe pas`, succes: false}
    
    // Retourne une erreur si les données sont invalides
    if(!Object.keys(data).length) return {status: 400, message: `Donnée(s) invalide(s)`, succes: false};

    // Récupère l'élément à modifier par ID
    const getDocument = FindById(modele, reference);
    
    // Retourne une erreur si l'élément à modifier n'existe pas
    if(!getDocument) return {status: 401, succes: false, message: "L'élément à modifier n'existe pas !"};
    
    // Récupère les données du modèle spécifié
    const fetchDatas = Find(modele);
    
    // Trouve l'index de l'élément à modifier
    const index = fetchDatas.findIndex(item => item.id === getDocument.id);
    
    // Met à jour les données avec la date de modification
    data.updated_at = new Date();
    delete data.id;
    data.id = getDocument.id;
    
    // Remplace l'élément à modifier dans le tableau
    fetchDatas[index] = data;
    
    // Enregistre les données mises à jour dans localStorage ou les cookies selon le modèle
    const response = modele === "blogs" ? localStorage.setItem(modele, JSON.stringify(fetchDatas)) : Cookies.set(modele, JSON.stringify(fetchDatas));
    
    // Retourne une réponse de succès de la mise à jour
    return {status: 200, succes: true, message: "Mise à jour effectuée avec succès."};
}

// Fonction pour formater une date en texte lisible
export const FormatDate = date => {
    // Noms des mois en français
    const monthNames = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
    
    // Extrait le jour, le mois et l'année de la date
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    // Retourne la date formatée en texte
    return `${day} ${month} ${year}`;
}

export const CountComments = (modele, property, poste) => {
    const comments = FindOne(modele, "blog", )
}
