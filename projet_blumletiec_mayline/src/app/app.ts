
import { Component } from '@angular/core';

import { Inscription } from './components/inscription/inscription';
import { Connexion } from './components/connexion/connexion';
import { PollutionList } from './components/pollution-list/pollution-list';
import { PollutionEditor } from './components/pollution-editor/pollution-editor';

type Onglet = 'pollutions' | 'inscription' | 'connexion';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Inscription, Connexion, PollutionList, PollutionEditor],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Onglet affiché par défaut.
  ongletActif: Onglet = 'pollutions';

  // Change le contenu affiché selon l'onglet sélectionné.
  changerOnglet(onglet: Onglet): void {
    this.ongletActif = onglet;
  }
    // Indique si le formulaire de déclaration est affiché.
  afficherEditeur = false;

  // Ouvre le formulaire de nouvelle déclaration.
  ouvrirNouvelleDeclaration(): void {
    this.afficherEditeur = true;
  }

  // Ferme le formulaire et revient à la liste.
  fermerEditeur(): void {
    this.afficherEditeur = false;
  }
}
