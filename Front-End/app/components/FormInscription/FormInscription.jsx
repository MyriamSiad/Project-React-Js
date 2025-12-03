import "./FormInscription.css"
import TitleH2 from "@/components/TitleH2/TitleH2"; 
import { useState } from "react"

export default function Inscription(){
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Ajoutez un état pour les messages (succès/erreur)
    const [message, setMessage] = useState(""); 
    const [messageType, setMessageType] = useState("");
    
    // Fonction de soumission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        setMessage(""); // Réinitialiser les messages

        try {
            const response = await fetch("http://localhost:5000/api/register", { // URL de votre serveur
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ pseudo, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Succès
                setMessage(`Inscription réussie : ${data.message}`);
                setMessageType("success")
                setPseudo("");
                setEmail("");
                setPassword("");
            } else {
                // Erreur du serveur (e.g., Email déjà utilisé)
                setMessage(`Erreur d'inscription : ${data.error}`);
                setMessageType("error");

            }
        } catch (error) {
            // Erreur réseau ou autre
            setMessage("Erreur de connexion au serveur.");
            console.error("Erreur lors de la soumission :", error);
        }
    };

    return(
    <div className="form-containerI"> 
        {/* Afficher les messages de succès/erreur */}
        <p style={{ color: messageType === "success" ? "green" : "red" }}>
         {message}
        </p>
        <TitleH2 title="Créer un Compte" />
    
        <hr/>
        <form onSubmit={handleSubmit}>
            <label htmlFor="pseudo" style={{marginTop:"10px"}}>
                Pseudo : 
            </label>
            <input name="pseudo" 
            value={pseudo}
            onChange={e=> setPseudo(e.target.value)}
            required />
            <label htmlFor="email">
                Email : 
            </label>
            <input type="email" name="email" 
            value={email}
            onChange={e=> setEmail(e.target.value)}
            required />
            <label htmlFor="password">Mot de passe :</label>
            <input type="password" name="password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            required/>

            <button type="submit">Valider</button>
        </form>   
    </div>   
    )
}