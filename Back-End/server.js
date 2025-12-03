
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

app.use(cors({ origin: "http://localhost:5173" })); 
//On définit les ressources que le serveur à le droit d'utiliser
app.use(express.json()); 

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/User_DB`)
.then(() => console.log("Connexion reussie :) "))
.catch((err => console.error(`Erreur de connexion à la base de donnée : ${err}`)));


//On crée le serveur HTTP dédié à socket.io
//const server = http.createServer(app); 
//const io = new Server(server);

// 5. Modèle et Schéma Utilisateur 
const UserSchema = new mongoose.Schema({
    pseudo: { type: String, required: true },
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }, 
});



const User = mongoose.model("User", UserSchema);

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

});


app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));