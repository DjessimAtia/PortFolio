const gallery = document.querySelector('.gallery');
const filtres = document.querySelector('.filtres');
const galleryModal = document.querySelector('.gallery-modal');
const modal = document.getElementById('modal');
const selectForm = document.querySelector('#Categories');

const token = sessionStorage.getItem('token');

// Point d'entrée du script
main();

async function main() {
  await GetFiltres();
  await getWorks();
  await affichageAdmin();
}

// Effectue une requête API pour récupérer les travaux
async function getWorks(categoryId) {
  try {
    // On récupère les données de l'API dans une variable response
    const response = await fetch("http://localhost:5678/api/works");
    // On crée une variable data pour récupérer les données traduites grâce à .json()
    const data = await response.json();
    // On vide la galerie pour les mises à jour du serveur
    gallery.innerHTML = "";
    // On itère sur chaque élément du tableau 'data' qui contient les travaux
    data.forEach(project => {
      if (categoryId == project.category.id || categoryId == null) {
        // On rentre dans la fonction displayWorks le tableau des travaux
        displayWorks(project);
      }
    });
    // Vider le contenu de la galerie de la modal
    galleryModal.innerHTML = "";
    data.forEach(project => {
      displayModal(project);
    });
    // Si on ne récupère pas les travaux, afficher un message d'erreur
  } catch (error) {
    console.error("An error occurred while retrieving works:", error);
    gallery.classList.remove('gallery');
    gallery.textContent = "Oups... Suite à un problème technique, la galerie n'est pas disponible, veuillez réessayer ultérieurement";
  }
}

// On récupère l'argument project qu'on traduit en dataWork
function displayWorks(dataWork) {
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  img.src = dataWork.imageUrl;
  img.alt = dataWork.title;
  img.id = dataWork.categoryId;
  const figcaption = document.createElement('figcaption');
  figcaption.textContent = dataWork.title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}

async function GetFiltres() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();
    boutonTout();

    data.forEach(filtre => {
      createOption(filtre);
      createFiltre(filtre);
    });

    const buttons = document.querySelectorAll(".filtres .bouton");
    buttons.forEach(button => {
      button.addEventListener("click", function () {
        let buttonTag = button.dataset.tag;
        let categorieId = button.getAttribute("data-id");
        buttons.forEach(button => button.classList.remove("selected"));
        this.classList.add("selected");
        getWorks(categorieId);
      });
    });
  } catch {
    console.error("An error occurred while retrieving works:");
    filtres.innerHTML = "Oups... Suite à un problème technique, les filtres ne sont pas disponibles, veuillez réessayer ultérieurement";
  }
}
//Creation des boutons grace a l'API
function createFiltre(category) {
  const bouton = document.createElement('div');
  bouton.classList.add('bouton');
  bouton.textContent = category.name;
  bouton.setAttribute("data-tag", category.name);
  bouton.setAttribute("data-id", category.id);
  filtres.appendChild(bouton);
}

  function createOption(category) {
    // Créer un nouvel élément <option>
    const optionForm = document.createElement("option");
  // Définir l'attribut "value" de l'élément <option> avec l'ID de la catégorie
    optionForm.setAttribute("value", category.id);
  // Définir le texte interne de l'élément <option> comme étant le nom de la catégorie
    optionForm.innerText = category.name;
  // Ajouter l'élément <option> créé à l'élément <select> avec l'ID "Categories"
    selectForm.appendChild(optionForm);
  }
//Creation du bouton Tout 
function boutonTout() {
  const boutonTout = document.createElement('div');
  boutonTout.classList.add('bouton');
  boutonTout.classList.add('selected');
  boutonTout.textContent = 'Tout';
  boutonTout.setAttribute('data-tag', 'Tout');
  filtres.appendChild(boutonTout);
  
}

async function affichageAdmin() {
  if (token) {
    const baniere = document.querySelector('.Baniere');
    baniere.classList.replace('Baniere', 'baniere');
    filtres.classList.add('hidden');
    console.log('Token valide.');
    const icone = document.querySelector('.hidden');
    icone.classList.remove('hidden');
    const fleche = document.querySelector('.hidden');
    fleche.classList.remove('hidden');
    const modifier = document.querySelector('.hidden');
    modifier.classList.replace('hidden', 'modifier');
    //recuperation de login pour le mettre en logout pour la deconnexion 
    const login = document.getElementById('login');
    
    login.innerHTML = 'logout';

    login.addEventListener('click', function() {
      console.log('tes deconnecter mec hmhmhmh')
      // Supprimer le jeton de la session
      sessionStorage.removeItem('token');
      // Recharger la page après la déconnexion
      location.reload();
    });
    
  
    
   
    const croix = document.getElementById('Premiere-croix');
    modifier.addEventListener("click", function () {
      modal.classList.remove('hidden');
      const modalDelete = document.getElementById('modal-delete')
      modalDelete.classList.remove('hidden')
      console.log('Bouton pour modal');
    });
    croix.addEventListener('click', function () {
      modal.classList.add('hidden');
      console.log('Bouton pour fermer la modal');
    });
  } else {
    console.log('Token invalide.');
  }
}
//Affichage de la modal 
function displayModal(project) {
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  img.src = project.imageUrl;
  img.alt = project.title;
  img.id = project.categoryId;
  img.classList.add('gallery-modal-img');
  const div = document.createElement('div');
  div.classList.add('img-fond');
  div.id = project.categoryId;
  const img1 = document.createElement('img');
  img1.src = './assets/icons/trash-can-solid.svg';
  img1.classList.add('img-overlay');
  const figcaption = document.createElement('figcaption');
  figcaption.textContent = 'editor';
  figure.appendChild(img);
  figure.appendChild(figcaption);
  div.appendChild(img1);
  figure.appendChild(div);
  galleryModal.appendChild(figure);
  div.addEventListener('click', function (event) {
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");
    if (confirmation) {
      deleteProject(project.id);
    }
    console.log('Élément supprimé :', project.categoryId);
  });
}

