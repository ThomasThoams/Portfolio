import { Project } from "../config/database.js";

// Requête api pour récupérer les informations d'un projet précis
export const Details = (req, res) => {
  // Il y a plusieurs articles, on récupère un paramètre
  // id dans l'URL pour exécuter notre requête sur le bon article
  let id = req.params.id;

  // requête mongo pour récupérer les informations d'un projet précis
  Project.findOne({ _id: id }, (error, post) => {
    // On retourne les informations du projet
    return res.status(200).json(post);
  });
};
