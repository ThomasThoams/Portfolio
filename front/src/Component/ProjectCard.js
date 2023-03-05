// Page des détails du projet
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProjectCard = () => {
  // Usestate des informations du projets
  const [project, setProject] = useState([]);
  // variable pour l'id du projet pour pouvoir récupérer les informations dans la BDD
  const { id } = useParams();

  useEffect(() => {
    // Requête avec l'id du projet pour récupérer les informations du projet
    fetch(`/project/${id}`)
      .then((response) => response.json())
      .then((res) => {
        // Setter des informations du projet dans un tableau
        setProject(res);
      });
  }, []);

  return (
    <>
      <section className="projet-detail">
        {/* titre du projet */}
        <h2>{project.title}</h2>
        <nav>
          {/* lien github du projet nous ne voulons pas que l'utilisateur quitte le site donc on 
          utilise target="_blank"  pour ouvrir le github dans un nouvel onglet*/}
          <a href={project.github} target="_blank" rel="noreferrer">
            Github du projet
          </a>
        </nav>
        {/* image du projet */}
        <img src={project.images} alt="projet" className="img-project" />
        {/* description du projet */}
        <p>{project.description}</p>
        <p>Catégorie de projet : {project.category}</p>
      </section>
    </>
  );
};

export default ProjectCard;
