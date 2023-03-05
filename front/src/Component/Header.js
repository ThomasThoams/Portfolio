// Header du portfolio ou sont présent les informations, les liens vers le git et linkedin et
// la connexion côté admin
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Header = () => {
  // On récupère la state pour savoir si l'utilisateur est connecté ou non
  const idUser = useSelector((state) => state);
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    // On configure la route
    let req = new Request("/logout", {
      method: "GET",
    });
    // on envoie la demande de déconnexion et on change la state du reducer avec le dispatch
    fetch(req).then(
      dispatch({
        type: "DECONNECT_USER",
      })
    );
  };
  return (
    <header className="blog-header">
      {/* Si l'utilisateur n'est pas connecté (c'est un visiteur) il doit voir le lien 
      pour se connecter, le lien github et le lien linkedin*/}
      {idUser.idUser === null || idUser.idUser === undefined ? (
        <div className="blog-headerDiv">
          <div className="div-imgCV">
            <img
              src="https://res.cloudinary.com/dqkdjkmtc/image/upload/v1676975944/photo_2_nzxoh0.jpg"
              alt="Thomas Miramont"
              className="imgCV"
            />
          </div>
          <h1>Portfolio Thomas Miramont</h1>
          <nav>
            {/* Lien pour le homme/main*/}
            <a href="/">
              {/* icone maison pour home */}
              <i className="fa fa-home"></i>Home
            </a>
            {/* Lien pour la connexion */}
            <a href="/login">
              {/* icone rouage pour admin */}
              <i className="fa fa-cogs"></i> Admin
            </a>
            {/* Lien pour le github */}
            <a
              href="https://github.com/ThomasThoams"
              target="_blank"
              rel="noreferrer"
            >
              {/* icone github pour github */}
              <i className="fa fa-github"></i> Github
            </a>
            {/* Lien pour le linkedin */}
            <a
              href="https://www.linkedin.com/in/thomas-miramont-6012b914a/"
              target="_blank"
              rel="noreferrer"
            >
              {/* icone linkedin pour linkedin */}
              <i className="fa fa-linkedin"></i> Linkedin
            </a>
          </nav>
        </div>
      ) : (
        // Si l'utilisateur est connecté il doit avoir accès au lien pour le côté admin
        <div className="blog-headerDiv">
          <img
            src="https://res.cloudinary.com/dqkdjkmtc/image/upload/v1676975944/photo_2_nzxoh0.jpg"
            alt="Thomas Miramont"
            className="imgCV"
          />
          <h1>Thomas Miramont</h1>
          <nav>
            {/* Lien pour le homme/main*/}
            <a href="/">
              {/* icone maison pour home */}
              <i className="fa fa-home"></i>Home
            </a>
            {/* Lien pour la liste des projets côté admin */}
            <a href="/admin">
              {/* icone rouage pour admin */}
              <i className="fa fa-cogs"></i> Administration
            </a>
            {/* Lien pour la deconnexion */}
            <a href="/" onClick={submit}>
              {/* icone personnage pour deconnexion */}
              <i className="fa fa-user"></i> Se déconnecter
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
