
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  CanActivateFn,
  Router,
} from '@angular/router';
import { Store } from '@ngxs/store';

import { AuthState } from '../states/auth/auth.state';

/**
 * Vérifie si l'utilisateur est connecté avant d'autoriser
 * l'accès à une route protégée.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);
  const store = inject(Store);

  // Laisse le serveur effectuer le rendu.
  // La vérification est effectuée dans le navigateur.
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // Vérifie l'état d'authentification dans NGXS.
  const estAuthentifie = store.selectSnapshot(
    AuthState.isAuthenticated
  );

  if (estAuthentifie) {
    return true;
  }

  // Redirige vers la connexion si l'utilisateur n'est pas authentifié.
  return router.createUrlTree(['/connexion'], {
    queryParams: { retour: state.url },
  });
};
