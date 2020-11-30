
fetch("http://localhost:3000/api/teddies")
    .then(function (response){
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        let resultat = data;
        console.log(resultat);
        let listeProduit = document.querySelector("#listeProduit");

        // Création des cartes de produits
        // for (let i of resultat){
        for (let i = 0; i <= resultat.length; i++) {
            // Création de tout les éléments d'une carte
            let article = document.createElement("article");
            let cardImg = document.createElement("img");
            let divCardBody = document.createElement("div");
            let cardTitle = document.createElement("h2");
            let cardText = document.createElement("p");
            let cardButton = document.createElement("a");

            // Attribution des attributs
            article.setAttribute("class", "card m-4 col-5")
            cardImg.setAttribute("src", resultat[i].imageUrl);
            cardImg.setAttribute("class", "card-img-top")
            cardImg.setAttribute("alt", "Ours en peluche" + [i + 1]);
            divCardBody.setAttribute("class", "card-body");
            cardTitle.setAttribute("class", "card-title");
            cardText.setAttribute("class", "card-text");
            cardButton.setAttribute("href", "html/produit.html?id=" + resultat[i]._id);
            cardButton.setAttribute("class", "btn btn-primary");

            // Attribution des valeurs
            cardTitle.innerHTML = resultat[i].name;
            cardText.innerHTML = `<u>Description:</u> ${resultat[i].description} <br/><u>Couleur:</u> ${resultat[i].colors} <br/><u>Prix:</u> ${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(resultat[i].price / 100)}`;
            cardButton.innerHTML = "En savoir plus";

            // Construction des cartes
            listeProduit.appendChild(article);
            article.appendChild(cardImg);
            article.appendChild(divCardBody);
            divCardBody.appendChild(cardTitle);
            divCardBody.appendChild(cardText);
            divCardBody.appendChild(cardButton);
        }
    })
    .catch(function (error){
        console.log(error);
    });