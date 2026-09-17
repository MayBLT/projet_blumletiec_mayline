// Récupération du formulaire dans la page
const formulaire = document.getElementById("formulaire-inscription");

// Récupération de la zone d'erreur
const messageErreur = document.getElementById("message-erreur");

// Récupération de la zone de récapitulatif
const recapitulatif = document.getElementById("recapitulatif");


// =========================
// Gestion de l'envoi
// =========================

formulaire.addEventListener("submit", function(event) {

    event.preventDefault(); // Empêche le rechargement de la page


    // =========================
    // Récupération des valeurs
    // =========================

    const login = document.getElementById("login").value.trim();

    const motdepasse = document.getElementById("motdepasse").value;
    const confirmation = document.getElementById("confirmation").value;

    const nom = document.getElementById("nom").value.trim();
    const prenom = document.getElementById("prenom").value.trim();

    const numero = document.getElementById("numero").value.trim();
    const rue = document.getElementById("rue").value.trim();
    const codepostal = document.getElementById("codepostal").value.trim();
    const ville = document.getElementById("ville").value.trim();

    const email = document.getElementById("email").value.trim();

    const telephone = document.getElementById("telephone").value.trim();

    const naissance = document.getElementById("naissance").value;


    // Supprime l'ancien message d'erreur
    messageErreur.textContent = "";
    messageErreur.classList.add("hidden");


    // =========================
    // Vérification des champs
    // =========================

    if (
        login === "" ||
        motdepasse === "" ||
        confirmation === "" ||
        nom === "" ||
        prenom === "" ||
        numero === "" ||
        rue === "" ||
        codepostal === "" ||
        ville === "" ||
        email === "" ||
        telephone === "" ||
        naissance === ""
    ) {
        afficherErreur("Veuillez remplir tous les champs.");
        return; // Arrête la validation
    }


    // =========================
    // Vérification du login
    // =========================

    const regexLogin = /^[a-zA-Z0-9._-]{3,20}$/; // Lettres, chiffres, ., _ et -

    if (!regexLogin.test(login)) {
        afficherErreur(
            "Le login doit contenir entre 3 et 20 caractères et uniquement des lettres, chiffres, points, tirets ou underscores."
        );
        return;
    }


    // =========================
    // Vérification du mot de passe
    // =========================

    if (motdepasse.length < 8) {
        afficherErreur(
            "Le mot de passe doit contenir au moins 8 caractères."
        );
        return;
    }


    // =========================
    // Vérification du nom
    // =========================

    const regexNom = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/; // Autorise lettres, accents, espaces, tirets et apostrophes

    if (!regexNom.test(nom)) {
        afficherErreur(
            "Le nom contient des caractères invalides."
        );
        return;
    }


    // =========================
    // Vérification du prénom
    // =========================

    if (!regexNom.test(prenom)) {
        afficherErreur(
            "Le prénom contient des caractères invalides."
        );
        return;
    }


    // =========================
    // Vérification du numéro
    // =========================

    const regexNumero = /^[0-9]+[A-Za-z]?$/; // Accepte par exemple 12 ou 12A

    if (!regexNumero.test(numero)) {
        afficherErreur(
            "Le numéro de rue doit commencer par un nombre."
        );
        return;
    }


    // =========================
    // Vérification de la rue
    // =========================

    if (rue.length < 2) {
        afficherErreur(
            "Veuillez saisir une rue valide."
        );
        return;
    }


    // =========================
    // Vérification du code postal
    // =========================

    const regexCodePostal = /^[0-9]{5}$/; // Exactement 5 chiffres

    if (!regexCodePostal.test(codepostal)) {
        afficherErreur(
            "Le code postal doit contenir exactement 5 chiffres."
        );
        return;
    }


    // =========================
    // Vérification de la ville
    // =========================

    if (!regexNom.test(ville)) {
        afficherErreur(
            "Le nom de la ville contient des caractères invalides."
        );
        return;
    }


    // =========================
    // Vérification de l'email
    // =========================

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Vérifie la structure d'une adresse email

    if (!regexEmail.test(email)) {
        afficherErreur(
            "Veuillez saisir une adresse email valide."
        );
        return;
    }


    // =========================
    // Vérification du téléphone
    // =========================

    const regexTelephone = /^(0[1-9])([ .-]?[0-9]{2}){4}$/; // Format français à 10 chiffres

    if (!regexTelephone.test(telephone)) {
        afficherErreur(
            "Veuillez saisir un numéro de téléphone français valide."
        );
        return;
    }


    // =========================
    // Vérification des mots de passe
    // =========================

    if (motdepasse !== confirmation) {
        afficherErreur(
            "Le mot de passe et sa confirmation ne correspondent pas."
        );
        return;
    }


    // =========================
    // Vérification de la date
    // =========================

    const dateNaissance = new Date(naissance);
    const aujourdHui = new Date();

    if (dateNaissance > aujourdHui) {
        afficherErreur(
            "La date de naissance ne peut pas être dans le futur."
        );
        return;
    }


    // =========================
    // Validation réussie
    // =========================

    afficherRecapitulatif(
        login,
        nom,
        prenom,
        numero,
        rue,
        codepostal,
        ville,
        email,
        telephone,
        naissance
    );
});


// =========================
// Affichage d'une erreur
// =========================

function afficherErreur(message) {

    messageErreur.textContent = message; // Insère le message sans interpréter du HTML

    messageErreur.classList.remove("hidden"); // Rend le message visible
}


// =========================
// Affichage du récapitulatif
// =========================

function afficherRecapitulatif(
    login,
    nom,
    prenom,
    numero,
    rue,
    codepostal,
    ville,
    email,
    telephone,
    naissance
) {

    // Affichage des informations avec textContent pour éviter l'interprétation de HTML
    document.getElementById("recap-login").textContent = login;

    document.getElementById("recap-nom").textContent = nom;

    document.getElementById("recap-prenom").textContent = prenom;

    document.getElementById("recap-adresse").textContent =
        numero + " " + rue + ", " + codepostal + " " + ville;

    document.getElementById("recap-email").textContent = email;

    document.getElementById("recap-telephone").textContent = telephone;

    document.getElementById("recap-naissance").textContent = naissance;


    // Le formulaire disparaît après une validation réussie
    formulaire.classList.add("hidden");

    // Le récapitulatif devient visible
    recapitulatif.classList.remove("hidden");
}
