let url = new URL(window.location.href);
let id = url.searchParams.get("id");

fetch("http://localhost:3000/api/teddies/" + id)
    .then(function (response){
        console.log(response);
        return response.json();
    })
    .then(function (data){
        let resultat = data;
        console.log(resultat);

        // Generation de la carte grâce aux templates literals
        let boiteProduit = document.querySelector("#produit");
        let articleProduit;

        articleProduit = 
        `<article class="card m-5 w-75 h-auto col-10">
            <img src="${resultat.imageUrl}" class="card-img-top" alt="Peluche ${resultat.name}">
            <div class="card-body">
                <h2 class="card-title">${resultat.name}</h2>
                <p class="card-text">
                    Description: ${resultat.description}<br/>
                    <label for="color-select">Choisir une couleur: </label>
                    <select name="color" id="color-select">
                        <option value="unselect"></option>
                    </select><br/>
                    Prix: ${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(resultat.price/100)}
                </p>
                <a id="boutonForm" class="btn btn-primary">Ajouter au panier</a>
            </div>
        </article>`
        
        // Affichage de la carte
        boiteProduit.innerHTML = articleProduit;

        // Génération de la sélection des couleurs
        let blockSelect = document.querySelector("#color-select");
        let bouton = document.querySelector("#boutonForm");
        let nomCouleur;
        let optionSelect = 0;

        // Affichage des couleurs disponibles dans les choix possibles
        for(const couleur of resultat.colors){
            nomCouleur = couleur;
            let option = document.createElement("option");
            option.setAttribute("value", nomCouleur);
            option.innerHTML = nomCouleur;
            blockSelect.appendChild(option);
        }

        // Récupération du choix de l'utilisateur à chaque changement
        blockSelect.addEventListener('change', function(){
            optionSelect = blockSelect.selectedIndex;
        });

        // Ajout du produit dans le panier
        bouton.addEventListener('click', async function(){
            if (optionSelect != 0){
                alert("L'article a été ajouté au panier.");
                if(localStorage.getItem("panier") == null){
                    let panier = [[],[]];
                    panier[0].push(id)
                    panier[1].push(blockSelect.options[optionSelect].value);
                    localStorage.setItem("panier", JSON.stringify(panier));
                }
                else{
                    panier = JSON.parse(localStorage.getItem("panier"));
                    panier[0].push(id);
                    panier[1].push(blockSelect.options[optionSelect].value);
                    localStorage.setItem("panier", JSON.stringify(panier));
                }
            }
            else{
                alert("Erreur, veuillez sélectionner une couleur.")
            }
        });
    })
    .catch(function (error) {
        console.log(error);
    });