const boutonModal = document.querySelector('.bouton-modal');
boutonModal.addEventListener('click', function () {
  const modalDelete = document.getElementById('modal-delete')
  modalDelete.classList.add('hidden')
  const DeuxiemeModal = document.getElementById('modal-ajout');
  DeuxiemeModal.classList.remove('hidden');
  const flecheGauche = document.querySelector('.fleche');
  flecheGauche.addEventListener('click', function () {
    DeuxiemeModal.classList.add('hidden');
    modalDelete.classList.remove('hidden')
  });
  const croix = document.getElementById('Deuxieme-croix');
  croix.addEventListener('click', function () {
   modal.classList.add('hidden')
   DeuxiemeModal.classList.add('hidden')
    console.log('Fermer la modal');
  });
 // Fermeture de la modal quand on click en dehors 
  modal.addEventListener('click', function(event){
    if(event.target == modal){
    modal.classList.add('hidden')
    DeuxiemeModal.classList.add('hidden')}
  })
  
});
//Supression de Projet
async function deleteProject(id) {
  try {
    // Envoyer une requête pour supprimer un projet
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      //la method pour indiquer ce que l'on veut faire 
      method: "DELETE",
      headers: {
        "Accept": "*/*",
        "Authorization": "Bearer " + token,
      },
    });

    if (response.ok) {
      await getWorks(); // Attendre la récupération des travaux avant de mettre à jour la galerie
    }
  } catch (error) {
    console.error("Une erreur s'est produite lors de l'envoi de la requête :", error);
  }
}

//Incorporation de Photo dans le Formulaire
const labelAjoutPhoto = document.getElementById('add-photo');
const inputAjoutPhoto = document.getElementById('add-photo-input');

// Événement lorsque l'utilisateur clique sur le label
labelAjoutPhoto.addEventListener('click', function() {
  // Ouvrir la boîte de dialogue de sélection de fichier
  inputAjoutPhoto.click();
});

// Événement lorsque l'utilisateur a choisi une image
inputAjoutPhoto.addEventListener('change', function() {
  // Récupérer le fichier sélectionné par l'utilisateur
  const file = inputAjoutPhoto.files[0];

  // Vérifier si un fichier a été sélectionné
  if (file) {
    // Créer un objet URL pour représenter l'image sélectionnée
    const imageURL = URL.createObjectURL(file);

    // Créer une image pour afficher l'aperçu de l'image
    const imagePreview = document.createElement('img');
    imagePreview.classList.add('preview-img')
    imagePreview.src = imageURL;

    // Remplacer le contenu du label par l'image sélectionnée
    labelAjoutPhoto.innerHTML = '';
    labelAjoutPhoto.appendChild(imagePreview);
  }
});

//Rendre le Bouton valider Vert des que le formulaire est rempli
// Éléments du formulaire
const titleInput = document.getElementById('title');
const categoriesSelect = document.getElementById('Categories');
const validerButton = document.getElementById('valider');


// Fonction pour vérifier si tous les champs du formulaire sont remplis
function VerificationBouton() {
  const title = titleInput.value;
  const categories = categoriesSelect.value;
  const imageFile = inputAjoutPhoto.files[0]; // Récupérer l'image sélectionnée

  // Vérifier si tous les champs sont remplis
  const FormulaireRempli = title.trim() !== '' && categories !== '' && imageFile;

  // Appliquer la couleur verte au bouton si le formulaire est valide
  if (FormulaireRempli) {
    validerButton.classList.add('selected');
  } else {
    validerButton.classList.remove('selected'); // Réinitialiser la couleur du bouton
  }
}

// Ajouter des écouteurs d'événements pour les champs du formulaire
titleInput.addEventListener('input', VerificationBouton);
categoriesSelect.addEventListener('change', VerificationBouton);
inputAjoutPhoto.addEventListener('change', VerificationBouton);
labelAjoutPhoto.addEventListener('click', VerificationBouton);

const valider = document.getElementById('valider');
valider.addEventListener('click', function () {
  EnvoieProject();
  console.log('valider');
});

//Envoie de nouveau Projet 
async function EnvoieProject() {
  const title = document.getElementById('title').value;
  const categories = document.getElementById('Categories').value;
  let imageFile = inputAjoutPhoto.files[0];


  let formData = new FormData();
  formData.append('title', title);
  formData.append('category', categories);
  formData.append('image', imageFile);

  try {
    const response = await fetch('http://localhost:5678/api/works', {
      //method post pour envoyer 
      method: 'POST',
      headers: {
        Accept: '*/*',
        //verification 
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    });

    if (response.ok) {
      console.log('Photo envoyée avec succès');
      await getWorks();
    } else {
      console.error("Échec de l'envoi de la photo");
    }
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de l'envoi de la requête:",
      error
    );
  }
}