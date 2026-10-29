
import { Routes } from '@angular/router';
import { PollutionList } from './components/pollution-list/pollution-list';
import { PollutionEditor } from './components/pollution-editor/pollution-editor';
import { PollutionDetail } from './components/pollution-detail/pollution-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'pollutions', pathMatch: 'full' },
  { path: 'pollutions', component: PollutionList },
  { path: 'pollutions/nouvelle', component: PollutionEditor },
  { path: 'pollutions/:id/modifier', component: PollutionEditor },
  { path: 'pollutions/:id', component: PollutionDetail },
  { path: '**', redirectTo: 'pollutions' }
];
