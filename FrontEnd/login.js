// Fonction asynchrone pour gérer la connexion
async function login() {
  // Récupération des éléments de formulaire par leur ID
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  // Création de l'objet data pour envoyer à l'API
  const data = {
    email: email.value,
    password: password.value
  };

  // Envoi de la requête POST à l'API pour la connexion de l'utilisateur
  let response = await fetch('http://localhost:5678/api/users/login', {
    //La method 'POST' sert a  créer une resource de connexion utilisateur sur le serveur
    method: 'POST',
    // Cela permet au serveur de recevoir et de traiter correctement les informations de connexion fournies par l'utilisateur.
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    // Conversion de l'objet data en chaîne JSON et affectation au corps de la requête
    body: JSON.stringify(data)
  });

  // Vérification du statut de la réponse
  if (response.ok) {
    // Redirection vers la page index.html si la connexion est réussie
    response = response.token ;
    document.location.href = "admin.html";
    console.log('Valider');
  } else {
    // Affichage de l'erreur si la réponse n'est pas OK
    const erreur = document.querySelector('.error')
   erreur.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
  }
}

// Gestionnaire d'événement pour le clic sur le bouton de soumission
const submit = document.getElementById('submit');
submit.addEventListener('click', function (event) {
  event.preventDefault();
  login();
});