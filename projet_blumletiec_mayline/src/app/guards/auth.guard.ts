
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  CanActivateFn,
  Router
} from '@angular/router';

/**
 * Vérifie si l'utilisateur est connecté avant d'autoriser
 * l'accès à une route protégée.
 */
export const authGuard: CanActivateFn = (route, state) => {

  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  // Laisse le serveur effectuer le rendu.
  // La vérification de connexion sera effectuée dans le navigateur.
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  try {
    // Récupère les informations de l'utilisateur connecté.
    const utilisateurStocke = localStorage.getItem('utilisateur');

    if (utilisateurStocke) {
      const utilisateur = JSON.parse(utilisateurStocke);

      // Vérifie que les informations essentielles sont présentes.
      if (
        typeof utilisateur.id === 'number' &&
        typeof utilisateur.email === 'string' &&
        utilisateur.email.trim() !== ''
      ) {
        return true;
      }
    }
  } catch (erreur) {
    console.error(
      'Erreur lors de la vérification de la connexion :',
      erreur
    );
  }

  // Redirige vers la connexion si l'utilisateur n'est pas authentifié.
  return router.createUrlTree(['/connexion'], {
    queryParams: { retour: state.url }
  });
};
