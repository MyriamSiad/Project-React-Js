
import React, { useContext, useEffect } from 'react';
import { ShortsContext } from '@/contexts/ApiContextShorts/ApiContextShorts';
import { Link } from 'react-router';
import "./VideoVGrid.css"
/*function Shorts() {
  return (
    <div className="shorts-container">
      {videos.map(video => (
        <div className="short-item" key={video.id}>
          <video
            src={video.url}
            controls
            autoPlay
            loop
            muted
            className="short-video"
          />
          <h3 className="video-title">{video.title}</h3>
        </div>
      ))}
    </div>
  );
}*/

export default function VideoVGrid() {
const {fetchShorts, shorts} = useContext(ShortsContext)
  useEffect (() =>{
    if (fetchShorts) {
      fetchShorts();}
    
  }, [])

  return(
    <>  
 <div className="h-screen bg-black overflow-y-scroll snap-y snap-mandatory flex justify-center">

  {/* Largeur différente selon écran :
      - Mobile : plein écran
      - PC : format vertical centré */}
  <div className="w-full md:max-w-[420px]">

    {shorts.length === 0 ? (
      <p className="text-white text-center mt-20">
        Aucune vidéo trouvée.
      </p>
    ) : (
      shorts.map((short) => (
        <div
          key={short.id}
          className="relative h-[92vh] snap-start flex items-center justify-center"
        >

          {/* CONTAINER VERTICAL */}
          <div className="relative w-full h-full md:aspect-[9/16] bg-black md:rounded-2xl">

            {/* VIDÉO */}
            <video
            src={short.url}
            poster={short.thumbnail}
            muted
            controls
            playsInline
            className="h-full w-full object-contain pointer-events-auto"
          />

            {/* OVERLAY DÉGRADÉ (NE BLOQUE PLUS LES CLICS) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

            {/* INFOS CRÉATEUR */}
            <div className="absolute bottom-20 left-4 text-white max-w-[80%] z-10 pointer-events-auto">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={short.userImageURL}
                  alt={short.user}
                  className="w-10 h-10 rounded-full object-cover border border-white"
                />
                <span className="font-semibold text-sm">
                  @{short.user}
                </span>
              </div>

              <h3 className="text-sm font-semibold line-clamp-2 mb-1">
                {short.tags}
              </h3>

              <span className="text-xs text-gray-300">
                {short.views.toLocaleString()} vues
              </span>
            </div>

            {/* ACTIONS À DROITE */}
            <div className="absolute bottom-20 right-4 flex flex-col items-center gap-6 text-white z-10 pointer-events-auto">

              {/* LIKE */}
              <button className="flex flex-col items-center gap-1 hover:scale-110 transition">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span className="text-xs">J'aime</span>
              </button>

              {/* COMMENTER */}
              <button className="flex flex-col items-center gap-1 hover:scale-110 transition">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                </svg>
                <span className="text-xs">Commenter</span>
              </button>

              {/* PARTAGER */}
              <button className="flex flex-col items-center gap-1 hover:scale-110 transition">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                </svg>
                <span className="text-xs">Partager</span>
              </button>

            </div>

          </div>
        </div>
      ))
    )}

  </div>
</div>



    </>
  );
}