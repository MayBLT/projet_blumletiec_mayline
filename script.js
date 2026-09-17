```javascript

const formulaire = document.getElementById("formulaire-inscription"); // Récupération du formulaire


const messageErreur = document.getElementById("message-erreur"); // Récupération des éléments
const recapitulatif = document.getElementById("recapitulatif");


formulaire.addEventListener("submit", function(event) { // Gestion de l'envoi du formulaire

    
    event.preventDefault(); // Empêche le rechargement de la page

    
    const login = document.getElementById("login").value.trim(); // Récupération des valeurs
    const motdepasse = document.getElementById("motdepasse").value;
    const confirmation = document.getElementById("confirmation").value;
    const nom = document.getElementById("nom").value.trim();
    const prenom = document.getElementById("prenom").value.trim();
    const adresse = document.getElementById("adresse").value.trim();
    const email = document.getElementById("email").value.trim();
    const telephone = document.getElementById("telephone").value.trim();
    const naissance = document.getElementById("naissance").value;

    
    messageErreur.textContent = ""; // Réinitialisation du message d'erreur
    messageErreur.hidden = true;

    // Vérification des champs
    if (
        login === "" ||
        motdepasse === "" ||
        confirmation === "" ||
        nom === "" ||
        prenom === "" ||
        adresse === "" ||
        email === "" ||
        telephone === "" ||
        naissance === ""
    ) {
        afficherErreur("Veuillez remplir tous les champs.");
        return;
    }

   
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email)) {
        afficherErreur("Veuillez saisir une adresse email valide.");  // Vérification de l'adresse email
        return;
    }

    // Vérification des mots de passe
    if (motdepasse !== confirmation) {
        afficherErreur("Le mot de passe et sa confirmation ne correspondent pas.");
        return;
    }

    // Si toutes les vérifications sont correctes
    afficherRecapitulatif(
        login,
        nom,
        prenom,
        adresse,
        email,
        telephone,
        naissance
    );
});


// Fonction permettant d'afficher une erreur
function afficherErreur(message) {

    messageErreur.textContent = message;
    messageErreur.hidden = false;
}


// Fonction permettant d'afficher le récapitulatif
function afficherRecapitulatif(
    login,
    nom,
    prenom,
    adresse,
    email,
    telephone,
    naissance
) {

    // Remplissage du récapitulatif
    document.getElementById("recap-login").textContent = login;
    document.getElementById("recap-nom").textContent = nom;
    document.getElementById("recap-prenom").textContent = prenom;
    document.getElementById("recap-adresse").textContent = adresse;
    document.getElementById("recap-email").textContent = email;
    document.getElementById("recap-telephone").textContent = telephone;
    document.getElementById("recap-naissance").textContent = naissance;

    // Masquage du formulaire
    formulaire.hidden = true;

    // Masquage du message d'erreur
    messageErreur.hidden = true;

    // Affichage du récapitulatif
    recapitulatif.hidden = false;
}
```
