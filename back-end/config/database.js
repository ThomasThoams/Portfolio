import mongoose from "mongoose";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();

// Replace the uri string with your connection string.
//connexion à la base de données
mongoose.connect(process.env.MONGODB);

// message d'erreur si la connexion à la base de données à échoué
mongoose.connection.on("error", () => {
  console.log("Erreur lors de la connexion à la base de données");
});

// message de réussite si la connexion à la base de données à bien fonctionné
mongoose.connection.on("open", () => {
  console.log("Connexion à la base de données établie");
});

// Schema du projet pour la BDD
let ProjectSchema = mongoose.Schema({
  title: String,
  description: String,
  category: String,
  images: String,
  github: String,
  date: Date,
});
let Project = mongoose.model("Project", ProjectSchema);

// Schema d'un utilisateur pour la BDD
let UserSchema = mongoose.Schema({
  email: String,
  password: String,
});
let User = mongoose.model("User", UserSchema);

// La partie admin ne doit être accéssible que pour nous donc nous allons créer un utilisateur unique
// lors du lancement du back-end et allons enlever la création de cette utilisateur par la suite,
// Je l'ai laissé en commentaire pour vous

// bcrypt.hash("thomas", 1, (err, result) => {
//   let admin = new User({
//     email: "admin@admin.fr",
//     password: result,
//   });
//   admin.save();
// });

export { Project, User };
