import { useState, useEffect } from "react";

import Login from "@/components/FormConnexion/FormConnexion";

export default function HistoriquePage() {
    const [connecte, setConnecte] = useState(false);
    const [nomUtilisateur, setNomUtilisateur] = useState("");

    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        const pseudo = sessionStorage.getItem("userPseudo");

        if (token && pseudo) {
            setConnecte(true);
            setNomUtilisateur(pseudo);
        }
    }, []);
    if (!connecte) {
        return (
            <div>
                <Login/>
            </div>
        );
    }
    return(<>
     <div className="home-page">
            <div className="home-content">
            <div className="left-side">         
                <p>Historique de {nomUtilisateur}</p>
            </div>
        </div>
         </div>
         </>)
}