import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importe le composant du formulaire de déclaration.
import { PollutionForm } from './components/pollution-form/pollution-form';

// Importe le composant qui affiche le récapitulatif.
import { PollutionSummary } from './components/pollution-summary/pollution-summary';

// Importe le modèle des données d'une pollution.
import { Pollution } from './models/pollution';

@Component({
  // Sélecteur du composant principal de l'application.
  selector: 'app-root',

  // Importe les composants et directives utilisés dans le template.
  imports: [CommonModule, PollutionForm, PollutionSummary],

  // Fichiers HTML et CSS associés à la page principale.
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Stocke la pollution validée, ou null si le formulaire n'a pas été validé.
  pollutionDeclaree: Pollution | null = null;

  // Récupère les données envoyées par le formulaire.
  afficherRecapitulatif(pollution: Pollution): void {
    this.pollutionDeclaree = pollution;
  }
}