// Page pour éditer un projet
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  // variable pour l'id du projet pour pouvoir récupérer les informations dans la BDD
  const { id } = useParams();
  // useState de l'input pour le titre
  const [title, setTitle] = useState("");
  // useState de l'input pour la description
  const [description, setDescription] = useState("");
  // useState de l'input pour la catégorie
  const [category, setCategory] = useState("");
  // useState de l'input pour le lien github
  const [git, setGit] = useState("");
  // useNavigate pour la navigation
  const navigate = useNavigate();

  useEffect(() => {
    // Requête avec l'id du projet pour récupérer les informations du projet
    fetch(`/project/${id}`)
      .then((response) => response.json())
      .then((res) => {
        // Setter des informations du projet
        // Set du titre
        setTitle(res.title);
        // Set de la description
        setDescription(res.description);
        // Set de la categorie
        setCategory(res.category);
        // Set du github
        setGit(res.github);
      });
  }, []);

  const handleChange = (e) => {
    // Switch des setters des inputs
    switch (e.target.id) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "category":
        setCategory(e.target.value);
        break;
      case "git":
        setGit(e.target.value);
        break;
      default:
        return "";
    }
  };

  const submit = (e) => {
    // on empêche le realod de la page au submit
    e.preventDefault();

    // On regroupe les infos dans un objet
    let datas = {
      title: title,
      description: description,
      category: category,
      git: git,
    };

    // On configure la requête
    let req = new Request(`/update/${id}`, {
      method: "POST",
      body: JSON.stringify(datas),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // Et on envoie la requête
    fetch(req).then((response) => {
      console.log(response);
      navigate("/");
    });
  };
  return (
    <main>
      <form>
        <div>
          {/* input pour le titre */}
          <label htmlFor="title">Titre</label>
          <input type="text" id="title" value={title} onChange={handleChange} />
        </div>

        <div>
          {/* input pour la description */}
          <label htmlFor="description">Description du projet</label>
          <textarea
            id="description"
            value={description}
            onChange={handleChange}
            rows="10"
          />
        </div>

        <div>
          {/* input pour la categorie */}
          <label htmlFor="category">Catégorie</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={handleChange}
          />
        </div>

        <div>
          {/* input pour le Github */}
          <label htmlFor="git">Github</label>
          <input type="text" id="git" value={git} onChange={handleChange} />
        </div>
        <div>
          {/* input pour envoyer le formulaire */}
          <input
            type="submit"
            name="Publier"
            onClick={submit}
            className="submitBtn"
          />
        </div>
      </form>
    </main>
  );
};

export default Edit;
