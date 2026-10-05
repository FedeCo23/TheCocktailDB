//--------------------------VARIABILI

const API = "https://www.thecocktaildb.com/api/json/v1/1";

const cocktailsContainer = document.getElementById("cocktails");
const inputCocktail = document.getElementById("inputCocktail");
const cercaCocktail = document.getElementById("cercaCocktail");
const categoriaCocktail = document.getElementById("categoriaCocktail");
const filtraCategoria = document.getElementById("filtraCategoria");
const tipoCocktail = document.getElementById("tipoCocktail");
const filtraTipo = document.getElementById("filtraTipo");
const cocktailCasuale = document.getElementById("cocktailCasuale");


//--------------------------FUNZIONI DI SUPPORTO

function leggiPreferiti() {
    return JSON.parse(localStorage.getItem("preferiti")) || [];
}

// Scarica i cocktail da un URL e li mostra; gestisce risultati vuoti ed errori di rete
function caricaCocktail(url, messaggioVuoto = "Nessun cocktail trovato.") {
    return fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Errore HTTP ${response.status}`);
            return response.json();
        })
        .then(data => {
            // Quando non ci sono risultati l'API restituisce null (o una stringa)
            if (Array.isArray(data.drinks)) {
                mostraCocktail(data.drinks);
            } else {
                alert(messaggioVuoto);
            }
        })
        .catch(() => alert("Errore di connessione. Riprova più tardi."));
}

// Premendo Invio su un elemento, simula il click sul pulsante associato
function invioConEnter(elemento, pulsante) {
    elemento.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter") {
            pulsante.click();
        }
    });
}


//--------------------------FUNZIONE PER CREARE CARD COCKTAIL

function mostraCocktail(cocktailArray) {
    cocktailsContainer.innerHTML = "";

    cocktailArray.forEach(cocktail => {

        const cocktailElement = document.createElement("div");
        cocktailElement.classList.add("cocktail-card");

        // Nome
        const cocktailName = document.createElement("h2");
        cocktailName.textContent = cocktail.strDrink;

        // Immagine
        const cocktailImg = document.createElement("img");
        cocktailImg.src = cocktail.strDrinkThumb;
        cocktailImg.alt = cocktail.strDrink;

        // Cuore preferiti
        const cuore = document.createElement("button");
        cuore.classList.add("preferitiButton");
        cuore.setAttribute("aria-label", `Preferito: ${cocktail.strDrink}`);

        if (leggiPreferiti().includes(cocktail.idDrink)) {
            cuore.textContent = "♥";
            cuore.classList.add("preferito");
        } else {
            cuore.textContent = "♡";
        }

        cuore.addEventListener("click", (evento) => {

            // Evitiamo che il click sul cuore apra la pagina del cocktail
            evento.stopPropagation();

            let preferiti = leggiPreferiti();

            if (preferiti.includes(cocktail.idDrink)) {
                // Già nei preferiti: lo togliamo
                preferiti = preferiti.filter(id => id !== cocktail.idDrink);
                cuore.textContent = "♡";
                cuore.classList.remove("preferito");
            } else {
                // Non è nei preferiti: lo aggiungiamo
                preferiti.push(cocktail.idDrink);
                cuore.textContent = "♥";
                cuore.classList.add("preferito");
            }

            localStorage.setItem("preferiti", JSON.stringify(preferiti));
        });

        // Click sulla card: apre la pagina del cocktail
        cocktailElement.addEventListener("click", () => {
            window.location.href = `cocktail.html?id=${cocktail.idDrink}`;
        });

        cocktailElement.append(cocktailName, cocktailImg, cuore);
        cocktailsContainer.appendChild(cocktailElement);
    });
}


//--------------------------CARICAMENTO INIZIALE (cocktail che iniziano per "j")

caricaCocktail(`${API}/search.php?f=j`);


//--------------------------RICERCA PER NOME

cercaCocktail.addEventListener("click", () => {

    const valoreCocktail = inputCocktail.value.trim();

    if (valoreCocktail !== "") {
        // encodeURIComponent protegge da spazi e caratteri speciali
        caricaCocktail(`${API}/search.php?s=${encodeURIComponent(valoreCocktail)}`);
    } else {
        alert("Per favore, inserisci il nome di un cocktail.");
    }
});

invioConEnter(inputCocktail, cercaCocktail);


//--------------------------FILTRO PER CATEGORIA

fetch(`${API}/list.php?c=list`)
    .then(response => response.json())
    .then(data => {
        data.drinks.forEach(categoria => {
            const option = document.createElement("option");
            option.value = categoria.strCategory;
            option.textContent = categoria.strCategory;
            categoriaCocktail.appendChild(option);
        });
    })
    .catch(() => console.error("Impossibile caricare le categorie"));

filtraCategoria.addEventListener("click", () => {

    const categoria = categoriaCocktail.value;

    if (categoria !== "") {
        // Alcune categorie contengono spazi e "/" (es. "Punch / Party Drink")
        caricaCocktail(`${API}/filter.php?c=${encodeURIComponent(categoria)}`);
    }
});

invioConEnter(categoriaCocktail, filtraCategoria);


//--------------------------COCKTAIL CASUALE

cocktailCasuale.addEventListener("click", () => {
    caricaCocktail(`${API}/random.php`);
});


//--------------------------FILTRO PER TIPO (ALCOLICO / ANALCOLICO)

fetch(`${API}/list.php?a=list`)
    .then(response => response.json())
    .then(data => {
        data.drinks.forEach(tipo => {
            const option = document.createElement("option");
            option.value = tipo.strAlcoholic;
            option.textContent = tipo.strAlcoholic;
            tipoCocktail.appendChild(option);
        });
    })
    .catch(() => console.error("Impossibile caricare i tipi"));

filtraTipo.addEventListener("click", () => {

    const tipo = tipoCocktail.value;

    if (tipo !== "") {
        caricaCocktail(`${API}/filter.php?a=${encodeURIComponent(tipo)}`);
    }
});

invioConEnter(tipoCocktail, filtraTipo);