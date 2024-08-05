
import { get_cookie } from "../cookies/cookies";
import { FindById, FormatDate } from "../cookies/usermanagement";
import Footer from "./Footer";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import { Titre } from "./SemiComposent/SemiComponent";


const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

function Lecture(props) {
    const cookies = get_cookie("cookies_blog");
    if (!cookies) window.location.href = "/connexion";
    const reference = Number(useQuery().get('poste'));
    const blog = FindById("blogs", reference);
    
    return (
        <>
            <Header />
            <Titre titre="Lecture de Blog"/>
            <div className="container mx-auto flex flex-wrap py-6">

                <section className="w-full md:w-2/3 flex flex-col items-center px-3">

                    <article className="flex flex-col  my-4">
                    
                        
                        <a href="/" className="hover:opacity-75">
                            <img src="" alt=""/>
                        </a>
                        <div className="bg-white flex flex-col justify-start p-1">
                            <a href="#" className="text-blue-700 text-sm font-bold uppercase pb-4">{FindById("categories", blog.categorie).libelle}</a>
                            <a href="#" className="text-3xl font-bold hover:text-gray-700 pb-4">{blog.titre}</a>
                            <p className="text-sm pb-8"><a href="#" className="font-semibold hover:text-gray-800"></a>Publiée le {FormatDate(new Date(blog.date_publication))}
                            </p>
                            <h1 className="text-2xl font-bold pb-3">{blog.description}</h1>
                        </div>
                        <div className="p-2" dangerouslySetInnerHTML={{ __html: blog.contenu }}/>
                    </article>
                </section>

                <aside className="w-full md:w-1/3 flex flex-col items-center px-3">

                    <div className="w-full bg-white shadow flex flex-col my-4 p-6">
                        <p className="text-xl font-semibold pb-5">À propos</p>
                        <p className="pb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mattis est eu odio sagittis tristique. Vestibulum ut finibus leo. In hac habitasse platea dictumst.</p>
                        <a href="/" className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4">
                            Apprendre a nous connaitre
                        </a>
                    </div>

                    <div className="w-full bg-white shadow flex flex-col my-4 p-6">
                        <p className="text-xl font-semibold pb-5">Instagram</p>
                        <div className="grid grid-cols-3 gap-3">
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=1" alt=""/>
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=2" alt=""/>
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=3" alt=""/>
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=4" alt=""/>
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=5" alt=""/>
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=6" alt=""/>
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=7" alt=""/>
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=8" alt=""/>
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=9" alt=""/>
                        </div>
                        <a href="/" className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-6">
                            <i className="fab fa-instagram mr-2"></i> Suivez @djobo
                        </a>
                    </div>

                </aside>

            </div>
            <Footer/>
        </>
    )
}

export default Lecture;