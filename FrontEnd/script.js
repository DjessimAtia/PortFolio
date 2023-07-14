const gallery = document.querySelector('.gallery');
const filtres = document.querySelector('.filtres');
const galleryModal = document.querySelector('.gallery-modal');
// Point d'entrée du script
main();

async function main() {
  await GetFiltres();
  await getWorks();
  token();
}
// Effectue une requête API pour récupérer les travaux
async function getWorks(categoryId) {
  try {
     // On récupère les données de l'API dans une variable response
    const response = await fetch("http://localhost:5678/api/works");
    // On crée une variable data pour récupérer les données traduites grâce à .json()
    const data = await response.json();
    //On vide la gallery pour les mise a jours du serveur
    gallery.innerHTML = "";
     // On itère sur chaque élément du tableau 'data' qui contient les travaux
    data.forEach(project => {
      if (categoryId == project.category.id || categoryId == null) {
       // On rentre dans la fonction displayWorks le tableau des travaux
        displayWorks(project);
      }
    });
    galleryModal.innerHTML = ""; // Vider le contenu de la galerie de la modal
    data.forEach(project => {
      displayModal(project);
    });
    //Si on ne reccupere pas les works sa affiche un probleme
  } catch (error) {
    console.error("An error occurred while retrieving works:", error);
    gallery.classList.remove('gallery');
    gallery.textContent = "Oups... Suite à problème technique, la galerie n'est pas disponible, veuillez réessayer ultérieurement";
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
      const bouton = document.createElement('div');
      bouton.classList.add('bouton');
      bouton.textContent = filtre.name;
      bouton.setAttribute("data-tag", filtre.name);
      bouton.setAttribute("data-id", filtre.id);
      filtres.appendChild(bouton);
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
    filtres.innerHTML = "Oups... Suite à problème technique, les filtres ne sont pas disponibles, veuillez rééssayer ultérieurement";
  }
}

function boutonTout() {
  const boutonTout = document.createElement('div');
  boutonTout.classList.add('bouton');
  boutonTout.classList.add('selected');
  boutonTout.textContent = 'Tout';
  boutonTout.setAttribute('data-tag', 'Tout');
  filtres.appendChild(boutonTout);
}

function token() {
  const token = sessionStorage.getItem('token');
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
    const login = document.getElementById('login');
    login.innerHTML = 'logout';
    const modal = document.getElementById('modal');
    const croix = document.getElementById('Premiere-croix');
    modifier.addEventListener("click", function () {
      modal.classList.remove('hidden');
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
    
      figure.remove();
      deleteProject(project.id);
   
    
 console.log('Élément supprimé :', project.categoryId);
    
  });
}

const boutonModal = document.querySelector('.bouton-modal');
boutonModal.addEventListener('click', function () {
  const DeuxiemeModal = document.getElementById('modal-deuxieme');
  DeuxiemeModal.classList.remove('hidden');
  const flecheGauche = document.querySelector('.fleche');
  flecheGauche.addEventListener('click', function () {
    DeuxiemeModal.classList.add('hidden');
  });
 const croix =document.getElementById('Deuxieme-croix')
 croix.addEventListener('click', function(){
  DeuxiemeModal.classList.add('hidden')
  console.log('Fermer la modal')
 })
  
  });
 //Pour afficher une Img et l'integrer sur le label add-photo
  const photo = document.getElementById('add-photo');

  // Ajoute un écouteur d'événement "click" à l'élément avec l'ID "add-photo"
  photo.addEventListener('click', function() {
    // Crée un élément input de type "file"
    const photoInput = document.createElement('input');
    photoInput.type = 'file';
    photoInput.accept = 'image/*';
    // Ajoute la classe "hidden" à l'élément (probablement utilisée pour le masquer visuellement)
    photoInput.classList.add('hidden'); 
  
    // Ajoute un écouteur d'événement "change" à l'élément input
    photoInput.addEventListener('change', function() {
      // Récupère le fichier sélectionné par l'utilisateur
      const file = photoInput.files[0]; 
  
      if (file) {
        // Crée un objet FileReader
        const reader = new FileReader(); 
  
        // Événement déclenché lorsque la lecture du fichier est terminée
        reader.addEventListener('load', function() {
           // Récupère l'URL des données du fichier
          const imageUrl = reader.result;
  
          // Crée un élément img pour afficher la prévisualisation de l'image
          const previewImage = document.createElement('img');
          previewImage.src = imageUrl;
          previewImage.classList.add('preview-img');
  
          // Crée un conteneur pour l'image prévisualisée
          const previewContainer = document.createElement('div');
          previewContainer.classList.add('img-container');
          previewContainer.appendChild(previewImage); // Ajoute l'image à ce conteneur
          // Efface le contenu de l'élément "add-photo"
          photo.innerHTML = ''; 
          photo.appendChild(previewContainer); 
        });
  
        reader.readAsDataURL(file); // Lit le contenu du fichier en tant que données URL
      }
    });
  // Ajoute l'élément input au corps du document
    document.body.appendChild(photoInput); 
    // Déclenche un clic sur l'élément input (ouvre la boîte de dialogue de sélection de fichier)
    photoInput.click(); 
  });
   
    
    async function deleteProject(id) {
     
    
       
        try {
          //Envoyer une requete pour supprimer un projet
          const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: {
              "Accept": "*/*",
              "Authorization": "Bearer " + localStorage.user,
            },
          });
    
          if (response.ok) {
            await getWorks(); // Attendre la récupération des travaux avant de mettre à jour la galerie
             
          }
        } catch (error) {
          console.error("Une erreur s'est produite lors de l'envoi de la requête :", error);
        }
      }
    //Envoyer les nouveaux Project
      const valider = document.getElementById('valider');
      valider.addEventListener('click', function() {
        EnvoieProject();
        console.log(valider);
      });
      
      async function EnvoieProject() {
        // Récupérer les valeurs des champs du formulaire
        const title = document.getElementById("title").value;
        const categories = document.getElementById("Categories").value;
      
        // Récupérer le fichier d'image sélectionné
        const imageFile = document.getElementById("add-photo");
        imageFile.querySelector("input[type='file']").files[0];
      
        // Créer un objet FormData pour envoyer les données
        const formData = new FormData();
        formData.append("title", title);
        formData.append("categories", categories);
        formData.append("image", imageFile);
      
        try {
          // Effectuer une requête AJAX pour envoyer les données
          const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            body: formData,
          });
      
          if (response.ok) {
            console.log('Photo envoyée avec succès');
      
            // Mettre à jour les travaux après l'envoi de la photo
            await getWorks(); // Attendre la récupération des travaux mis à jour depuis le serveur
          } else {
            console.error('Échec de l\'envoi de la photo');
          }
        } catch (error) {
          console.error('Une erreur s\'est produite lors de l\'envoi de la requête:', error);
        }
      }