
/**
 * Composant chargé d'afficher et de filtrer les déclarations de pollution.
 * Il permet également de supprimer une déclaration.
 */
import {
  Component,
  OnInit,
  inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  PLATFORM_ID
} from '@angular/core';
import { PollutionGlobe } from '../pollution-globe/pollution-globe';

import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { PollutionLevelPipe } from '../../shared/pipes/pollution-level-pipe';
import { HighlightPollution } from '../../shared/directives/highlight-pollution';

import { Pollution } from '../../models/pollution';
import { PollutionService } from '../../services/pollution.service';

@Component({
  selector: 'app-pollution-list',
  standalone: true,

  // Active la détection des changements optimisée.
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    PollutionLevelPipe,
    HighlightPollution,
    PollutionGlobe
  ],

  templateUrl: './pollution-list.html',
  styleUrl: './pollution-list.css',
})
export class PollutionList implements OnInit {


  // Services et dépendances Angular.
  private readonly pollutionService = inject(PollutionService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly cdr = inject(ChangeDetectorRef);

  // Liste complète et liste filtrée des déclarations.
  pollutions: Pollution[] = [];
  filteredPollutions: Pollution[] = [];

  // Critères de filtrage saisis par l'utilisateur.
  filtreType = '';
  filtreVille = '';
  filtreDate = '';

  // Informations sur le chargement et les erreurs.
  chargement = true;
  erreurMessage = '';

  /**
   * Charge les déclarations dès l'ouverture du composant.
   * Évite d'effectuer les requêtes HTTP pendant le pré-rendu serveur.
   */
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.chargerPollutions();
    } else {
      this.chargement = false;
    }
  }

  /**
   * Récupère les déclarations depuis l'API.
   */
  chargerPollutions(): void {
    this.chargement = true;
    this.erreurMessage = '';

    this.pollutionService.getAll().subscribe({
      next: (pollutions) => {
        this.pollutions = pollutions;
        this.appliquerFiltres();
        this.chargement = false;

        // Demande à Angular de vérifier le composant avec OnPush.
        this.cdr.markForCheck();
      },

      error: () => {
        this.erreurMessage =
          'Impossible de charger les déclarations. Vérifiez que le serveur API est démarré.';
        this.chargement = false;

        // Actualise l'affichage du message d'erreur.
        this.cdr.markForCheck();
      },
    });
  }

  /**
   * Applique simultanément les filtres par type, ville et date.
   */
  appliquerFiltres(): void {
    this.filteredPollutions = this.pollutions.filter((pollution) => {
      const typeCorrespond =
        !this.filtreType || pollution.type === this.filtreType;

      const villeCorrespond =
        !this.filtreVille ||
        pollution.ville
          .toLocaleLowerCase('fr')
          .includes(this.filtreVille.trim().toLocaleLowerCase('fr'));

      const dateCorrespond =
        !this.filtreDate || pollution.date === this.filtreDate;

      return typeCorrespond && villeCorrespond && dateCorrespond;
    });
  }

  /**
   * Réinitialise tous les critères de filtrage.
   */
  reinitialiserFiltres(): void {
    this.filtreType = '';
    this.filtreVille = '';
    this.filtreDate = '';

    this.appliquerFiltres();
    this.cdr.markForCheck();
  }

  /**
 * Génère un lien OpenStreetMap à partir des coordonnées
 * géographiques d'une déclaration.
 */
getOpenStreetMapUrl(pollution: Pollution): string {
  const latitude = pollution.latitude;
  const longitude = pollution.longitude;

  return `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=18/${latitude}/${longitude}`;
}

  /**
   * Supprime une déclaration après confirmation.
   */
  supprimerPollution(pollution: Pollution): void {
    if (pollution.id === undefined) {
      this.erreurMessage = 'Cette déclaration ne possède pas d’identifiant.';
      this.cdr.markForCheck();
      return;
    }

    if (!confirm(`Voulez-vous vraiment supprimer « ${pollution.titre} » ?`)) {
      return;
    }

    this.pollutionService.delete(pollution.id).subscribe({
      next: () => {
        // Met à jour les deux listes après la suppression réussie.
        this.pollutions = this.pollutions.filter(
          (element) => element.id !== pollution.id,
        );

        this.appliquerFiltres();
        this.cdr.markForCheck();
      },

      error: () => {
        this.erreurMessage = 'La suppression a échoué. Veuillez réessayer.';
        this.cdr.markForCheck();
      },
    });
  }
}
