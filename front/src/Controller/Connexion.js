//  Controller pour la connexion de l'utilisateur
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Connexion = () => {
  // useState de l'input pour l'email
  const [email, setEmail] = useState("");
  // useState de l'input pour le mot de passe
  const [password, setPassword] = useState("");
  // useState de l'input pour le message d'erreur si le mdp est mauvais
  const [message, setMessage] = useState("");
  // useNavigate pour la navigation
  const navigate = useNavigate();

  //useDispatch permettra d'appeler une action du reducer afin d'écrire dans le styate global
  const dispatch = useDispatch();

  // Setter de l'email
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  // Setter du mot de passe
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const submit = () => {
    //On récupère les infos de connexion dans un objet avant de l'envoyer pour la vérification
    let datas = {
      email: email,
      pwd: password,
    };

    // Paramètre de la requête
    let req = new Request("/login", {
      method: "POST",
      body: JSON.stringify(datas),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // envoie de la requête
    fetch(req)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        // On récupère la réponse du back si c'est "ok" alors tout est bon l'utilisateur est connecté
        if (response.message === "OK") {
          // On va donner une valeur à l'id dans le reducer pour reconnaitre la connexion
          dispatch({
            type: "CONNECT_USER",
            id: datas.email,
          });
          // on envoie l'utilisateur sur les pages côtés admin
          navigate("/admin");
        } else {
          // Si le mot de passe est incorrect on affiche un message
          setMessage(response.message);
        }
      });
  };

  return (
    <main>
      <h1>Connexion admin</h1>
      <p style={{ color: "red" }}>{message}</p>
      <form>
        <div>
          {/* Input de l'email */}
          <label htmlFor="email">Identifiant</label>
          <input type="email" id="email" value={email} onChange={changeEmail} />
        </div>

        <div>
          {/* Input du mot de passe */}
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={changePassword}
          />
        </div>
        {/* Bouton pour la connexion */}
        <button className="submitBtn" type="button" onClick={submit}>
          Se connecter
        </button>
      </form>
    </main>
  );
};
export default Connexion;
