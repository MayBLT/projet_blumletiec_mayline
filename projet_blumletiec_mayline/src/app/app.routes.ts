
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

/**
 * Configuration centralisée des routes de l'application.
 *
 * Les composants sont chargés à la demande avec loadComponent
 * afin d'optimiser le chargement de l'application.
 */
export const routes: Routes = [

  // ==========================================
  // Accueil
  // ==========================================
  {
    path: '',
    redirectTo: 'pollutions',
    pathMatch: 'full'
  },

  // ==========================================
  // Authentification : routes publiques
  // ==========================================
  {
    path: 'inscription',
    loadComponent: () =>
      import('./components/inscription/inscription')
        .then(m => m.Inscription)
  },
  {
    path: 'connexion',
    loadComponent: () =>
      import('./components/connexion/connexion')
        .then(m => m.Connexion)
  },

  // ==========================================
  // Gestion des pollutions : routes protégées
  // ==========================================
  {
    path: 'pollutions',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/pollution-list/pollution-list')
        .then(m => m.PollutionList)
  },
  {
    path: 'pollutions/nouvelle',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/pollution-editor/pollution-editor')
        .then(m => m.PollutionEditor)
  },
  {
    path: 'pollutions/:id/modifier',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/pollution-editor/pollution-editor')
        .then(m => m.PollutionEditor)
  },
  {
    path: 'pollutions/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/pollution-detail/pollution-detail')
        .then(m => m.PollutionDetail)
  },

  // ==========================================
  // Page inconnue
  // ==========================================
  {
    path: '**',
    redirectTo: 'pollutions'
  }
];
