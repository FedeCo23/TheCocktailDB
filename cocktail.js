//--------------------------RECUPERO ID COCKTAIL DALLA URL

const params = new URLSearchParams(window.location.search);
const cocktailId = params.get("id");

const nomeCocktail = document.getElementById("nomeCocktail");
const immagineCocktail = document.getElementById("immagineCocktail");
const preparazione = document.getElementById("preparazione");
const ingredienti = document.getElementById("ingredienti");

function mostraErrore(testo) {
    nomeCocktail.textContent = testo;
    immagineCocktail.remove();
}


//--------------------------FETCH API COCKTAIL TRAMITE ID

if (!cocktailId) {
    mostraErrore("Cocktail non specificato.");
} else {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(cocktailId)}`)
        .then(response => response.json())
        .then(data => {

            // Se l'id non esiste, "drinks" è null
            if (!data.drinks) {
                mostraErrore("Cocktail non trovato.");
                return;
            }

            const cocktail = data.drinks[0];

            document.title = cocktail.strDrink;
            nomeCocktail.textContent = cocktail.strDrink;
            immagineCocktail.src = cocktail.strDrinkThumb;
            immagineCocktail.alt = cocktail.strDrink;

            // L'API offre spesso le istruzioni in italiano: se mancano usiamo l'inglese
            preparazione.textContent = cocktail.strInstructionsIT || cocktail.strInstructions;

            // Ingredienti e misure (al massimo 15)
            for (let i = 1; i <= 15; i++) {

                const ingrediente = cocktail[`strIngredient${i}`];
                const misura = cocktail[`strMeasure${i}`];

                if (ingrediente) {
                    const li = document.createElement("li");
                    li.textContent = `${misura ? misura.trim() + " " : ""}${ingrediente}`;
                    ingredienti.appendChild(li);
                }
            }
        })
        .catch(() => mostraErrore("Errore di connessione. Riprova più tardi."));
}