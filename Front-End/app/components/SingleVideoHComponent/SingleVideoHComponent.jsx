import { useLocation, Link } from "react-router";
import "./SingleVideoHComponent.css"

export default function SingleVideoHorizontale() {
  const { state } = useLocation();
  const video = state?.video; // Récupère la vidéo passée depuis le Link

  if (!video) return <h2>Vidéo introuvable</h2>;

  return (
  <div className="video-player-page">
    <div className="video-player-container">
      {/* Section vidéo principale */}
      <div className="primary-section">
        <div className="video-wrapper">
          <video
            src={video.url}
            controls
            autoPlay
            className="main-video"
          />
        </div>

        {/* Infos vidéo */}
        <div className="video-details">
          <h1 className="video-main-title">{video.tags}</h1>
          
          <div className="video-stats-row">
            <span className="video-views">{video.views.toLocaleString()} vues</span>
            <div className="video-actions">
              <button className="action-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                </svg>
                <span>J'aime</span>
              </button>
              <button className="action-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/>
                </svg>
                <span>J'aime pas</span>
              </button>
              <button className="action-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                </svg>
                <span>Partager</span>
              </button>
              <button className="action-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"/>
                </svg>
                <span>Enregistrer</span>
              </button>
            </div>
          </div>
        </div>

        {/* Chaîne info */}
        <div className="channel-info">
          <div className="channel-header">
            <img 
              src={video.userImageURL} 
              alt={video.user}
              className="channel-avatar"
            />
            <div className="channel-details">
              <h3 className="channel-name">{video.user}</h3>
              <p className="channel-subscribers">Abonnés</p>
            </div>
            <button className="subscribe-button">S'abonner</button>
          </div>
          
          <div className="video-description">
            <p>{video.tags}</p>
            <p className="video-metadata">Durée : {Math.floor(video.duration)}s</p>
          </div>
        </div>

        {/* Section commentaires */}
        <div className="comments-section">
          <h3 className="comments-title">Commentaires</h3>
          <div className="comment-input">
            <img src={video.userImageURL} alt="User" className="comment-avatar" />
            <input type="text" placeholder="Ajouter un commentaire..." className="comment-field" />
          </div>
        </div>
      </div>

      {/* Sidebar suggestions */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Suggestions</h3>
        <div className="suggestions-list">
          {/* Ici vous pouvez mapper d'autres vidéos */}
          <p style={{color: '#606060', padding: '20px', textAlign: 'center'}}>
            Suggestions de vidéos à venir...
          </p>
        </div>
      </div>
    </div>

    {/* Bouton retour flottant */}
    <Link to="/" className="back-button">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
      </svg>
      Retour
    </Link>
  </div>
);
}