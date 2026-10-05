const API = "https://www.thecocktaildb.com/api/json/v1/1";

const preferitiContainer = document.getElementById("preferiti");
const inputCocktail = document.getElementById("inputCocktail");
const categoriaCocktail = document.getElementById("categoriaCocktail");
const tipoCocktail = document.getElementById("tipoCocktail");
const azzeraFiltri = document.getElementById("azzeraFiltri");
const cocktailCasuale = document.getElementById("cocktailCasuale");

const preferiti = JSON.parse(localStorage.getItem("preferiti")) || [];

// Dati completi dei preferiti: servono per filtrare senza altre chiamate all'API
let cocktailsPreferiti = [];


//--------------------------MESSAGGIO (lista vuota, nessun risultato, errore)

function mostraMessaggio(testo) {
    preferitiContainer.innerHTML = "";

    const messaggio = document.createElement("p");
    messaggio.classList.add("messaggio");
    messaggio.textContent = testo;

    preferitiContainer.appendChild(messaggio);
}


//--------------------------OPZIONI DEI FILTRI

// Riempie la select con i valori presenti nei preferiti (es. solo le categorie usate)
function popolaSelect(select, chiave) {
    const valoreCorrente = select.value;

    const valori = [...new Set(
        cocktailsPreferiti.map(cocktail => cocktail[chiave]).filter(Boolean)
    )].sort();

    // Teniamo solo la prima option (quella di default)
    select.length = 1;

    valori.forEach(valore => {
        const option = document.createElement("option");
        option.value = valore;
        option.textContent = valore;
        select.appendChild(option);
    });

    // Se la scelta non esiste più (cocktail rimosso), torniamo a "tutti"
    select.value = valori.includes(valoreCorrente) ? valoreCorrente : "";
}

function aggiornaOpzioni() {
    popolaSelect(categoriaCocktail, "strCategory");
    popolaSelect(tipoCocktail, "strAlcoholic");
}


//--------------------------CREAZIONE CARD

function creaCard(cocktail) {

    const card = document.createElement("div");
    card.classList.add("cocktail-card");

    const titolo = document.createElement("h2");
    titolo.textContent = cocktail.strDrink;

    const immagine = document.createElement("img");
    immagine.src = cocktail.strDrinkThumb;
    immagine.alt = cocktail.strDrink;

    // Cliccando sulla card apro la pagina del cocktail (come nella home)
    card.addEventListener("click", () => {
        window.location.href = `cocktail.html?id=${cocktail.idDrink}`;
    });

    const cuore = document.createElement("button");
    cuore.classList.add("preferitiButton", "preferito");
    cuore.textContent = "♥";
    cuore.setAttribute("aria-label", `Rimuovi dai preferiti: ${cocktail.strDrink}`);

    cuore.addEventListener("click", (evento) => {

        // Il click sul cuore non deve aprire la pagina del cocktail
        evento.stopPropagation();

        const nuoviPreferiti = (JSON.parse(localStorage.getItem("preferiti")) || [])
            .filter(id => id !== cocktail.idDrink);

        localStorage.setItem("preferiti", JSON.stringify(nuoviPreferiti));

        // Lo togliamo anche dai dati in memoria, altrimenti i filtri lo rimetterebbero
        cocktailsPreferiti = cocktailsPreferiti.filter(c => c.idDrink !== cocktail.idDrink);

        cuore.textContent = "♡";
        cuore.classList.remove("preferito");
        card.classList.add("rimuovi"); // dissolvenza

        // Aspettiamo che si veda il cambio del cuore e la dissolvenza
        setTimeout(() => {
            card.remove();
            aggiornaOpzioni();

            // Se non resta nessuna card, mostriamo il messaggio giusto
            if (!preferitiContainer.querySelector(".cocktail-card")) {
                applicaFiltri();
            }
        }, 400);
    });

    card.append(titolo, immagine, cuore);
    preferitiContainer.appendChild(card);
}


//--------------------------RICERCA E FILTRI (combinati tra loro)

function applicaFiltri() {

    if (cocktailsPreferiti.length === 0) {
        mostraMessaggio("Non hai ancora nessun preferito.");
        return;
    }

    const testo = inputCocktail.value.trim().toLowerCase();
    const categoria = categoriaCocktail.value;
    const tipo = tipoCocktail.value;

    const risultati = cocktailsPreferiti.filter(cocktail =>
        cocktail.strDrink.toLowerCase().includes(testo) &&
        (categoria === "" || cocktail.strCategory === categoria) &&
        (tipo === "" || cocktail.strAlcoholic === tipo)
    );

    if (risultati.length === 0) {
        mostraMessaggio("Nessun preferito corrisponde alla ricerca.");
        return;
    }

    preferitiContainer.innerHTML = "";
    risultati.forEach(creaCard);
}

inputCocktail.addEventListener("input", applicaFiltri);
categoriaCocktail.addEventListener("change", applicaFiltri);
tipoCocktail.addEventListener("change", applicaFiltri);

azzeraFiltri.addEventListener("click", () => {
    inputCocktail.value = "";
    categoriaCocktail.value = "";
    tipoCocktail.value = "";
    applicaFiltri();
});


//--------------------------PREFERITO CASUALE

cocktailCasuale.addEventListener("click", () => {

    if (cocktailsPreferiti.length === 0) {
        alert("Non hai ancora nessun preferito.");
        return;
    }

    const scelto = cocktailsPreferiti[Math.floor(Math.random() * cocktailsPreferiti.length)];
    window.location.href = `cocktail.html?id=${scelto.idDrink}`;
});


//--------------------------CARICAMENTO PREFERITI

if (preferiti.length === 0) {
    mostraMessaggio("Non hai ancora nessun preferito.");
} else {
    // Promise.all mantiene l'ordine in cui i cocktail sono stati salvati
    Promise.all(
        preferiti.map(id =>
            fetch(`${API}/lookup.php?i=${id}`)
                .then(response => response.json())
                .then(data => (data.drinks ? data.drinks[0] : null))
        )
    )
        .then(cocktails => {
            cocktailsPreferiti = cocktails.filter(Boolean);
            aggiornaOpzioni();
            applicaFiltri();
        })
        .catch(() => mostraMessaggio("Errore di connessione. Riprova più tardi."));
}