
// Cerchiamo nell'HTML l'elemento che ha id="cocktails" e lo salviamo nella variabile cocktailsContainer
const cocktailsContainer = document.getElementById("cocktails");

fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=j") // Facciamo una richiesta all'API
    .then(response => response.json())  // Trasforma la risposta ricevuta in JSON utilizzabile da JavaScript
    .then(data => { // "data" contiene tutto quello che ci ha restituito l'API


        data.drinks.forEach(cocktail => { // "cocktail" rappresenta un cocktail alla volta

            // Creiamo un nuovo elemento <div>
            const cocktailElement = document.createElement("div");

            // Aggiungiamo il nuovo elemento <div> al contenitore dei cocktail
            cocktailsContainer.appendChild(cocktailElement);

            // Aggiungiamo la classe "cocktail-card" al nuovo elemento <div>
            cocktailElement.classList.add("cocktail-card");

            // Creiamo un elemento <h2> per il nome     
            const cocktailName = document.createElement("h2");

            // Aggiungiamo l'elemento <h2> al contenitore dei cocktail
            cocktailElement.appendChild(cocktailName);

            // Inseriamo nel titolo il nome ricevuto dall'API
            cocktailName.textContent = cocktail.strDrink;





            // Aggiungiamo l'elemento <img> al contenitore dei cocktail
            const cocktailImg = document.createElement("img");

            // Aggiungiamo l'elemento <img> al contenitore dei cocktail
            cocktailElement.appendChild(cocktailImg);

            // Impostiamo l'attributo src dell'elemento <img> con l'URL dell'immagine del cocktail
            cocktailImg.src = cocktail.strDrinkThumb;

            // Usiamo il nome del cocktail come testo alternativo dell'immagine
            cocktailImg.alt = cocktail.strDrink;


        });
    })


