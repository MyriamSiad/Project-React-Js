import "./SearchBar.css"
import { useContext, useRef } from 'react';
import { Link } from "react-router";
import { VideosContext } from '@/contexts/ApiContextVideo/ApiContextVideo';
// Filtrer les vidéos selon le terme de recherche
/* const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
  
      <input
        type="text"
        placeholder="Rechercher une vidéo..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-bar"
      />*/
export default function SearchBar() {
  const {filteredVideos, searchTerm, setSearchTerm, clearSearch} = useContext(VideosContext);
  const dropdownRef = useRef(null);
  //const input = document.getElementById("inputSearchbar")

const boolFlag = false;
  function handleInputUser(value){

    setSearchTerm(value);

  }


  const handleCloseSuggestions = () => {
        // C'est l'action à exécuter au clic en dehors
        clearSearch(); 
    };
  return (
    <>
  <div className="search-wrapper" ref={dropdownRef}>
            <h2>Recherche Vidéos</h2>
            
            {/* La barre de recherche */}
            <input
            id='inputSearchbar'
                type="text"
                className="search-input"
                placeholder="Rechercher par titre ou mot-clé..."
                value={searchTerm}
                onChange={e => handleInputUser(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
            />
            
            
            {/* Messages d'état */}
            {/*isLoading && <div>Chargement des vidéos...</div>*/}
            {/*error && <div style={{ color: 'red' }}>Erreur: {error}</div>*/}
            
           
            {(/*!isLoading && !error) && (*/
                <>
                    {searchTerm.trim() ==="" ?  (
                        null
                    ) :filteredVideos.length === 0 ?  (
                        <p>Aucun résultat trouvé pour "{searchTerm}".</p>
                        ) : (
                        <div className="search-suggestions">
                            <p>Affichage de {filteredVideos.length} vidéos.</p>
                            {filteredVideos.map(video => (
                            
                              <div         
                                key={video.id}> 
                                  <Link
                                    to={`/video/${video.id}`}
                                    key={video.id}
                                    className="video-card"
                                    state={{ video }}
                                    onClick={e => clearSearch()}
                                  >
                                    <h3>Tags: {video.tags}</h3>
                                    {/* Ajoutez d'autres détails ou le lecteur vidéo ici */}
                                    <p>Durée: {video.duration}s</p>
                                    </Link> 
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    </>
  );
}
