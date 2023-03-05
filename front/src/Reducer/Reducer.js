// Un reducer pour la connexion, on donne un state idUser à l'utilisateur s'il est nul l'utilisateur
// n'est pas connecté, s'il a une valeur c'est que l'utilisateur c'est connecté/ est connecté
import { CONNECT_USER, DECONNECT_USER } from "../Constants/action.js";

let stateInit;
if (sessionStorage.getItem("session")) {
  //s'il le state a déjà une session on lui redonne
  stateInit = JSON.parse(sessionStorage.getItem("session"));
} else {
  stateInit = {
    // sinon on met la valeur à nul
    idUser: null,
  };
}
const reducer = (state = stateInit, action = {}) => {
  //gestion des actions du Reducer
  switch (action.type) {
    // Si l'utilisateur ce connecte idUser sera égal à l'email
    case CONNECT_USER:
      return {
        ...state,
        idUser: action.id,
      };
    // L'utilisateur ce déconnecte idUser est égale à nul
    case DECONNECT_USER:
      return {
        ...state,
        idUser: null,
      };
    default:
      return state;
  }
};

export default reducer;
