# Cocktail Explorer

Web app frontend per cercare, esplorare e salvare cocktail utilizzando la **TheCocktailDB API** ( https://www.thecocktaildb.com/ ).

Il progetto è stato realizzato per esercitarmi nell'utilizzo di API REST, `fetch()`, JSON, manipolazione del DOM e `localStorage` con JavaScript.

# Funzionalità

* Ricerca cocktail per nome
* Ricerca tramite tasto `Invio`
* Visualizzazione dei cocktail con immagine e nome
* Pagina di dettaglio del cocktail
* Visualizzazione di ingredienti, quantità e preparazione
* Filtro per categoria
* Filtro per grado alcolico
* Filtro per tipo di bicchiere
* Ricerca di un cocktail casuale
* Salvataggio dei cocktail preferiti
* Memorizzazione dei preferiti tramite `localStorage`
* Rimozione dei cocktail dai preferiti

# Tecnologie utilizzate

* HTML5
* CSS3
* JavaScript
* Fetch API
* JSON
* LocalStorage
* TheCocktailDB API

# API

I dati dei cocktail vengono recuperati tramite **TheCocktailDB**.

https://www.thecocktaildb.com/api.php

Il progetto utilizza gli endpoint disponibili nella versione gratuita dell'API.

# Struttura del progetto

/
├── index.html
├── cocktail.html
├── preferiti.html
├── script.js
├── cocktail.js
├── preferiti.js
└── style.css


# Gestione dei preferiti

I cocktail preferiti vengono salvati nel `localStorage` del browser utilizzando il loro `idDrink`.

In questo modo i preferiti rimangono disponibili anche dopo aver chiuso e riaperto il browser, senza utilizzare un database o un sistema di autenticazione.

# Live Demo

//

# Sviluppi futuri

* Migliorare la gestione dei cocktail già presenti nei preferiti
* Aggiungere ulteriori filtri
* Aggiungere animazioni e miglioramenti UI/UX
* Migliorare la gestione degli errori dell'API

---

Progetto realizzato come esercitazione frontend per approfondire l'utilizzo delle API e di JavaScript.
