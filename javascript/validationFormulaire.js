let boutonEnvoyer = document.querySelector("#boutonEnvoyer");
boutonEnvoyer.addEventListener("click", checkInput);

// Vérification les inputs du formulaire
function checkInput() {

    // Récupération des inputs
    let nom = document.querySelector("#nom").value;
    let prenom = document.querySelector("#prenom").value;
    let email = document.querySelector("#email").value;
    let adresse = document.querySelector("#adresse").value;
    let ville = document.querySelector("#ville").value;
    let validationNom = document.querySelector("#validationNom");
    let validationPrenom = document.querySelector("#validationPrenom");
    let validationEmail = document.querySelector("#validationEmail");
    let validationAdresse = document.querySelector("#validationAdresse");
    let validationVille = document.querySelector("#validationVille");

    // Contrôle des inputs grâce aux regex
    let regexTexte = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[A-Za-zÀ-ÖØ-öø-ÿ]*)*$/;
    let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let regexAdresse = /^[a-zA-Z0-9]+(([',. -][a-zA-Z0-9 ])?[A-Za-z0-9À-ÖØ-öø-ÿ]*)*$/;

    // Tests des différents input du formulaire
    let nomIsValid = validationFormulaire(nom, validationNom, regexTexte, "Nom accepté !", "Vérifier votre nom, les informations sont incorrectes. Les chiffres et caractères spéciaux ne sont pas autorisés.");
    let prenomIsValid = validationFormulaire(prenom, validationPrenom, regexTexte, "Prénom accepté !", "Vérifier votre prénom, les informations sont incorrectes. Les chiffres et caractères spéciaux ne sont pas autorisés.");
    let emailIsValid = validationFormulaire(email, validationEmail, regexEmail, "Email accepté !", "Vérifier votre email, les informations sont incorrectes.");
    let adresseIsValid = validationFormulaire(adresse, validationAdresse, regexAdresse, "Adresse postale acceptée !", "Vérifier votre adresse, les informations sont incorrectes. Les caractères spéciaux ne sont pas autorisés");
    let villeIsValid = validationFormulaire(ville, validationVille, regexTexte, "Ville acceptée !", "Vérifier votre ville, les informations sont incorrectes. Les chiffres et caractères spéciaux ne sont pas autorisés.");

    // Vérification de la validation des inputs, si validé, confirmation de la commande, sinon, alerte d'erreur.
    if (nomIsValid == true && prenomIsValid == true && emailIsValid == true && adresseIsValid == true && villeIsValid == true && localStorage.getItem("panier") != null) {
        alert("Le formulaire est validé !");

        // Création de l'objet contact
         const contact = {
             firstName: prenom,
             lastName: nom,
             address: adresse,
             city: ville,
             email: email,
         };
 
         // Création de l'objet à envoyer contenant l'objet contact et le tableau products
         let envoiObjet = {
             contact: contact,
             products: JSON.parse(localStorage.getItem("products")),
         };
 
         // Initialisation des options pour l'envoi des données à l'API
         const options = {
             method: 'POST',
             body: JSON.stringify(envoiObjet),
             headers: {
                 'Content-Type': 'application/json'
             }
         }
 
         fetch("http://localhost:3000/api/teddies/order", options)
             .then(function (response){
                 console.log(response);
                 return response.json();
             })
             .then(function (data){
                 console.log(data);
                 resultat = data;
                 idCommande = localStorage.getItem("idCommande");
 
                 // Envoi des éléments envoyés par l'API dans le localStorage
                 if(idCommande == "null"){
                     localStorage.setItem("idCommande", JSON.stringify(resultat));
                 }
                 else{
                     localStorage.removeItem("idCommande");
                     localStorage.setItem("idCommande", JSON.stringify(resultat));
                 }
 
                 // Redirection vers la page de confirmation
                 window.location = "confirmation.html";
 
                 // Vidage du panier et du tableau products
                 localStorage.removeItem("panier");
                 localStorage.removeItem("products");
             })
             .catch(function (error) {
                 console.log(error);
             });
    }
    else {
        alert("Panier vide ou formulaire incomplet.")
    }
};

// Fonction permettant la validation des inputs du formulaire
function validationFormulaire(champ, validationChamp, regex, messageOK, messageKO) {

    let champIsValid = true;

    if (regex.test(champ.trim()) && champ.trim().length >= 1) {
        validationChamp.removeAttribute("class");
        validationChamp.setAttribute("class", "text-success");
        validationChamp.innerHTML = messageOK;
        champIsValid = true;
    } else {
        validationChamp.removeAttribute("class");
        validationChamp.setAttribute("class", "text-primary");
        validationChamp.innerHTML = messageKO;
        champIsValid = false;
    }
    return champIsValid;
}