
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
 <div className="shorts-page">
   
    {shorts.length === 0 ? (
        <p className="no-shorts">Aucune vidéo trouvée.</p>
    ) : (
        <div className="shorts-scroll-container">
            {shorts.map((short, index) => (
                <div key={short.id} className="short-item">
                    <div className="short-video-wrapper">
                        <video 
                            src={short.url}
                            poster={short.thumbnail}
                            //controls
                            autoPlay
                            className="short-video"
                            loop
                            playsInline  
                            onClick={(e) => {
                                if (e.target.paused) {
                                    e.target.play();
                                } else {
                                    e.target.pause();
                                }
                            }}
                        />
                    </div>
                    
                    <div className="short-content-info">
                        <div className="short-creator-info">
                            <img 
                                src={short.userImageURL} 
                                alt={short.user}
                                className="short-creator-avatar"
                            />
                            <div className="short-text-info">
                                <h3 className="short-video-title">{short.tags}</h3>
                                <p className="short-creator-name">{short.user}</p>
                                <span className="short-video-views">{short.views.toLocaleString()} vues</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="short-actions">
                        <button className="short-action-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                            <span>J'aime</span>
                        </button>
                        <button className="short-action-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                            </svg>
                            <span>Commenter</span>
                        </button>
                        <button className="short-action-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                            </svg>
                            <span>Partager</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )}
</div>

    </>
  );
}