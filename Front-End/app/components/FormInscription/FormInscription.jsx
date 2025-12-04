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
   <div className="bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto">

  {/* MESSAGE */}
  {message && (
    <p
      className={`mb-4 text-sm text-center font-semibold ${
        messageType === "success" ? "text-green-500" : "text-red-500"
      }`}
    >
      {message}
    </p>
  )}

  <h2 className="text-2xl font-bold text-white text-center mb-2">
    ✨ Créer un compte
  </h2>

  <p className="text-gray-400 text-sm text-center mb-6">
    Rejoins la plateforme pour créer ta playlist
  </p>

  <form onSubmit={handleSubmit} className="space-y-5">

    {/* PSEUDO */}
    <div>
      <label className="block text-sm text-gray-300 mb-1">
        Pseudo
      </label>
      <input
        type="text"
        value={pseudo}
        onChange={e => setPseudo(e.target.value)}
        required
        placeholder="ex: JohnDoe"
        className="w-full bg-gray-800 text-white placeholder-gray-500
                   border border-gray-700 rounded-lg px-4 py-2
                   focus:outline-none focus:ring-2 focus:ring-indigo-500
                   transition"
      />
    </div>

    {/* EMAIL */}
    <div>
      <label className="block text-sm text-gray-300 mb-1">
        Email
      </label>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        placeholder="ex: utilisateur@email.com"
        className="w-full bg-gray-800 text-white placeholder-gray-500
                   border border-gray-700 rounded-lg px-4 py-2
                   focus:outline-none focus:ring-2 focus:ring-indigo-500
                   transition"
      />
    </div>

    {/* PASSWORD */}
    <div>
      <label className="block text-sm text-gray-300 mb-1">
        Mot de passe
      </label>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        placeholder="••••••••"
        className="w-full bg-gray-800 text-white placeholder-gray-500
                   border border-gray-700 rounded-lg px-4 py-2
                   focus:outline-none focus:ring-2 focus:ring-indigo-500
                   transition"
      />
    </div>

    {/* BOUTON */}
    <button
      type="submit"
      className="w-full bg-indigo-600 hover:bg-indigo-700
                 text-white font-semibold py-2.5 rounded-lg
                 transition transform hover:scale-[1.02]"
    >
      Créer mon compte
    </button>
  </form>

  {/* LIEN OPTIONNEL */}
  <p className="text-gray-400 text-xs text-center mt-6">
    Déjà un compte ?
    <span className="text-indigo-400 hover:underline cursor-pointer ml-1">
      Se connecter
    </span>
  </p>
</div>

    )
}