
import { Routes } from '@angular/router';

import { PollutionList } from './components/pollution-list/pollution-list';
import { PollutionEditor } from './components/pollution-editor/pollution-editor';
import { PollutionDetail } from './components/pollution-detail/pollution-detail';

export const routes: Routes = [
  // Redirige la page d'accueil vers la liste des pollutions.
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pollutions',
  },

  // Affiche le formulaire pour créer une déclaration.
  {
    path: 'pollutions/nouvelle',
    component: PollutionEditor,
  },

  // Affiche le formulaire pour modifier une déclaration existante.
  {
    path: 'pollutions/:id/modifier',
    component: PollutionEditor,
  },

  // Affiche les détails d'une déclaration.
  {
    path: 'pollutions/:id',
    component: PollutionDetail,
  },

  // Affiche la liste des déclarations.
  {
    path: 'pollutions',
    component: PollutionList,
  },

  // Redirige les adresses inconnues vers la liste.
  {
    path: '**',
    redirectTo: 'pollutions',
  },
];
