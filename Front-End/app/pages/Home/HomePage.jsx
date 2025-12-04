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
    
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">

  {/* HERO SECTION */}
  <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

    {/* TEXTE À GAUCHE */}
    <div className="space-y-6">
      <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
        🎬 Bienvenue sur ta plateforme vidéo
      </h1>

      <p className="text-gray-400 text-lg">
        Découvre, regarde et sauvegarde les meilleures vidéos gratuites.  
        Crée ta playlist et profite de ton espace personnel.
      </p>

      <div className="flex gap-4">
        <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold transition">
          Explorer
        </button>

        <button className="border border-gray-600 hover:border-white px-6 py-3 rounded-lg font-semibold transition">
          En savoir plus
        </button>
      </div>
    </div>

    {/* FORMULAIRE À DROITE */}
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
      {!connecte && <Inscription />}
    </div>

  </div>

  {/* SECTION VIDÉOS */}
  <div className="max-w-7xl mx-auto px-6 pb-20">
    <h2 className="text-3xl font-bold mb-8">🔥 Tendances actuelles</h2>

    <VideoProvider>
      <VideoHGrid />
    </VideoProvider>
  </div>

</div>

    </>)
}