//--------------------------RECUPERO ID COCKTAIL DALLA URL

const params = new URLSearchParams(window.location.search);

const cocktailId = params.get("id");


//--------------------------FETCH API COCKTAIL E CREAZIONE CARD TRAMITE ID
fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`)
    .then(response => response.json())
    .then(data => {

        // Recuperiamo il cocktail dall'array "drinks" restituito dall'API
        const cocktail = data.drinks[0];

        document.getElementById("nomeCocktail").textContent = cocktail.strDrink;

        document.getElementById("immagineCocktail").src = cocktail.strDrinkThumb;

        document.getElementById("preparazione").textContent = cocktail.strInstructions;

        const ingredienti = document.getElementById("ingredienti");

        // Cicliamo attraverso gli ingredienti e le misure del cocktail
        for (let i = 1; i <= 15; i++) {

            // Recuperiamo l'ingrediente e la misura corrispondente
            const ingrediente = cocktail[`strIngredient${i}`];
            const misura = cocktail[`strMeasure${i}`];

            // Se l'ingrediente esiste, creiamo un elemento <li> e lo aggiungiamo alla lista degli ingredienti
            if (ingrediente) {
                const li = document.createElement("li");

                li.textContent = `${misura || ""} ${ingrediente}`;

                ingredienti.appendChild(li);
            }
        }

    });