fetch("http://localhost:5678/api/works")
//.response.json permet de traduire le http
  .then(response => response.json())
  //.then data permet de recuperer les données traduits
  .then(data => {
    const projects = data; // Stocker les données dans une variable
    
    const portfolioSection = document.getElementById('portfolio');
    const gallery = document.querySelector('.gallery');

    projects.forEach(projects => {
      const div = document.createElement('figure');
      const img = document.createElement('img');
      const figcaption = document.createElement('figcaption');

      // Récupérer l'URL de l'image à partir des données de l'API
      const imageURL = projects.imageURL;

      // Définir l'URL de l'image et l'attribut alt
      img.src = imageURL;
       figcaption.textContent = projects.title;

      div.appendChild(img);
      div.appendChild(figcaption);
      gallery.appendChild(div);
    });
  })