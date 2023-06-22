const portfolioSection = document.getElementById('portfolio');
let Count = 0; // Variable pour stocker l'ID de la catégorie sélectionnée
const galleryDiv = document.createElement('div'); // Crée un élément div pour contenir la galerie
// Crée une div pour contenir les boutons filtres
const filtreDiv = document.createElement('div');

/*CODE PRINCIPAL*/

main();

async function main() {
  await GetFiltres(); // Récupère les filtres depuis l'API
  await getWorks(); // Récupère les travaux depuis l'API
}

/*FUNCTION*/
/*WORK*/
async function getWorks() {
  // Effectue une requête API pour récupérer les travaux
  // On recupere les données de l'api dans une variables response
  const response = await fetch("http://localhost:5678/api/works");
  // On cree une variables data pour recuperer les données traduire grace a .json()
  const data = await response.json();
  // Ajoute la classe 'gallery' à la div de la galerie
  galleryDiv.classList.add('gallery');
  // Ajoute la div de la galerie au portfolioSection 
  portfolioSection.appendChild(galleryDiv);
  // On itère sur chaque élément du tableau 'data' qui contient les travaux
  data.forEach(project => {
    //On rentre dans la fonction displayWorks le tableau des travaux
    displayWorks(project);
  });
}
//On recuperer l'argument project qu'on traduit en dataWork
function displayWorks(dataWork) {
  // Vérifie si la catégorie de l'image correspond à la catégorie sélectionnée
  if (Count === 0 || dataWork.categoryId === Count) {
    // Crée un élément figure pour chaque travaux
    const figure = document.createElement('figure');
    //On cree une variables img qui va recuperer tout les donnée(image,titre,id)
    const img = document.createElement('img');
    img.src = dataWork.imageUrl;
    img.alt = dataWork.title;
    img.id = dataWork.categoryId;
    //figcaption va recuperer le text contenue pour l'afficher 
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = dataWork.title;
    // La div figure va contnir la balise img et figcaption
    figure.appendChild(img);
    figure.appendChild(figcaption);
    // Ajoute la figure à la galerie
    galleryDiv.appendChild(figure);
  }
}
/*FILTRES*/
async function GetFiltres() {
  // Effectue une requête API pour récupérer les filtres
  const response = await fetch("http://localhost:5678/api/categories");
  const data = await response.json();
  filtreDiv.classList.add('filtres');
  // Ajoute la div des filtres au portfolioSection
  portfolioSection.appendChild(filtreDiv);
  // Crée un bouton nommé "Tout" avec l'id 0 pour représenter tous les travaux
  const boutonTout = document.createElement('div');
  boutonTout.classList.add('bouton');
  boutonTout.textContent = 'Tout';
  boutonTout.id = '0';
  // Ajoute le bouton "Tout" à la div des filtres
  filtreDiv.appendChild(boutonTout);
  // Parcourt les données des filtres et crée un bouton pour chaque iteration
  data.forEach(filtre => {
    //on cree une div bouton, on lui donne la class css('bouton') on lui donne les données reccuperer et on le place dans la filtreDiv
    const bouton = document.createElement('div');
    bouton.classList.add('bouton');
    bouton.textContent = filtre.name;
    bouton.id = filtre.id;
    filtreDiv.appendChild(bouton);


  });
  filtreDiv.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('bouton')) {
      // On supprime la classe 'selected' de tous les boutons
      const boutons = filtreDiv.getElementsByClassName('bouton');
      for (let i = 0; i < boutons.length; i++) {
        boutons[i].classList.remove('selected');
      }

      // On ajoute la classe 'selected' au bouton cliqué
      target.classList.add('selected');

      // On récupère l'ID de la catégorie du bouton cliqué
      const categoryId = parseInt(target.id);

      // On met à jour la galerie avec la nouvelle catégorie sélectionnée
      updateGallery(categoryId);
    }
  })
}

function updateGallery(categoryId) {
  // Réinitialise la galerie
  galleryDiv.innerHTML = ' ';

  // Met à jour la variable de catégorie sélectionnée
  Count = categoryId;

  // Affiche les travaux correspondant à la catégorie sélectionnée
  getWorks()

};
