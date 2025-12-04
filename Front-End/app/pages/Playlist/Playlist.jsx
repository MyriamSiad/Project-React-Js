import "@/pages/Home/Home.css"
import Login from "@/components/FormConnexion/FormConnexion";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router";



export default function PlaylistPage() {

    const [connecte, setConnecte] = useState(false);
    const [nomUtilisateur, setNomUtilisateur] = useState("");
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        const pseudo = sessionStorage.getItem("userPseudo");

        if (token && pseudo) {
            setConnecte(true);
            setNomUtilisateur(pseudo);

            let userId;
        try {
            // 1. Décoder le Token pour obtenir l'ID
            const decodedToken = jwtDecode(token); 
            userId = decodedToken.userId;
            const storageKey = `playlist_${userId}`;
        
            // 3. Récupérer la chaîne JSON
            const storedPlaylist = sessionStorage.getItem(storageKey);

            if (storedPlaylist && token) {
            try {
                // 4. Parser la chaîne en tableau d'objets JavaScript
                const loadedPlaylist = JSON.parse(storedPlaylist);
                setPlaylist(loadedPlaylist);
                console.log(`Playlist chargée pour l'utilisateur ${userId} :`, loadedPlaylist);
            } catch (e) {
                console.error("Erreur lors du parsing de la playlist :", e);
                setPlaylist([]); // Réinitialiser en cas d'erreur
            }
        }
            
        } catch (e) {
            console.log(jwtDecode(token))
            console.error("Token invalide.");
            //setIsLoading(false);
            return;
        }
            
        }

    }, []);
    if (!connecte) {
            return (

                <div>
                    <Login/>
                </div>
            );
        }
    
return (
 <div className="size-full bg-gradient-to-br from-gray-900 to-black min-h-screen w-full">
  <div className="p-6 max-w-7xl mx-auto">
    
    {/* TITRE */}
    <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-white">
      Ma Playlist <span className="text-indigo-500">({playlist.length} vidéos)</span>
    </h1>

    {/* GRILLE */}
    <div className="playlist-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

      {playlist.length === 0 ? (
        <p className="col-span-full text-center text-gray-400 mt-10">
          Aucune vidéo dans votre playlist.
        </p>
      ) : (
        playlist.map((video) => (
          <div
            key={video.id}
            className="bg-gray-800 rounded-2xl overflow-hidden relative
                       shadow-xl hover:shadow-2xl hover:scale-105
                       transition-transform duration-300 border-2 border-transparent hover:border-indigo-500"
          >
            {/* MINIATURE */}
            <Link to={`/video/${video.id}`} state={{ video }} className="block">
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.tags}
                className="w-full h-48 object-cover"
              />
              <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
               
              </span>
            </div>
         </Link>
            {/* INFOS VIDEO */}
            <div className="p-4">
              <h3 className="text-white font-semibold mb-1 line-clamp-2">{video.tags}</h3>
              <p className="text-gray-300 text-sm mb-2">{video.user}</p>
              <span className="text-gray-400 text-xs">{video.views.toLocaleString()} vues</span>
          
              {/* BOUTON PLAYLIST */}
              <button
                className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
                onClick={() => {/* Fonction pour toggle playlist */}}
              >
                
                Ajouter / Retirer
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
</div>




);
    
}