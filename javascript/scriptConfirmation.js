let commande = JSON.parse(localStorage.getItem("idCommande"));
let boiteMsg = document.querySelector("#boiteMsg");
let msg;
let prixTotal = localStorage.getItem("prixTotal");

if(commande == null){
    msg = `<p class="description">Aucune commande n'a été validée pour l'instant.</p>`
    boiteMsg.innerHTML = msg;
}
else{
    msg = `<p class="description">Merci d'avoir commandé sur Orinoco,
            Vous avez payé ${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prixTotal / 100)}.</p>
            <p class="description">Voici votre identifiant de commande: 
            ${commande.orderId}</p>
            <p class="description">Nous espérons vous revoir bientôt !</p>
        </p>`
    boiteMsg.innerHTML = msg;
}