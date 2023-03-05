import express from "express";
import session from "express-session";
import parseurl from "parseurl";
import router from "./routes/router.js";
const app = express();

// on indique à express où sont les fichiers statiques js, image et css
app.use(express.static("public"));

//pour l'utilisation du json à la réception des données formulaire, on fixe une limite de 50mb pour
// les fichiers, l'envoie des images sur cloudinary
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true })); // x-www-form-urlencoded

// Initialisation du système de session
//On créé une session dans le back pour protéger les routes
app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 },
  })
);

// protection de l'api
// Seulement une personne avec une session pourra accéder à ces routes
app.use((req, res, next) => {
  let pathname = parseurl(req).pathname.split("/");
  let protectedPath = ["addPost", "deletePost", "update"];
  // Si la session isAdmin n'existe pas et que l'URL fait des parties des URL protégées
  if (!req.session.isAdmin && protectedPath.includes(pathname[1])) {
    // L'accès lui est interdit
    res.status(400).json({ message: "Accès interdit" });
  } else {
    next();
  }
});

//appel du routeur
app.use("/", router);

// lancement du serveur sur un port choisi
app.listen(5000, () => {
  console.log("listening port " + 5000 + " all is ok");
});
