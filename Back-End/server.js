
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
const PORT = process.env.PORT || 5000;


//const path = require("path");
//const http = require("http");

dotenv.config();
const app = express();
app.use(express.json());
//mongodb+srv://siadmyriam:migi@cluster0.ltzhjze.mongodb.net/

app.use(cors({ origin: "http://localhost:5173" })); 
//On définit les ressources que le serveur à le droit d'utiliser
 
const JWT_SECRET = process.env.JWT_SECRET;
const DB_URI=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/Users_DB`
mongoose.connect(DB_URI)
.then(() => console.log("Connexion reussie :) "))
.catch((err => console.error(`Erreur de connexion à la base de donnée : ${err}`)));


mongoose.connect(DB_URI)
  .then(() => console.log('Connexion à la base de donnée réussie !'))
  .catch((err) => console.error('Erreur de connexion à la base de donnée :', err));
//On crée le serveur HTTP dédié à socket.io
//const server = http.createServer(app); 
//const io = new Server(server);

// 5. Modèle et Schéma Utilisateur 
const UserSchema = new mongoose.Schema({
    pseudo: { type: String, required: true },
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }, 
});


const HistoriqueSchema = new mongoose.Schema({
    // Référence à l'utilisateur qui a regardé la vidéo
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // 'User' correspond au nom de votre modèle utilisateur
        required: true 
    },
    // Référence à la vidéo qui a été regardée
    videoId: { 
        type: Number, 
        ref: 'Video', // 'Video' correspond au nom de votre modèle vidéo
        required: true 
    },
   videoTags: { type: String, required: true },
    videoThumbnail: { type: String, required: true },
   videoUrl :{ type: String, required: true}, // unique: true },
  
    // Date de l'événement de visionnage
    watchedAt: { 
        type: Date, 
        default: Date.now 
    },
    lastViewedAt:{
         type: Date, 
        default: Date.now 
    }
}, { timestamps: true });


// Création d'index pour optimiser les recherches fréquentes
// On va souvent rechercher l'historique d'un utilisateur (userId) et le trier par date (watchedAt)
//HistorySchema.index({ userId: 1, watchedAt: -1 }); 

const Historique = mongoose.model('Historique', HistoriqueSchema);
const User = mongoose.model("User", UserSchema);

app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.path}`);
    console.log("Body:", req.body);
    next();
});
// 1. Ma fonction de sécurité (définie une seule fois en haut)
const verifierAuth = (req, res, next) => {
    
   try {

      const token = req.headers.authorization.split(' ')[1];
        
       const decodedToken = jwt.verify(token, JWT_SECRET);
    
       console.log(decodedToken)
       req.auth = { userId: decodedToken.userId };

       next(); // C'est bon, passe à la suite ! */

     
   } catch(error) {
  
    console.error('Erreur d\'authentification détaillée :', error.name, error.message);
       //res.status(401).json({ error: 'Interdit !' });
       res.status(401).json({ 
            error: 'Requête non authentifiée. Vérifiez votre token.',
            details: error.name // Optionnel : pour aider au débogage
        });
   }
};
const addVideoToHistory = async (req, res) => {

console.log("🚀🚀🚀 JE SUIS APPELÉ !!!");
    try{
   /* const { videoId, videoUrl, videoTags} = req.body;
    const userId =  req.auth.userId;*/
     const userId = req.auth.userId;
        const { videoId, videoUrl, videoTags,  videoThumbnail } = req.body;
        
        // 🔍 LOGS DE DÉBOGAGE
        console.log("=== DONNÉES REÇUES ===");
        console.log("userId (depuis JWT):", userId);
        console.log("videoId:", videoId);
        console.log("videoUrl:", videoUrl);
        console.log("videoTags:", videoTags);
        console.log("req.body complet:", req.body);
        
   if (!videoId || !videoTags || !videoUrl || !userId) {
        return res.status(400).json({ message: "L'ID de la vidéo est requis." });
    }

                const result = await Historique.findOneAndUpdate(
                { userId, videoId },
                {
                    userId,
                    videoId,
                    videoThumbnail,
                    videoUrl,
                    videoTags,
                    lastViewedAt: new Date()
                },
                { 
                    new: true,
                    upsert: true
                }
            );

            console.log("✅ Résultat de findOneAndUpdate :", result);
            console.log("📝 ID du document :", result._id);
            console.log("👤 UserID :", result.userId);
            console.log("🎬 VideoID :", result.videoId);

            // Vérification immédiate : on relit ce qu'on vient d'écrire
            const verif = await Historique.findById(result._id);
            console.log("🔍 Relecture immédiate :", verif);

            // Comptage total
            const total = await Historique.countDocuments({ userId });
            console.log(`📊 Total d'historiques pour cet utilisateur : ${total}`);

            return res.status(200).json({ 
                message: "Historique mis à jour avec succès",
                data: result 
            });



        }
    catch(err){
        console.error("Erreur d'enregistrement dans l'historique :", err.message);
        return res.status(500).json({ 
            error: "Erreur serveur interne."})
            
    }


}

app.post("/api/historiqueAdd",verifierAuth,addVideoToHistory);

app.get("/api/historique",verifierAuth,async (req, res) => {

    
    try {
            const userId = req.auth.userId
        if (!userId) {
            return res.status(400).json({ error: "UserId manquant dans le token" });
        }
       const historiques = await Historique.find({ userId: userId })
            .sort({ lastViewedAt: -1 });// tri du plus récent au plus ancien

        res.json({
            count: historiques.length,
            historiques
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur lors de la récupération des historiques" });
    }
});



app.post("/api/register", async (req, res) => {
    const { pseudo, email, password } = req.body;

    if (!pseudo || !email || !password) {
        return res.status(400).json({ error: "Veuillez fournir un pseudo, un email et un mot de passe." });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "Email déjà utilisé. Veuillez vous connecter ou utiliser un autre email." });
        }

        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ 
            pseudo, 
            email, 
            password: hashedPassword 
        });
        await newUser.save();

        res.status(201).json({ 
            message: "Utilisateur créé avec succès",
            userId: newUser._id
        });
    } catch (err) {
        console.error("Erreur d'enregistrement :", err.message);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: "Erreur serveur interne lors de l'inscription." });
    }
});
    // 7. Route de Connexion (Login) - Recherche par EMAIL
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body; 

    if (!email || !password) {
        return res.status(400).json({ error: "Veuillez fournir un email et un mot de passe." });
    }

    try {
        // 1. Chercher l'utilisateur par EMAIL
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Email ou mot de passe invalide." }); 
        }

        // 2. Comparer le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Email ou mot de passe invalide." });
        }

        // 3. Générer le jeton JWT
        const payload = {
            userId: user._id, 
            pseudo: user.pseudo 
        };
        
        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET, // Clé secrète du .env
            { expiresIn: '1h' } 
        );

        // 4. Succès : renvoyer le token et le pseudo
        res.json({ 
            message: "Connexion réussie", 
            token: token,
            pseudo: user.pseudo 
        });

    } catch (err) {
        console.error("Erreur de connexion :", err.message);
        res.status(500).json({ error: "Erreur serveur interne lors de la connexion." });
    }
});


// 8. Démarrage du serveur




app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));