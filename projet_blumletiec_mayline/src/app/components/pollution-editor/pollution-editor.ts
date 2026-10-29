
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

import { Pollution } from '../../models/pollution';
import { PollutionService } from '../../services/pollution.service';
import { PollutionForm } from '../pollution-form/pollution-form';

@Component({
  selector: 'app-pollution-editor',
  standalone: true,
  imports: [CommonModule, RouterLink, PollutionForm],
  templateUrl: './pollution-editor.html',
  styleUrl: './pollution-editor.css',
})
export class PollutionEditor implements OnInit {
  private readonly pollutionService = inject(PollutionService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  // Identifiant de la pollution à modifier.
  // null signifie que nous créons une nouvelle déclaration.
  pollutionId: number | null = null;

  // Déclaration chargée depuis l'API en mode modification.
  pollution: Pollution | null = null;

  chargement = false;
  erreurMessage = '';
  envoiEnCours = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    // Aucun identifiant : mode création.
    if (id === null) {
      return;
    }

    // Vérification de l'identifiant reçu dans l'URL.
    const idNumerique = Number(id);

    if (!Number.isInteger(idNumerique) || idNumerique <= 0) {
      this.erreurMessage = 'L’identifiant de la déclaration est invalide.';
      return;
    }

    this.pollutionId = idNumerique;
    this.chargerPollution();
  }

  chargerPollution(): void {
    if (this.pollutionId === null) {
      return;
    }

    this.chargement = true;
    this.erreurMessage = '';

    this.pollutionService.getById(this.pollutionId).subscribe({
      next: (pollution) => {
        this.pollution = pollution;
        this.chargement = false;
      },
      error: () => {
        this.erreurMessage =
          'Impossible de charger cette déclaration. Elle n’existe peut-être plus.';
        this.chargement = false;
      },
    });
  }

  enregistrer(pollution: Pollution): void {
    console.log('Événement reçu par enregistrer()', pollution);

    this.erreurMessage = '';
    this.envoiEnCours = true;

    // Création d'une nouvelle déclaration.
    if (this.pollutionId === null) {
      this.pollutionService.create(pollution).subscribe({
        next: (declarationCreee) => {
          this.router.navigate(['/pollutions', declarationCreee.id]);
        },
        error: () => {
          this.erreurMessage =
            'La création a échoué. Vérifiez que le serveur API fonctionne.';
        },
      });

      return;
    }

    // Modification d'une déclaration existante.
    this.pollutionService.update(this.pollutionId, pollution).subscribe({
      next: () => {
        this.router.navigate(['/pollutions', this.pollutionId]);
      },
      error: () => {
        this.erreurMessage =
          'La modification a échoué. Veuillez réessayer.';
      },
    });
  }
}
