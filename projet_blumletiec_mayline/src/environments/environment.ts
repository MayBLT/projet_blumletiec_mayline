
/**
 * Configuration de l'environnement de développement.
 * Ce fichier centralise les paramètres utilisés par l'application
 * lorsqu'elle est exécutée localement.
 */
export const environment = {

  // Indique que l'application fonctionne en mode développement.
  // Cette valeur pourra être différente dans l'environnement de production.
  production: false,

  // URL de base de l'API REST utilisée par le service d'inscription.
  // Elle doit être renseignée avec l'adresse réelle du serveur.
  // Aucune URL n'ayant été fournie dans le sujet, cette valeur reste vide.
  apiUrl: 'http://localhost:3000/api'
};
