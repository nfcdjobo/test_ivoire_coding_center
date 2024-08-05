// Importation de la bibliothèque js-cookie pour gérer les cookies
import Cookies from "js-cookie";

// Fonction pour trouver un élément par ID dans un modèle donné
export const FindById = (modele, id) => {
    // Récupère les données du cookie correspondant au modèle
    let fetchDatas = Cookies.get(modele);
    
    // Si aucune donnée n'est trouvée, retourne null
    if(!fetchDatas) return null;
    
    // Parse les données JSON en objet JavaScript
    fetchDatas = JSON.parse(fetchDatas);
    
    // Trouve l'élément avec l'ID spécifié
    const user = fetchDatas.find(item => item.id === id);
    
    // Retourne l'élément trouvé ou null si aucun élément n'est trouvé
    return user ?? null;
}

// Fonction pour trouver un élément par une propriété et une valeur spécifiques
export const FindOne = (modele, property, value) => {
    // Récupère les données du cookie correspondant au modèle
    let fetchDatas = Cookies.get(modele);
    
    // Si aucune donnée n'est trouvée, retourne null
    if(!fetchDatas) return null;
    
    // Parse les données JSON en objet JavaScript
    fetchDatas = JSON.parse(fetchDatas);
    
    // Trouve l'élément où la propriété spécifiée a la valeur donnée
    const data = fetchDatas.find(item => item[property] === value);
    
    // Retourne l'élément trouvé ou null si aucun élément n'est trouvé
    return data ?? null;
}

// Fonction pour trouver tous les éléments d'un modèle donné
export const Find = (modele) => {
    // Récupère les données du cookie correspondant au modèle
    let fetchDatas = Cookies.get(modele);
    
    // Si aucune donnée n'est trouvée, retourne null
    if(!fetchDatas) return null;
    
    // Parse les données JSON en objet JavaScript et retourne
    return JSON.parse(fetchDatas);
}

// Fonction pour créer ou ajouter un élément à un modèle donné
export const Create = (modele, data) => {
    // Liste des modèles supportés
    const modeles = ["users", "blogs", "commentaires"];
    
    // Si les données sont vides, retourne null
    if(!Object.keys(data).length) return null;
    
    // Gestion de la création pour le modèle "users"
    if(modele === "users"){
        const { email, password, passwordConfirm } = data;
        
        // Vérifie si le mot de passe est suffisamment long
        if(password.length < 4 ) return {status: 400, succes: false, message: "Mot de passe doit contenir au moins 4 caractères"};
        
        // Vérifie si les mots de passe correspondent
        if(password !== passwordConfirm) return {status: 400, message: "Mot de passe de confirmation incorrect"};
        
        // Vérifie si un utilisateur avec le même email existe déjà
        const user = FindOne("users", "email", email);
        if(user) return {status: 400, message: "Ce compte est déjà utilisé"};
        
        // Récupère les utilisateurs existants
        let users = Find(modele);
        
        // Ajoute les dates de création et de mise à jour
        data.created_at = new Date();
        data.updated_at = new Date();
        
        // Si aucun utilisateur n'existe, initialise la liste avec le nouvel utilisateur
        if(!users){
            data.id = 1;
            data = [data];
            Cookies.set("users", JSON.stringify(data), { expires: 90, path: '/'});
        } else {
            // Trouve le dernier ID et l'incrémente pour le nouvel utilisateur
            const userss = users.sort((a, b) => b.id - a.id)[0].id + 1;
            data.id = userss;
            users.push(data);
            Cookies.set("users", JSON.stringify(users), { expires: 90, path: '/'});
        }
        
        // Retourne une réponse de succès avec les données du nouvel utilisateur
        return {status: 200, succes: true, message: "Created successfully", data};
    
    // Gestion de la création pour le modèle "blogs"
    } else if(modele === "blogs"){
        // Récupère les blogs existants
        let blogs = Find(modele);
        
        // Ajoute les dates de création et de mise à jour
        data.created_at = new Date();
        data.updated_at = new Date();
        
        // Si aucun blog n'existe, initialise la liste avec le nouveau blog
        if(!blogs){
            data.id = 1;
            data = [data];
            Cookies.set(modele, JSON.stringify(data), { expires: 90, path: '/'});
        } else {
            // Trouve le dernier ID et l'incrémente pour le nouveau blog
            const blogss = blogs.sort((a, b) => b.id - a.id);
            data.id = blogss[0].id + 1;
            blogs.push(data);
            Cookies.set(modele, JSON.stringify(blogs), { expires: 90, path: '/'});
        }
        
        // Retourne une réponse de succès avec les données du nouveau blog
        return {status: 200, succes: true, message: "Created successfully", data};
    }
}
