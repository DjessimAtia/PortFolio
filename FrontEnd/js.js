/*CODE PRINCIPAL*/

// Point d'entrée du script
main();

/*FUNCTION*/

/*WORK*/

// Effectue une requête API pour récupérer les travaux
async function getWorks(categoryId) {
  // On récupère les données de l'API dans une variable response

  // On crée une variable data pour récupérer les données traduites grâce à .json()

  // On itère sur chaque élément du tableau 'data' qui contient les travaux
  // On rentre dans la fonction displayWorks le tableau des travaux
}

// On récupère l'argument project qu'on traduit en dataWork
function displayWorks(dataWork) {
  // Crée un élément figure pour chaque travail

  // On crée une variable img qui va récupérer toutes les données (image, titre, id)

  // figcaption va récupérer le texte contenu pour l'afficher

  // La div figure va contenir la balise img et figcaption

  // Ajoute la figure à la galerie
}

/*FILTRES*/

async function GetFiltres() {
  // Effectue une requête API pour récupérer les catégories

  // On crée une variable data pour récupérer les données traduites grâce à .json()

  // On itère sur chaque élément de la liste 'data' qui contient les catégories
  // On crée un bouton pour chaque catégorie et on les ajoute au filtre

  // On récupère tous les boutons de filtre

  // Lorsqu'on clique sur un bouton, on récupère la catégorie associée et on affiche les travaux correspondants
}

// Changement de l'index pour le Admin
function token() {
  // On récupère le token de connexion

  // Si le token est valide, on effectue les modifications nécessaires

  // On change le header

  // On affiche l'icône de figure

  // On affiche l'icône d'article introduction

  // On affiche le bouton pour modal

  // Lorsqu'on clique sur le bouton modifier, on affiche la modal

  // Lorsqu'on clique sur la croix, on ferme la modal
}

function displayModal(project) {
  // Crée un élément figure pour chaque travail

  // On crée une variable img qui va récupérer toutes les données (image, titre, id)

  // La div figure va contenir la balise img et figcaption

  // On ajoute la figure à la galerie

  // Lorsqu'on clique sur la div, on demande une confirmation avant la suppression
  // Si la confirmation est donnée, on supprime l'élément
}

// Point d'entrée du script
main();