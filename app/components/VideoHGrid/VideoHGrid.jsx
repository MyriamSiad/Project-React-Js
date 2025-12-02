
import React, { useContext, useEffect } from 'react';
import { VideosContext } from '@/contexts/ApiContextVideo/ApiContextVideo';
import { Link } from 'react-router';
import "./VideoGrid.css"


export default function VideoHGrid() {
const {fetchVideoH , videos} = useContext(VideosContext)
  useEffect (() =>{
    if (fetchVideoH) {
      fetchVideoH();}
    
  }, [])

  return(
    <>  
    <div>
   
            <h2>Vidéos Pixabay</h2>
            {videos.length === 0 ? (
                <p>Aucune vidéo trouvée.</p>
            ) : (
                <div className="video-grid">
            {videos.map(video => (
                <Link to={`/video/${video.id}`} key={video.id} className="video-card">
                    <div className="thumbnail-container">
                        <img 
                            src={video.thumbnail} 
                            alt={video.tags} 
                            className="thumbnail"
                        />
                        <span className="duration">{Math.floor(video.duration)}s</span>
                    </div>
                    
                    
                    <div className="video-info">
                <div className="channel-icon">
                    <img 
                        src={video.userImageURL} 
                        alt={video.user}
                        className="avatar"
                    />
                </div>
                <div className="video-details">
                    <h3 className="video-title">{video.tags}</h3>
                    <div className="video-meta">
                        <p className="channel-name">{video.user}</p>
                        <span className="views">{video.views.toLocaleString()} vues</span>
                    </div>
                </div>
            </div>
                </Link>
            ))}
        </div>
            )}
        </div>

    </>
  );
}
