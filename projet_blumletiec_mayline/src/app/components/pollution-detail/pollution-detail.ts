
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';

import { Pollution } from '../../models/pollution';
import { PollutionService } from '../../services/pollution.service';
import { PollutionSummary } from '../pollution-summary/pollution-summary';

@Component({
  selector: 'app-pollution-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, PollutionSummary],
  templateUrl: './pollution-detail.html',
  styleUrl: './pollution-detail.css',
})
export class PollutionDetail implements OnInit {
  private readonly pollutionService = inject(PollutionService);
  private readonly route = inject(ActivatedRoute);

  pollution: Pollution | null = null;
  chargement = true;
  erreurMessage = '';

  ngOnInit(): void {
    // Récupère l'identifiant de la déclaration dans l'URL.
    const id = this.route.snapshot.paramMap.get('id');
    const idNumerique = Number(id);

    // Vérifie que l'identifiant est valide.
    if (
      id === null ||
      !Number.isInteger(idNumerique) ||
      idNumerique <= 0
    ) {
      this.erreurMessage = 'L’identifiant de la déclaration est invalide.';
      this.chargement = false;
      return;
    }

    // Charge la déclaration depuis l'API.
    this.pollutionService.getById(idNumerique).subscribe({
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
}
