const gallery = document.querySelector('.gallery');

const filtres = document.querySelector('.filtres');




/*CODE PRINCIPAL*/

 

main();

 

async function main() {

  await GetFiltres(); // Récupère les filtres depuis l'API

  await getWorks(); // Récupère les travaux depuis l'API
  token();
}

 

/*FUNCTION*/

/*WORK*/

async function getWorks(categoryId) {

  // Effectue une requête API pour récupérer les travaux

  // On recupere les données de l'api dans une variables response
  
  try{

    const response = await fetch("http://localhost:5678/api/works");

    // On cree une variables data pour recuperer les données traduire grace a .json()

    const data = await response.json();  

    // On itère sur chaque élément du tableau 'data' qui contient les travaux
    gallery.innerHTML="";
    data.forEach(project => {

      //On rentre dans la fonction displayWorks le tableau des travaux

      if (categoryId == project.category.id || categoryId == null) {

        displayWorks(project);

      }

    });

  }catch (error) {

    console.error("An error occurred while retrieving works:", error);
    gallery.classList.remove('gallery')
    gallery.textContent= "Oups... Suite à problème technqiue, la gallerie n'est pas disponible, veuillez rééssayer ultériurement";

  }

}

//On recuperer l'argument project qu'on traduit en dataWork

function displayWorks(dataWork) {

 

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

    gallery.appendChild(figure);

 

}

/*FILTRES*/

async function GetFiltres() {

 
  try{
  await fetch("http://localhost:5678/api/categories")

   .then (response => response.json())
   .then(data => {
    displayCategorie(data)
   }
    )
}catch{
   console.error("An error occurred while retrieving works:",);

    filtres.innerHTML= "Oups... Suite à problème technique, les filtres  ne sont  pas disponible, veuillez rééssayer ultériurement";

}
}
function boutonTout(){
  const boutonTout = document.createElement('div');
  boutonTout.classList.add('bouton');
  boutonTout.classList.add('selected')
  boutonTout.textContent = 'Tout';
  boutonTout.setAttribute('data-tag', 'Tout');

  filtres.appendChild(boutonTout);

}
function displayCategorie(Filtres){
  boutonTout();
  Filtres.forEach((filtre) => {
    const bouton = document.createElement('div');
    bouton.classList.add('bouton');
    bouton.textContent = filtre.name;
    bouton.setAttribute("data-tag", filtre.name);
    bouton.setAttribute("data-id", filtre.id);
    filtres.appendChild(bouton);
  });
  const buttons = document.querySelectorAll(".filtres .bouton");
  
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      let buttonTag = button.dataset.tag;
      console.log(buttonTag);
      let categorieId = button.getAttribute("data-id");
      console.log(categorieId);

      buttons.forEach((button) => button.classList.remove("selected"));
      this.classList.add("selected");
      getWorks(categorieId);
    });
  });
}
//Changement de L'Index pour le Admin
function token() {
  //on Recupere le tokken de connexion 
  const token = sessionStorage.getItem('token');
  if (token) {
    //Changement de Header
    
    const baniere = document.querySelector('.Baniere')
    baniere.classList.remove('Baniere')
    baniere.classList.add('baniere')
    filtres.classList.add('display')
    console.log('Token  valider.');
    //Icone de figure
   const icone = document.querySelector('.display')
    icone.classList.remove('display')
    //Icone de Article Introduction
   const fleche = document.querySelector('.display')
   fleche.classList.remove('display')
   const modifier = document.getElementById('modifier')
   modifier.classList.add('modifier')
   const login = document.getElementById('login')
   login.innerHTML='logout'
   //Bouton pour modal
   const modal = document.getElementById('modal')
   const croix = document.querySelector('.croix')
   modal.classList.add('display')
   modifier.addEventListener("click", function() {
    modal.classList.remove('display')
    console.log('bouton pour modal');
  })
  croix.addEventListener('click', function() {
    modal.classList.add('display');
    console.log('bouton pour fermer la modal');
  });
  
  } else {
    console.log('Token invalide.');
    
  }
}