const preferitiContainer = document.getElementById("preferiti");

const preferiti = JSON.parse(localStorage.getItem("preferiti")) || [];

preferiti.forEach(id => {

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => response.json())
        .then(data => {

            const cocktail = data.drinks[0];

            const card = document.createElement("div");
            card.classList.add("cocktail-card");

            const titolo = document.createElement("h2");
            titolo.textContent = cocktail.strDrink;

            const immagine = document.createElement("img");
            immagine.src = cocktail.strDrinkThumb;
            immagine.alt = cocktail.strDrink;

            // Cliccando sull'immagine apro la pagina del cocktail
            immagine.addEventListener("click", () => {
                window.location.href = `cocktail.html?id=${cocktail.idDrink}`;
            });

            card.appendChild(titolo);
            card.appendChild(immagine);

            preferitiContainer.appendChild(card);


            //----------------------------PREFERITI

            const cuore = document.createElement("button");
            cuore.classList.add("preferitiButton", "preferito");
            cuore.textContent = "♥";

            cuore.addEventListener("click", () => {

                const preferitiAggiornati = JSON.parse(localStorage.getItem("preferiti")) || [];

                const nuoviPreferiti = preferitiAggiornati.filter(
                    preferitoId => preferitoId !== cocktail.idDrink
                );

                localStorage.setItem("preferiti", JSON.stringify(nuoviPreferiti));
                cuore.textContent = "♡";
                card.remove();
            });

            card.appendChild(titolo);
            card.appendChild(immagine);
            card.appendChild(cuore);

            preferitiContainer.appendChild(card);
        });
});
