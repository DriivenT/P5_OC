// Initialisation des variables et récupération des éléments
let tableauContainer = document.querySelector("#tableauContainer");
let corpsTableau = document.querySelector("#corpsTableau");
let prixTotal = 0;
let boitePrixTotal = document.querySelector("#prixTotal");
let products = [];
let panier = JSON.parse(localStorage.getItem("panier"));

// Message initial lorsque le panier est vide.
if (localStorage.getItem("panier") == "[[],[]]" || localStorage.length == 0 || localStorage.getItem("panier") == null){
    let msgErreur = document.createElement("p");
    msgErreur.innerHTML = "Votre panier est vide.";
    tableauContainer.appendChild(msgErreur);
    boitePrixTotal.innerHTML = "0€";
}
else{
    for(const element of panier){
        fetch("http://localhost:3000/api/teddies/" + element.id)
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (data) {
                let resultat = data;
                let ligneArticle;

                // Création et affichage de la ligne de tableau avec les paramètres du produit ajouté.
                ligneArticle = `<tr>
                                    <th>${resultat.name}</th>
                                    <th>${element.couleur}</th>
                                    <th>${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(resultat.price / 100)}</th>
                                    <th><i class="boutonRemove fas fa-times-circle text-primary"></i></th>
                                </tr>`;
                corpsTableau.innerHTML = corpsTableau.innerHTML + ligneArticle;

                // Ajout de l'id dans le tableau "products"
                products.push(resultat._id);

                // Calcul et affichage du prix total
                prixTotal += resultat.price;
                boitePrixTotal.innerHTML = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prixTotal / 100);

                localStorage.setItem("products", JSON.stringify(products));
                localStorage.setItem("prixTotal", prixTotal);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //Tentative de bouton supprimer, échec.
    /* let btnSuppr = document.querySelectorAll(".boutonRemove");
    for (const bouton of btnSuppr){
        bouton.addEventListener('click', function (){
            alert("test");
            panier[0].splice(i, 1);
            panier[1].splice(i, 1);
            localStorage.clear();
            // Mise à jour du nouveau panier avec suppression de l'article
            localStorage.setItem("panier", JSON.stringify(panier));
            //Mise à jour de la page pour affichage de la suppression au client
            window.location.reload();
        });
    }*/
}