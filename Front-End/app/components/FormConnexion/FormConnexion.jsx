import TitleH2 from "@/components/TitleH2/TitleH2"; 
import { useState, useEffect } from "react";
import "./FormConnexion.css";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); 
    const [connecte, setConnecte] = useState(false);
    const [nomUtilisateur, setNomUtilisateur] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    // Vérifier si l'utilisateur est déjà connecté au chargement de la page
    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        const pseudo = sessionStorage.getItem("userPseudo");
        

        if (token && pseudo) {
            setConnecte(true);
            setNomUtilisateur(pseudo);
            
           
        }
    setIsLoading(false);
        
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
                 window.location.reload();
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

    if (isLoading) {
    return <div>Chargement de la session...</div>;
    }
    return (
        <>

{!connecte && (
  <div className="min-h-[80vh] flex items-center justify-center px-4">

    <div className="w-full max-w-2xl bg-gray-900 rounded-2xl shadow-2xl p-10">

      {/* MESSAGE */}
      {message && (
        <p
          className={`mb-6 text-center text-sm font-semibold ${
            message.includes("Échec") ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}

      {/* TITRE */}
      <h2 className="text-3xl font-extrabold text-white text-center mb-2">
        🔐 Connexion
      </h2>

      <p className="text-gray-400 text-center mb-10">
        Connecte-toi pour accéder à ta playlist et ton historique
      </p>

      {/* FORMULAIRE */}
      <form onSubmit={handleSubmit} className="space-y-7">

        {/* EMAIL */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Adresse email
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="ex: utilisateur@email.com"
            className="w-full bg-gray-800 text-white placeholder-gray-500
                       border border-gray-700 rounded-xl px-5 py-3 text-lg
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       transition"
          />
        </div>

        {/* MOT DE PASSE */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full bg-gray-800 text-white placeholder-gray-500
                       border border-gray-700 rounded-xl px-5 py-3 text-lg
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       transition"
          />
        </div>

        {/* BOUTON */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700
                     text-white font-bold py-4 rounded-xl text-lg
                     transition transform hover:scale-[1.02]"
        >
          Se connecter
        </button>
      </form>

      {/* FOOTER */}
      <div className="mt-10 text-center">
        <p className="text-gray-400 text-sm">
          Pas encore de compte ?
          <span className="text-indigo-400 hover:underline cursor-pointer ml-1">
            Créer un compte
          </span>
        </p>
      </div>

    </div>
  </div>
)}


        </>
    );
}
