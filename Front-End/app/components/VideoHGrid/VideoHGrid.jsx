
import React, { useContext, useEffect } from 'react';
import { VideosContext } from '@/contexts/ApiContextVideo/ApiContextVideo';
import { Link } from 'react-router';
import { jwtDecode } from 'jwt-decode';
import "./VideoGrid.css"


export default function VideoHGrid() {

const toggleVideoInPlaylist = (videoData) => {
    // 1. Récupérer l'ID utilisateur à partir du token (si nécessaire)
    const token = sessionStorage.getItem('authToken');
    if (!token) {
        console.warn("Utilisateur non connecté. Impossible de gérer la playlist.");
        return; // Ou afficher un message à l'utilisateur
    }
    
    // Vous aurez besoin d'une librairie comme jwt-decode pour cela
    let decodedToken;
    try {
        // Supposons que vous ayez importé jwtDecode
        decodedToken = jwtDecode(token); 
    } catch (e) {
        console.error("Token invalide lors de la lecture de l'ID.");
        return;
    }
    
    const userId = decodedToken.userId;
    const storageKey = `playlist_${userId}`;

    // 2. Lire la playlist existante
    const storedPlaylist = sessionStorage.getItem(storageKey);
    // Si elle existe, on la parse. Sinon, on commence avec un tableau vide.
    let playlist = storedPlaylist ? JSON.parse(storedPlaylist) : [];

    // 3. Vérifier si la vidéo est déjà dans la playlist
    const videoIndex = playlist.findIndex(v => v.id === videoData.id);

    if (videoIndex > -1) {
        // La vidéo est déjà là -> On la retire (suppression)
        playlist.splice(videoIndex, 1);
        console.log(`Vidéo ${videoData.id} retirée de la playlist.`);
    } else {
        // La vidéo n'est pas là -> On l'ajoute (ajout)
        // Vous ne stockez que les champs nécessaires pour économiser l'espace
        const newVideoEntry = {
            id: videoData.id,
            tags: videoData.tags, // Assurez-vous d'avoir le titre
            url: videoData.url,
            views : videoData.views,
            thumbnail : videoData.thumbnail

        };
        playlist.push(newVideoEntry);
        console.log(`Vidéo ${videoData.id} ajoutée à la playlist.`);
    }

    // 4. Mettre à jour le sessionStorage avec la nouvelle liste
    sessionStorage.setItem(storageKey, JSON.stringify(playlist));
};

const {fetchVideoH , videos} = useContext(VideosContext)
  useEffect (() =>{
    if (fetchVideoH) {
      fetchVideoH();}
    
  }, [])


return(
    <>  
    <div className="px-6 py-8">
  <h2 className="text-3xl font-bold mb-8 text-white">🎬 Vidéos Pixabay</h2>

  {videos.length === 0 ? (
    <p className="text-gray-400">Aucune vidéo trouvée.</p>
  ) : (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      
      {videos.map(video => (
        <div key={video.id} className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition">

          {/* Thumbnail */}
          <Link to={`/video/${video.id}`} state={{ video }}>
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.tags}
                className="w-full h-48 object-cover"
              />
              <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                {Math.floor(video.duration)}s
              </span>
            </div>
          </Link>

          {/* Infos */}
          <div className="p-4 flex gap-3">
            
            {/* Avatar */}
            {video.userImageURL && (
              <img
                src={video.userImageURL}
                alt={video.user}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}

            {/* Texte */}
            <div className="flex-1">
              <h3 className="text-white text-sm font-semibold line-clamp-2">
                {video.tags}
              </h3>

              <p className="text-gray-400 text-xs mt-1">{video.user}</p>

              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-500 text-xs">
                  {video.views.toLocaleString()} vues
                </span>

                <button
                  onClick={() => toggleVideoInPlaylist(video)}
                  className="text-xs bg-indigo-600 active:bg-green-600 transition  hover:bg-indigo-700 text-white px-3 py-1 rounded"
                >
                  ➕ Playlist
                </button>
              </div>

            </div>
          </div>
        </div>
      ))}

    </div>
  )}
</div>

    </>);
    
}


