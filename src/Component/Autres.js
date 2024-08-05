
import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { get_cookie } from "../cookies/cookies";
import { Find, FindById } from "../cookies/usermanagement";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Titre } from "./SemiComposent/SemiComponent";

function Autres(props) {
    const [card, setCard] = useState([])
    const cookies = get_cookie("cookies_blog");
    if(!cookies) window.location.href = "/connexion";
    const blogs = Find("blogs");

    const mesblogs = blogs.filter(item => item.user_id !== cookies.id)
    const backgroundStyle = {
        backgroundImage: 'url("/images/mybackground.jpeg")',
    };

    const formatDate = (date) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr });
    };

     useEffect(() => {
         setCard(mesblogs.filter(item => Boolean(item.action)))
       },
     []);

     
    return (
        <>
            <Header/>

            <Titre titre="Actuelités"/>

            <div className="relative pt-2 lg:pt-2 min-h-screen">

                <div className="bg-cover w-full flex justify-center items-center"
                    style={backgroundStyle}>
                    <div className="w-full bg-white p-5  bg-opacity-40 backdrop-filter backdrop-blur-lg">
                        <div className="w-12/12 mx-auto rounded-2xl bg-white p-5 bg-opacity-40 backdrop-filter backdrop-blur-lg">

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-center px-2 mx-auto">
                                {card.length ? card.map((item, index) => (
                                    <article class="bg-white  p-6 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer border">
                                        <a target="_self" href={item.id+"/mes-blogs"} class="absolute opacity-0 top-0 right-0 left-0 bottom-0"></a>
                                        <div class="relative mb-4 rounded-2xl">
                                            <img class="max-h-80 rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                                                src={item.couverture} alt=""/>
                                            <div
                                                class="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-red-700">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                </svg>
                                                <span class="ml-1 text-sm text-slate-400">{item?.likes?.length}</span>
                
                                            </div>
                
                                            <a href={`/lecture?poste=${item.id}`} class="flex justify-center items-center bg-red-700 bg-opacity-80 z-10 absolute top-0 left-0 w-full h-full text-white rounded-2xl opacity-0 transition-all duration-300 transform group-hover:scale-105 text-xl group-hover:opacity-100"
                                                 target="_self" rel="noopener noreferrer">
                                                Lire le poste
                                                <svg class="ml-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                        <div class="flex justify-between items-center w-full pb-4 mb-auto">
                                            <div class="flex items-center">
                                                <div class="pr-3">
                                                    <img class="h-12 w-12 rounded-full object-cover" src={FindById("users", item.user_id).photo} alt=""/>
                                                </div>
                                                <div class="flex flex-1">
                                                    <div class="">
                                                        <p class="text-sm font-semibold ">{FindById("categories", Number(item.categorie)).libelle}</p>
                                                       
                                                        <p class="text-sm text-gray-500">Publié le {item.date_publication}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex justify-end">
                                                <div class="text-sm flex items-center text-gray-500 ">
                                                    {formatDate(item.date_publication)}
                                                    <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <h3 class="font-medium text-xl leading-8">
                                            <a 
                                                class="block relative group-hover:text-red-700 transition-colors duration-200 ">
                                                {item.titre}
                                            </a>
                                        </h3>
                                        <div>
                                        </div>
                                    </article>
                                )) : null}
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
        
    )
}

export default Autres;
