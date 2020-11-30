//---------------------------FORMULAIRE----------------//
let boutonEnvoyer = document.querySelector("#boutonEnvoyer");
boutonEnvoyer.addEventListener("click", checkInput);

// Vérification les inputs du formulaire

function checkInput(){
    // Controle Regex
    let checkNombre = /[0-9]/;
    let checkCaractereSpeciaux = /[§!@#$%^&*().?":{}|<>]/;
    let checkEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

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
    let formIsValid = true;

    // Tests des différents input du formulaire
    
    // Test du nom
    if (checkNombre.test(nom) == true || checkCaractereSpeciaux.test(nom) || nom.length <= 1){
        mauvaiseInfo(validationNom);
        validationNom.innerHTML = "Vérifier votre nom, les informations sont incorrectes. Les chiffres et caractères spéciaux ne sont pas autorisés.";
        formIsValid = false;
    } else {
        bonneInfo(validationNom);
        validationNom.innerHTML = "Nom accepté !";
    }

    // Test du prénom
    if (checkNombre.test(prenom) == true || checkCaractereSpeciaux.test(prenom) || prenom.length <= 1){
        mauvaiseInfo(validationPrenom);
        validationPrenom.innerHTML = "Vérifier votre prénom, les informations sont incorrectes. Les chiffres et caractères spéciaux ne sont pas autorisés.";
        formIsValid = false;
    } else {
        bonneInfo(validationPrenom);
        validationPrenom.innerHTML = "Prénom acceptée !";
    }

    //Test de l'email
    if (!checkEmail.test(email) || email.length < 6 || email.length > 30){
        mauvaiseInfo(validationEmail);
        validationEmail.innerHTML = "Vérifier votre email, les informations sont incorrectes.";
        formIsValid = false; 
    } else {
        bonneInfo(validationEmail);
        validationEmail.innerHTML = "Adresse mail acceptée !";
    }

    // Test de l'adresse
    if (checkCaractereSpeciaux.test(adresse) || adresse == ""){
        mauvaiseInfo(validationAdresse);
        validationAdresse.innerHTML = "Vérifier votre adresse, les informations sont incorrectes. Les caractères spéciaux ne sont pas autorisés.";
        formIsValid = false;
    } else {
        bonneInfo(validationAdresse);
        validationAdresse.innerHTML = "Adresse postale acceptée !";
    }
    // Test de la ville
    if (checkCaractereSpeciaux.test(ville) || checkNombre.test(ville) == true || ville == ""){
        mauvaiseInfo(validationVille);
        validationVille.innerHTML = "Vérifier votre ville, les informations sont incorrectes. Les chiffres et caractères spéciaux ne sont pas autorisés.";
        formIsValid = false;
    } else {
        bonneInfo(validationVille);
        validationVille.innerHTML = "Ville acceptée !";
    }

    // Si un des champs n'est pas conforme => message d'alert avec la raison
    if (formIsValid == true && localStorage.length > 0){
        console.log("Le formulaire est validé !");
        const contact = {
            firstName: prenom,
            lastName: nom,
            address: adresse,
            city: ville,
            email: email,
        };

        let envoiObjet = {
            contact: contact,
            products: JSON.parse(localStorage.getItem("products")),
        };

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
                if(idCommande == "null"){
                    localStorage.setItem("idCommande", JSON.stringify(resultat));
                }
                else{
                    localStorage.removeItem("idCommande");
                    localStorage.setItem("idCommande", JSON.stringify(resultat));
                }
                alert("La commande a été validée.");
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    else{
        alert("Panier vide ou formulaire incomplet.")
    }
};

function mauvaiseInfo(x){
    x.removeAttribute("class");
    x.setAttribute("class", "text-primary");
}

function bonneInfo(x){
    x.removeAttribute("class");
    x.setAttribute("class", "text-success");
}