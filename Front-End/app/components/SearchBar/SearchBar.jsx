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
  <div className="relative w-full max-w-xs" ref={dropdownRef}>

  {/* INPUT */}
  <input
    id="inputSearchbar"
    type="text"
    placeholder="Rechercher une vidéo..."
    value={searchTerm}
    onChange={e => handleInputUser(e.target.value)}
    className="w-full bg-gray-800 text-white placeholder-gray-400
               border border-gray-700 rounded-lg px-4 py-2 text-sm
               focus:outline-none focus:ring-2 focus:ring-indigo-500
               transition"
  />

  {/* DROPDOWN RÉSULTATS */}
  {searchTerm.trim() !== "" && (
    <div className="absolute top-12 left-0 w-full bg-gray-900 border border-gray-800 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">

      {filteredVideos.length === 0 ? (
        <p className="text-gray-400 text-sm px-4 py-3">
          Aucun résultat pour "{searchTerm}"
        </p>
      ) : (
        <>
          <p className="text-gray-400 text-xs px-4 py-2 border-b border-gray-800">
            {filteredVideos.length} résultat(s)
          </p>

          {filteredVideos.map(video => (
            <Link
              key={video.id}
              to={`/video/${video.id}`}
              state={{ video }}
              onClick={clearSearch}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition"
            >
              {/* Petite image */}
              <img
                src={video.thumbnail}
                alt={video.tags}
                className="w-14 h-10 object-cover rounded"
              />

              {/* Texte */}
              <div className="flex-1">
                <h3 className="text-white text-xs font-semibold line-clamp-1">
                  {video.tags}
                </h3>
                <p className="text-gray-400 text-[11px]">
                  {Math.floor(video.duration)}s
                </p>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  )}
</div>

    </>
  );
}
