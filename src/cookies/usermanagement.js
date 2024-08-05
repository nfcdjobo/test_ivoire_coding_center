import Cookies from "js-cookie";
import { get_cookie } from "./cookies";

export const FindById = (modele, id) => {
    let fetchDatas = ["blogs", "users"].includes(modele) ? localStorage[modele] : Cookies.get(modele);
    
    if(!fetchDatas) return null;
    fetchDatas = JSON.parse(fetchDatas);
    const user =  fetchDatas.find(item => Number(item.id) === Number(id));
    return user ?? null;
}

export const FindOne = (modele, property, value) => {
    let fetchDatas = ["blogs", "users"].includes(modele) ? localStorage[modele] : Cookies.get(modele);
    if(!fetchDatas) return null;
    fetchDatas = JSON.parse(fetchDatas);
    const data =  fetchDatas.find(item => item[property] === value);
    return data ?? null;
}

export const Find = (modele) => {
    let fetchDatas = ["blogs", "users"].includes(modele) ? localStorage[modele] : Cookies.get(modele);
    return !fetchDatas || !fetchDatas.length ? [] : JSON.parse(fetchDatas);
}

export const Create = (modele, data) => {
    const modeles = ["users", "blogs", "commentaires", "partages", "likes", "categories"];
    if(!modeles.includes(modele)) return {status: 400, message: `Le modèle ${modele} n'existe pas`, succes: false}
    if(!Object.keys(data).length) return null;
    data.created_at = new Date();
    data.updated_at = new Date();
    if(modele === "users"){
        const {email, password, passwordConfirm} = data;
        if(password.length < 4 ) return {status: 400, succes: false, message: "Mot de passe doit contenir au moin 4 caractères"};
        if(password !== passwordConfirm) return {status: 400, message: "Mot de passe de confirmation incorrect"};
        const user = FindOne(modele, "email", email);
        if(user) return {status: 400, message: "Ce compte est déjà utilisé"};
        let users = Find(modele);
        
        if(!users.length){
            data.id = 1;
            data = [data];
            localStorage.setItem("users", JSON.stringify(data));
            // Cookies.set(modele, JSON.stringify(data), { expires: 90, path: '/'});
            
        }else{
            const userss = users.sort((a, b) => b.id - a.id);
            data.id = userss[0].id + 1;
            users.push(data);
            // Cookies.set(modele, JSON.stringify(users), { expires: 90, path: '/'});
            localStorage.setItem("users", JSON.stringify(users));
        }
        
        return {status: 200, succes: true, message: "Created succefull", data};
        
    }else if(modele === "blogs"){
        let collection = localStorage[modele];
        
        if(!collection || !JSON.parse(collection).length){
            data.id = 1;
            const collect = [data];
            localStorage.setItem("blogs", JSON.stringify(collect));
            return {status: 200, succes: true, message: "Created succefull", data};
        }else{
            const blogss =JSON.parse(collection).sort((a, b) => b.id - a.id);
            data.id = blogss[0].id + 1
            blogss.push(data);
            localStorage.setItem("blogs", JSON.stringify(blogss));
            return {status: 200, succes: true, message: "Created succefull", data};
        }
    }else{
        let collection = Find(modele);
        if(!collection.length){
            data.id = 1;
            const collect = [data];
            Cookies.set(modele, JSON.stringify(collect), { expires: 90, path: '/'});
            return {status: 200, succes: true, message: "Created succefull", data};
        }else{
            const blogss = collection.sort((a, b) => b.id - a.id);
            data.id = blogss[0].id + 1
            collection.push(data);
            Cookies.set(modele, JSON.stringify(collection), { expires: 90, path: '/'});
            return {status: 200, succes: true, message: "Created succefull", data};
        }
        
    }
}


export const SaveCategorie = (modele, data) => {
    const fetchDatas = Find(modele);
    const find = fetchDatas.find(item => item.libelle == data.libelle)
    if(!find){
        Create(modele, data);
    }
};

export const Connexion = (data) => {
    if(!Object.keys(data).length) return null;
    const {email, password} = data;
    const users = Find("users");
    if(!users.find(item => item.email === email)) return {status: 404, succes: false, message: "Ce compte d'existe pas"};
    const user = users.find(item => item.email === email && item.password === password);
    return user ? {status: 200, succes: true, message: "Connexion effectuée avec succès", data: user} : {status: 400, succes: false, message: "Email ou mot de passe incorrets"};
}


export const FindOneAndUpdate = (modele, data, reference) => {
    const modeles = ["users", "blogs", "commentaires", "partages", "likes", "categories"];
    if(!modeles.includes(modele)) return {status: 400, message: `Le modèle ${modele} n'existe pas`, succes: false}
    if(!Object.keys(data).length) return {status: 400, message: `Donnée(s) invalide(s)`, succes: false};

    const getDocument = FindById(modele, reference);
    if(!getDocument) return {status: 401, succes: false, message: "L'élément à modifier n'existe pas !"};
    const fetchDatas = Find(modele);
    const index = fetchDatas.findIndex(item => item.id === getDocument.id);
    data.updated_at = new Date();
    delete data.id;
    data.id = getDocument.id;
    fetchDatas[index] = data;
    const response =  modele === "blogs" ? localStorage.setItem(modele, JSON.stringify(fetchDatas)) : Cookies.set(modele, JSON.stringify(fetchDatas));
    return {status: 200, succes: true, message: "Mise à jour effectuée avec succès."};

}



  
export const FormatDate = date => {
    const monthNames = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
      ];
    
      const day = date.getDate();
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
    
      return `${day} ${month} ${year}`;
}
  
