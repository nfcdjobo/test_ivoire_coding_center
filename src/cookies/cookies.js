import Cookies from "js-cookie";

export const save_cookie = data =>  Cookies.set("cookies_blog", JSON.stringify(data), { expires: 1, path: '/'});

export const get_cookie = cookie_name => Cookies.get(cookie_name)? JSON.parse(Cookies.get(cookie_name)): false;

export const destrory = cle=>{
    Cookies.remove(cle);
    window.location.reload();
};

