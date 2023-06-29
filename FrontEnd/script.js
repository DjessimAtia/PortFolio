const gallery = document.querySelector('.gallery');

const filtres = document.querySelector('.filtres');




/*CODE PRINCIPAL*/

 

main();

 

async function main() {

  await GetFiltres(); // Récupère les filtres depuis l'API

  await getWorks(); // Récupère les travaux depuis l'API

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

    gallery.innerHTML= "Oups... Suite à problème technqiue, la gallerie n'est pas disponible, veuillez rééssayer ultériurement";

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

 

  await fetch("http://localhost:5678/api/categories")

    // Si le fetch fonctionne on récupère les données en .json; Sinon on affiche une erreur

    .then((response) => {

      if (response.ok) {

        return response.json();

      } else {

        console.log("Erreur dans la récupération des donnés de l'API");

      }

    })

    //On récupère chaque categorie

    .then((categories) => {

      const boutonTout = document.createElement('div');

      boutonTout.classList.add('bouton');

      boutonTout.textContent = 'Tout';

      //boutonTout.()id = '0';

      //boutonTout.setAttribute("data-id", category.id);

      // Ajoute le bouton "Tout" à la div des filtres

      filtres.appendChild(boutonTout);

      //Auxquelles on applique la fonction createButton

      categories.forEach((filtre) => {

       //on cree une div bouton, on lui donne la class css('bouton') on lui donne les données reccuperer et on le place dans la filtreDiv

        const bouton = document.createElement('div');

        bouton.classList.add('bouton');

        bouton.textContent = filtre.name;    

        bouton.setAttribute("data-tag", filtre.name);

        bouton.setAttribute("data-id", filtre.id);

        filtres.appendChild(bouton);

       

      });

    })

 

    .then((filtre) => {

      //on récupère les boutons

      const buttons = document.querySelectorAll(".filtres .bouton");

     

     

      buttons.forEach((button) => {

        //Pour chaque bouton, au clic

        button.addEventListener("click", function () {

          // Get (et Affiche le data-tag)

          let buttonTag = button.dataset.tag;

          console.log(buttonTag);

 

          //Get catégorie id

          let categorieId = button.getAttribute("data-id");

          console.log(categorieId);

 

          //on enlève, pour chaque bouton la classe selected

          buttons.forEach((button) => button.classList.remove("selected"));

          //puis on ajoute la classe selected au bouton cliqué

          this.classList.add("selected");

          // On récupère les works de l'API en fonction des categories

          getWorks(categorieId);

        });

      });

    })

    .catch((error) => {

      console.log(error);

    })}

/*    MODAL */

