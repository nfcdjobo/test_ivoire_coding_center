import Cookies from "js-cookie";

export const FindById = (modele, id) => {
    let fetchDatas = Cookies.get(modele);
    if(!fetchDatas) return null;
    fetchDatas = JSON.parse(fetchDatas);
    const user =  fetchDatas.find(item => item.id === id);
    return user ?? null;
}

export const FindOne = (modele, property, value) => {
    let fetchDatas = Cookies.get(modele);
    if(!fetchDatas) return null;
    fetchDatas = JSON.parse(fetchDatas);
    const data =  fetchDatas.find(item => item[property] === value);
    return data ?? null;
}

export const Find = (modele) => {
    let fetchDatas = Cookies.get(modele);
    if(!fetchDatas) return null;
    return JSON.parse(fetchDatas);
}

export const Create = (modele, data) => {
    const modeles = ["users", "blogs", "commentaires", ]
    if(!Object.keys(data).length) return null;
    if(modele === "users"){
        const {email, password, passwordConfirm} = data;
        if(password.length < 4 ) return {status: 400, succes: false, message: "Mot de passe doit contenir au moin 4 caractères"};
        if(password !== passwordConfirm) return {status: 400, message: "Mot de passe de confirmation incorrect"};
        const user = FindOne("users", "email", email);
        if(user) return {status: 400, message: "Ce compte est déjà utilisé"};
        let users = Find(modele);
        data.created_at = new Date();
        data.updated_at = new Date();
        if(!users){
            data.id = 1;
            data = [data];
            Cookies.set("users", JSON.stringify(data), { expires: 90, path: '/'});
        }else{
            const userss = users.sort((a, b) => b - a)[0].id + 1;
            data.id = userss[0].id + 1;
            users.push(data);
            Cookies.set("users", JSON.stringify(users), { expires: 90, path: '/'});
        }
        return {status: 200, succes: true, message: "Created succefull", data};
    }else if(modele === "blogs"){
        let blogs = Find(modele);
        data.created_at = new Date();
        data.updated_at = new Date();
        if(!blogs){
            data.id = 1;
            data = [data];
            Cookies.set(modele, JSON.stringify(data), { expires: 90, path: '/'});
        }else{
            const blogss = blogs.sort((a, b) => b - a);
            data.id = blogss[0].id + 1
            blogs.push(data);
            Cookies.set(modele, JSON.stringify(blogs), { expires: 90, path: '/'});
        }
        return {status: 200, succes: true, message: "Created succefull", data};
    }
}

