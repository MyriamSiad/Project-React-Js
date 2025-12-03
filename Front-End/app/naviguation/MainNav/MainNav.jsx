import "./MainNav.css"
import { NavLink } from 'react-router';
import SearchBar from "@/components/SearchBar/SearchBar";
import VideoProvider from "@/contexts/ApiContextVideo/ApiContextVideo";
export default function MainNav() {
  return (
    <nav className='navbar'>
            <menu>
                <ul>
                <li>
                    <NavLink
                    to = "/"
                    >
                    Acceuil
                    </NavLink>
                </li>

                <li>
                    <NavLink
                    
                    to = "/playlist"
                    >
                    Playlist
                    </NavLink>
                </li>

                <li>
                    <NavLink
                    to = "/historique"
                    >
                    Historique
                    </NavLink>
                </li>

                <li>
                    <NavLink
                    to = "/shorts"
                    >
                    Shorts
                    </NavLink>
                </li>
                <VideoProvider><SearchBar/></VideoProvider>
                
                </ul>

            </menu>
        
        </nav>
        
    )
}