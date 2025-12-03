import VideoHorizontale from "../VideoHorizontale/VideoHorizontale"
import VideoHGrid from "@/components/VideoHGrid/VideoHGrid"
import VideoProvider from "@/contexts/ApiContextVideo/ApiContextVideo"
import Inscription from "@/components/FormInscription/FormInscription";
import "./Home.css"
import { useState,useEffect } from "react"
export default function HomePage() {
 const [connecte, setConnecte] = useState(false); // pour savoir si l'utilisateur est connecté

    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        const pseudo = sessionStorage.getItem("userPseudo");

        if (token && pseudo) {
            setConnecte(true);
        }
    }, []);
    return(<>
    
    <h1>Je suis la page d'acceuil</h1>
    <VideoProvider>
         <VideoHGrid/>
    </VideoProvider>
    <div className="home-page">
            <div className="home-content">
                <div className="left-side">
                    <h1>Bienvenue !</h1>
                    <p> </p>
                </div>
                <div className="right-side">
                    {/* Affiche le formulaire seulement si l'utilisateur n'est pas connecté */}
                    {!connecte && <Inscription />}
                </div>
            </div>
        </div>
    </>)
}