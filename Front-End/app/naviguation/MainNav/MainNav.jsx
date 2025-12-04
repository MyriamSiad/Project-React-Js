import "./MainNav.css"
import { useEffect,useState } from "react";
import { NavLink } from 'react-router';
import SearchBar from "@/components/SearchBar/SearchBar";
import VideoProvider from "@/contexts/ApiContextVideo/ApiContextVideo";
import { useNavigate } from 'react-router';
export default function MainNav() {
 const [connecte, setConnecte] = useState(false);
  const navigate = useNavigate();
    useEffect(() => {
           const token = sessionStorage.getItem("authToken");
            const pseudo = sessionStorage.getItem("userPseudo");
           
            if (token && pseudo) {
                setConnecte(true);
               // button = <LogoutButton onClick={this.handleLogoutClick} />;
                //setNomUtilisateur(pseudo);
            }
        }, []);

        function UserDeconnexion(){
           window.location.reload()
            //navigate('/');
            setConnecte(false)
            sessionStorage.removeItem("authToken"); 
            sessionStorage.removeItem("userPseudo");
        }
  return (
  <nav className="bg-gray-900 border-b border-gray-800">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

    {/* LOGO / TITRE */}
    <div className="text-xl font-bold text-white">
      🎬 VideoApp
    </div>

    {/* LIENS */}
    <ul className="hidden md:flex items-center gap-8 text-gray-300 font-medium">

      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-white border-b-2 border-indigo-500 pb-1"
              : "hover:text-white transition"
          }
        >
          Accueil
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/playlist"
          className={({ isActive }) =>
            isActive
              ? "text-white border-b-2 border-indigo-500 pb-1"
              : "hover:text-white transition"
          }
        >
          Playlist
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/historique"
          className={({ isActive }) =>
            isActive
              ? "text-white border-b-2 border-indigo-500 pb-1"
              : "hover:text-white transition"
          }
        >
          Historique
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/shorts"
          className={({ isActive }) =>
            isActive
              ? "text-white border-b-2 border-indigo-500 pb-1"
              : "hover:text-white transition"
          }
        >
          Shorts
        </NavLink>
      </li>
    </ul>

    {/* SEARCH + BOUTON */}
    <div className="flex items-center gap-4">

      <VideoProvider>
        <SearchBar />
      </VideoProvider>

      {connecte && (
        <button
          onClick={() => {UserDeconnexion()}}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          Déconnexion
        </button>
      )}
    </div>

  </div>
</nav>

    )
}