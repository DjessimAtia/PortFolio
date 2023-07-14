const erreur = document.querySelector('.error')
// Fonction asynchrone pour gérer la connexion
async function login() {
  // Récupération des éléments de formulaire par leur ID
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  // Création de l'objet user pour envoyer à l'API
  const user = {
    email: email.value,
    password: password.value
  };

  // Envoi de la requête POST à l'API pour la connexion de l'utilisateur
  try{
  let response = await fetch('http://localhost:5678/api/users/login', {
    //La method 'POST' sert a  créer une resource de connexion utilisateur sur le serveur
    method: 'POST',
    // Cela permet au serveur de recevoir et de traiter correctement les informations de connexion fournies par l'utilisateur.
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    // Conversion de l'objet user en chaîne JSON et affectation au corps de la requête
    body: JSON.stringify(user)
  });

  // Vérification du statut de la réponse
  if (response.ok) {

    // Redirection vers la page index.html si la connexion est réussie
    let data = await response.json();
    sessionStorage.setItem("token", data.token);
    
    document.location.href = "index.html";
    console.log('Valider');
  } else {
    // Affichage de l'erreur si la réponse n'est pas OK
   
   erreur.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
  }
} catch(e){
  console.log(e)
  erreur.innerHTML = ('Probleme sur le site veuillez vous recconecter ultierreurment')
}
}
// Gestionnaire d'événement pour le clic sur le bouton de soumission
const submit = document.getElementById('submit');
submit.addEventListener('submit', function (event) {
  event.preventDefault();
  login();
});

