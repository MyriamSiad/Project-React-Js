import TitleH2 from "@/components/TitleH2/TitleH2"; 
import { useState, useEffect } from "react";
import "./FormConnexion.css";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); 
    const [connecte, setConnecte] = useState(false);
    const [nomUtilisateur, setNomUtilisateur] = useState("");

    // Vérifier si l'utilisateur est déjà connecté au chargement de la page
    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        const pseudo = sessionStorage.getItem("userPseudo");

        if (token && pseudo) {
            setConnecte(true);
            setNomUtilisateur(pseudo);
        }
    }, []);

    // Fonction de soumission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.token) {
                // Stocker dans sessionStorage pour garder la session
                sessionStorage.setItem("authToken", data.token);
                sessionStorage.setItem("userPseudo", data.pseudo);

                setConnecte(true);
                setNomUtilisateur(data.pseudo);
                setMessage(`Connexion réussie : Bienvenue !`);
                setEmail("");
                setPassword("");
            } else {
                setMessage(`Échec : ${data.error || "Informations invalides."}`);
            }
        } catch (error) {
            setMessage("Erreur de connexion au serveur.");
            console.error(error);
        }
    };

    // Bouton “Accéder à ma Playlist” → fait disparaître le formulaire
    const handleAccessPlaylist = () => {
        setMessage("");
        setConnecte(true);
        // Ici, on ne fait pas de navigation, l'utilisateur reste sur la même page
    };

    return (
        <>
            {/* Formulaire de connexion */}
            {!connecte && (
                <div className="form-container">
                    {message && <p style={{ color: message.includes("Échec") ? "red" : "green" }}>{message}</p>}
                    <TitleH2 title="Se connecter" />
                    <hr/>
                    <form onSubmit={handleSubmit}>
                        <label>Email :</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <label>Mot de passe :</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Se connecter</button>
                    </form>

                    
                </div>
            )}

            {connecte && (
                <div style={{ padding: "20px", textAlign: "center", border: "1px solid #ccc", borderRadius: "8px" }}>
                    <h2>Bienvenue {nomUtilisateur} !</h2>
                    <p>Vous êtes maintenant connecté(e) 🎉</p>
                    {/* Ici tu peux mettre directement le contenu de la playlist */}
                </div>
            )}
        </>
    );
}
