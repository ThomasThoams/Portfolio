// La liste des activités côté admin, on peut supprimer un projet

import { useEffect, useState } from "react";

const Admin = () => {
  // useState de la liste des projets
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

  // Au clique on envoie une requête à l'api pour supprimer le projet demandé de la BDD
  function deleteOnClick(id) {
    // On configure la route
    let req = new Request(`/deletePost/${id}`, {
      method: "DELETE",
    });
    // On envoi la demande
    fetch(req)
      .then((response) => response.json())
      .then((res) => {
        window.location.reload();
        // On recharge la page pour mettre à jour la liste
      });
  }

  return (
    <main>
      <h1>Admin</h1>
      <a className="back" href="/add_project">
        Ajouter un article
      </a>
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th className="description">Article</th>
            <th className="categorie">Catégorie</th>
            <th className="action">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* la liste des projets est récupéré dans un tableau donc on sépare les données */}
          {liste.map((item) => (
            <tr key={item._id}>
              <td>
                {/* titre du projet */}
                <a href={`/project/${item._id}`} className="projectLink">
                  {item.title}
                </a>
              </td>
              {/* description du projet */}
              {/* On ne veut afficher que les 30 premiers caractère de la description */}
              <td className="description">
                {item.description.substring(0, 30)}...
              </td>
              {/* Catégorie du projet */}
              <td className="categorie">{item.category}</td>
              <td className="action">
                {/* bouton pour editer un projet */}
                <a className="edit" href={`/edit_project/${item._id}`}>
                  <i className="fa fa-pencil"></i>
                </a>
                {/* bouton pour supprimer un projet */}
                <a
                  className="remove"
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteOnClick(item._id);
                  }}
                >
                  <i className="fa fa-remove"></i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Admin;
