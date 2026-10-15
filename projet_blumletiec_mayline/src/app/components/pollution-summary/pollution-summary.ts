// Importe les éléments nécessaires à la création du composant
// et à la réception des données depuis un autre composant.
import { Component, Input } from '@angular/core';

// Importe les directives Angular communes, notamment *ngIf.
import { CommonModule } from '@angular/common';

// Importe le modèle définissant les données d'une pollution.
import { Pollution } from '../../models/pollution';

@Component({
  // Nom de la balise utilisée pour afficher ce composant dans un template.
  selector: 'app-pollution-summary',

  // Modules nécessaires au fonctionnement du template.
  imports: [CommonModule],

  // Fichiers HTML et CSS associés au composant.
  templateUrl: './pollution-summary.html',
  styleUrl: './pollution-summary.css',
})
export class PollutionSummary {
  // Reçoit les données de pollution transmises par le composant parent.
  // "!" indique que la propriété sera renseignée avant son utilisation.
  @Input({ required: true }) pollution!: Pollution;
}