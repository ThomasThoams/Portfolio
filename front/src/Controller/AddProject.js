import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  // useState de l'input pour le titre
  const [title, setTitle] = useState("");
  // useState de l'input pour la description
  const [description, setDescription] = useState("");
  // useState de l'input pour la catégorie
  const [category, setCategory] = useState("");
  // useState de l'input pour le lien github
  const [git, setGit] = useState("");
  // useState de l'input pour l'image
  const [file, setFile] = useState();
  // useNavigate pour la navigation
  const navigate = useNavigate();

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
      case "image":
        setFile(e.target.files[0]);
        console.log(e.target.files[0]);
        console.log(file);
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

    // On passe en base 64 l'image choisit
    const reader = new FileReader();
    reader.onload = () => {
      let datas = {
        title: title,
        description: description,
        category: category,
        git: git,
        image: reader.result,
      };

      // On configure la requête
      let req = new Request("/addPost", {
        method: "POST",
        body: JSON.stringify(datas),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      // On envoie la requête
      fetch(req).then((response) => {
        console.log(response);
        navigate("/");
      });
    };
    reader.readAsDataURL(file);

    // On regroupe la data dans un tableau pour l'envoyer au back
  };

  return (
    <main>
      <h1>Ajouter un projet</h1>
      <form>
        <div>
          {/* input du titre du projet */}
          <label htmlFor="title">Titre du projet</label>
          <input type="text" id="title" value={title} onChange={handleChange} />
        </div>

        <div>
          {/* Textarea pour la description */}
          <label htmlFor="description">Description du projet</label>
          <textarea
            id="description"
            value={description}
            onChange={handleChange}
            rows="10"
          />
        </div>

        <div>
          {/* input pour l'image */}
          <input type="file" id="image" onChange={handleChange} />
        </div>

        <div>
          {/* input pour la catégorie */}
          <label htmlFor="category">Catégorie</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={handleChange}
          />
        </div>

        <div>
          {/* input pour le lien github */}
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

export default AddProject;
