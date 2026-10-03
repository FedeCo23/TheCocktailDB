

//--------------------------VARIABILI

// Cerchiamo nell'HTML l'elemento che ha id="cocktails" e lo salviamo nella variabile cocktailsContainer
const cocktailsContainer = document.getElementById("cocktails");

// Cerchiamo nell'HTML l'elemento che ha id="searchInput" e lo salviamo nella variabile searchInput
const inputCocktail = document.getElementById("inputCocktail");

// Cerchiamo nell'HTML l'elemento che ha id="searchButton" e lo salviamo nella variabile searchButton
const cercaCocktail = document.getElementById("cercaCocktail");


//--------------------------FUNZIONE PER CREARE CARD COCKTAIL

function mostraCocktail(cocktailArray) {
    cocktailsContainer.innerHTML = "";

    cocktailArray.forEach(cocktail => { // "cocktail" rappresenta un cocktail alla volta

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



        //----------------------------IMMAGINE COCKTAIL

        // Aggiungiamo l'elemento <img> al contenitore dei cocktail
        const cocktailImg = document.createElement("img");

        // Aggiungiamo l'elemento <img> al contenitore dei cocktail
        cocktailElement.appendChild(cocktailImg);

        // Impostiamo l'attributo src dell'elemento <img> con l'URL dell'immagine del cocktail
        cocktailImg.src = cocktail.strDrinkThumb;

        // Usiamo il nome del cocktail come testo alternativo dell'immagine
        cocktailImg.alt = cocktail.strDrink;
    });
};



//--------------------------FETCH API COCKTAIL E CREAZIONE CARD

fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=j") // Facciamo una richiesta all'API
    .then(response => response.json())  // Trasforma la risposta ricevuta in JSON utilizzabile da JavaScript
    .then(data => { // "data" contiene tutto quello che ci ha restituito l'API
        mostraCocktail(data.drinks);

    });

//----------------------------RICERCA PER COCKTAIL

// Aggiungiamo un evento al click del pulsante di ricerca
cercaCocktail.addEventListener("click", () => {

    // Recuperiamo il valore inserito dall'utente nell'input di ricerca  e rimuoviamo subito gli spazi
    const valoreCocktail = inputCocktail.value.trim();


    // Controlliamo se l'input non è vuoto
    if (valoreCocktail !== "") {

        // Se l'input non è vuoto, creiamo l'URL per la richiesta all'API
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${valoreCocktail}`;

        // Facciamo una richiesta all'API con l'URL creato
        fetch(url)
            // Trasforma la risposta ricevuta in JSON utilizzabile da JavaScript
            .then(response => response.json())
            // "data" contiene tutto quello che ci ha restituito l'API
            .then(data => {
                // Controlliamo se l'API ha restituito dei cocktail
                if (data.drinks) {
                    mostraCocktail(data.drinks);
                } else {
                    alert("Nessun cocktail trovato.");
                }
            });
    } else {
        // Se l'input è vuoto, mostriamo un messaggio di errore
        alert("Per favore, inserisci il nome di un cocktail.");
    }
});





//aggiungere ricerca anche con il tasto invio
//aggiungere la possibilità di cliccare sul cocktail per vedere la ricetta
//aggiungere la possibilità di salvare i cocktail preferiti
//aggiungere la possibilità di trovare i cocktail con il testo inserito in qualsiasi parte del nome
//aggiungere ricerca per ingredienti
//aggiungere ricerca per categoria  
//aggiungere ricerca per grado alcolico
//aggiungere filtri per ingredienti, categoria e grado alcolico