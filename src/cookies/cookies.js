import Cookies from "js-cookie";

export const save_cookie = data =>  localStorage.setItem("cookies_blog", JSON.stringify(data));

export const get_cookie = cookie_name => localStorage.getItem(cookie_name)? JSON.parse(localStorage.getItem(cookie_name)): false;

export const destrory = cle=>{
    localStorage.removeItem(cle);
    window.location.reload();
};

