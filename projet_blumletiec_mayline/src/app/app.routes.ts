
import { Routes } from '@angular/router';

import { PollutionList } from './components/pollution-list/pollution-list';
import { PollutionEditor } from './components/pollution-editor/pollution-editor';
import { PollutionDetail } from './components/pollution-detail/pollution-detail';

import { Inscription } from './components/inscription/inscription';
import { Connexion } from './components/connexion/connexion';

export const routes: Routes = [
  // Page d'accueil
  { path: '', redirectTo: 'pollutions', pathMatch: 'full' },

  // Gestion des utilisateurs
  { path: 'inscription', component: Inscription },
  { path: 'connexion', component: Connexion },

  // Gestion des déclarations de pollution
  { path: 'pollutions', component: PollutionList },
  { path: 'pollutions/nouvelle', component: PollutionEditor },
  { path: 'pollutions/:id/modifier', component: PollutionEditor },
  { path: 'pollutions/:id', component: PollutionDetail },

  // Redirection des URL inconnues
  { path: '**', redirectTo: 'pollutions' }
];
