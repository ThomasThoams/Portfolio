import { User } from "../config/database.js";
import bcrypt from "bcrypt";

// Requête pour la connexion
export const LoginSubmit = (req, res) => {
  // On va vérifier si l'utilisateur avec cet email existe en BDD ou pas
  User.findOne({ email: req.body.email }, (err, admin) => {
    // Si il existe
    if (admin) {
      bcrypt.compare(req.body.pwd, admin.password, (err, result) => {
        // Si le mot de passe est correct alors on créé la session
        if (result) {
          req.session.isAdmin = true;
          // On retourne un message de validation
          return res.status(200).json({ message: "OK" });
        }
        // Sinon on affiche un message d'erreur
        else {
          return res.status(404).json({ message: "identifiant incorect" });
        }
      });
    }
  });
};

//Requête pour la déconnexion
export const Logout = (req, res) => {
  // On détruit la session
  req.session.destroy();
  return res.status(200).json({ message: "Déconnecté" });
};
