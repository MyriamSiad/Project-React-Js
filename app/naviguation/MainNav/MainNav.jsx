import "./MainNav.css"
import { NavLink } from 'react-router';
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
                </ul>
            </menu>
        
        </nav>
        
    )
}