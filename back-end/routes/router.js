import express from "express";

const router = express.Router();

//appel de mes controllers
import { Details } from "../controllers/details.js";
import {
  GetPost,
  AddPostSubmit,
  DeletePost,
  Update,
} from "../controllers/admin.js";
import { LoginSubmit, Logout } from "../controllers/login.js";

// Route pour avoir tout les projets
router.get("/getPost", GetPost);

// Route pour ajouter un projet
router.post("/addPost", AddPostSubmit);

// Route pour supprimer un projet
router.delete("/deletePost/:id", DeletePost);

// Route du login

router.post("/login", LoginSubmit);

// Route pour la deconnexion

router.get("/logout", Logout);

// Route pour avoir les informations d'un projet

router.get("/project/:id", Details);

// Route pour editer un projet

router.post("/update/:id", Update);

export default router;
