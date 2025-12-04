import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { Link } from "react-router";

import Login from "@/components/FormConnexion/FormConnexion";

export default  function HistoriquePage() {
    const [historique, setHistorique] = useState([]);
    const [connecte, setConnecte] = useState(false);
    const [nomUtilisateur, setNomUtilisateur] = useState("");
    const [loading, setLoading] = useState(true);
   useEffect(() => {
   const token = sessionStorage.getItem("authToken");
   const pseudo = sessionStorage.getItem("userPseudo");

    if (token && pseudo) {
        setConnecte(true);
        setNomUtilisateur(pseudo);
        
        // Fonction ASYNC IFFY (Immediately Invoked Function Expression)
        // C'est la manière idiomatique d'utiliser async/await dans useEffect
        (async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:5000/api/historique", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                   if (response.status === 401) {
                    // Token invalide ou expiré
                    console.error("Token invalide. Déconnexion...");
                    sessionStorage.removeItem("authToken");
                    sessionStorage.removeItem("userPseudo");
                    setConnecte(false);
                    return;
                }
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                
                const data = await response.json();
                console.log("📜 Historique récupéré :", data);
                setHistorique(data.historiques || []);
                // Si vous avez un useState pour stocker l'historique : setHistorique(data);

            } catch (error) {
                console.error("Échec de la récupération de l'historique:", error);
                // Gérer l'état de déconnexion si l'erreur est un 401 (token invalide)
            }
        })(); // <--- La fonction est définie et appelée immédiatement
    }
    else {
        setLoading(false);
    }
}, []); 
   if (!connecte) {
        return (
            <div>
                <Login/>
            </div>
        );
    }


    return(<>



    
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
    {/* En-tête */}
    <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
            Bienvenue {nomUtilisateur} ! 👋
        </h1>
        <p className="text-gray-300">
            {historique.length > 0 
                ? `${historique.length} vidéo${historique.length > 1 ? 's' : ''} dans votre historique`
                : "Votre historique est vide"
            }
        </p>
    </div>







    {/************************************** Affichage Historique  ************************/ }
    <div className="max-w-6xl mx-auto">
        {historique.length === 0 ? (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 text-center border border-gray-700">
                <div className="text-6xl mb-4">📺</div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                    Aucune vidéo dans l'historique
                </h3>
                <p className="text-gray-400">
                    Commencez à regarder des vidéos pour les voir apparaître ici !
                </p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {historique.map((item) => (
                    <>
                  
                    <div 
                        key={item._id}
                        className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1"
                    >
                        
                       
                        {/* Miniature vidéo */}
                        <div className="relative aspect-video bg-gradient-to-br from-purple-600 to-blue-600 overflow-hidden">
                            <video 
                                src={item.videoUrl} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                preload="metadata"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                       
                        {/* Informations */}
                        <div className="p-4">
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-white font-semibold text-lg line-clamp-2 flex-1">
                                    Vidéo #{item.videoId}
                                </h3>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-3">
                                {item.videoTags.split(',').map((tag, index) => (
                                    <span 
                                        key={index}
                                        className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30"
                                    >
                                        {tag.trim()}
                                    </span>
                                ))}
                            </div>

                            {/* Date */}
                            <div className="flex items-center text-gray-400 text-sm">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Vu le {new Date(item.lastViewedAt).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </div>

                            {/* Bouton de lecture */}
                           
                        </div>
                    </div>
                </>))}
            </div>
        )}
    </div>
</div>

</>)
}
