
// Importe les éléments nécessaires à la création du composant.
import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

// Importe les directives Angular communes, notamment *ngIf.
import { CommonModule } from '@angular/common';

// Importe le modèle définissant les données d'une pollution.
import { Pollution } from '../../models/pollution';

// Importe le pipe permettant d'afficher le niveau de pollution.
import { PollutionLevelPipe } from '../../shared/pipes/pollution-level-pipe';

@Component({
  // Nom de la balise utilisée pour afficher ce composant.
  selector: 'app-pollution-summary',

  // Active la détection des changements optimisée.
  changeDetection: ChangeDetectionStrategy.OnPush,

  // Modules nécessaires au fonctionnement du template.
  imports: [CommonModule, PollutionLevelPipe],

  // Fichiers HTML et CSS associés au composant.
  templateUrl: './pollution-summary.html',
  styleUrl: './pollution-summary.css',
})
export class PollutionSummary {
  // Reçoit les données de pollution transmises par le composant parent.
  // "!" indique que la propriété sera renseignée avant son utilisation.
  @Input({ required: true }) pollution!: Pollution;
}
