// Le main du site, la liste des projets
import { useEffect, useState } from "react";

const Main = () => {
  // Usestate de la liste des projets
  const [liste, setListe] = useState([]);

  useEffect(() => {
    // On récupère la liste des projets avec la route getPost
    fetch("/getPost")
      .then((response) => response.json())
      .then((res) => {
        // Setter de la liste des projets
        setListe(res);
      });
  }, []);

  return (
    <main className="home">
      <h1>Home</h1>
      <p>
        Bienvenue sur mon portfolio ! Vous trouverez ici tous mes projets
        personnel et professionnel
      </p>
      <ul className="home-list">
        {/* la liste des projets est récupéré dans un tableau donc on sépare les données */}
        {liste.map((item) => (
          <li key={item._id}>
            {/* titre du projet et lien pour avoir accès aux détails du projet */}
            <a href={`/project/${item._id}`}>{item.title}</a>
            {/* image du projet */}
            <img src={item.images} alt={item.title} className="img-main" />
            {/* description du projet, nous ne voulons afficher que les 30 premiers caractères de la description */}
            <p>{item.category}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Main;
