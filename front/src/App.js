import "./App.css";
import Header from "./Component/Header.js";
import Main from "./Component/Main.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connexion from "./Controller/Connexion";
import Footer from "./Component/Footer";
import Admin from "./Component/Admin";
import AddProject from "./Controller/AddProject";
import { useSelector } from "react-redux";
import ProjectCard from "./Component/ProjectCard";
import Edit from "./Controller/Edit";

function App() {
  const idUser = useSelector((state) => state);
  return (
    <>
      <Header />

      <BrowserRouter>
        <Routes>
          {/* route home */}
          <Route path="/" element={<Main />} />
          {/* route pour la connexion */}
          <Route path="/login" element={<Connexion />} />
          {/* route pour avoir les informations projets */}
          <Route path="/project/:id" element={<ProjectCard />} />
          {/* Si l'utilisateur est connecté redirige à la page de la liste des projets côté admin sinon
          redirection au home */}
          {idUser.idUser === null || idUser.idUser === undefined ? (
            <Route path="/" element={<Main />} />
          ) : (
            <Route path="/admin" element={<Admin />} />
          )}
          {/* Si l'utilisateur est connecté redirige à la page pour créer un projet côté admin sinon
          redirection au home */}
          {idUser.idUser === null || idUser.idUser === undefined ? (
            <Route path="/" element={<Main />} />
          ) : (
            <Route path="/add_project" element={<AddProject />} />
          )}
          {/* Si l'utilisateur est connecté redirige à la page pour éditer un projet déjà existant sinon
          redirection au home */}
          {idUser.idUser === null || idUser.idUser === undefined ? (
            <Route path="/" element={<Main />} />
          ) : (
            <Route path="/edit_project/:id" element={<Edit />} />
          )}
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
