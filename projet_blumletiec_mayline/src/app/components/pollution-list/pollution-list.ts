
/**
 * Composant chargé d'afficher et de filtrer les déclarations de pollution.
 * Il permet également de supprimer une déclaration.
 */
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Pollution } from '../../models/pollution';
import { PollutionService } from '../../services/pollution.service';

@Component({
  selector: 'app-pollution-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './pollution-list.html',
  styleUrl: './pollution-list.css',
})
export class PollutionList implements OnInit {
  // Service utilisé pour accéder aux déclarations enregistrées.
  private readonly pollutionService = inject(PollutionService);

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
   */
  ngOnInit(): void {
    this.chargerPollutions();
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
      },
      error: () => {
        this.erreurMessage =
          'Impossible de charger les déclarations. Vérifiez que le serveur API est démarré.';
        this.chargement = false;
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
  }

  /**
   * Supprime une déclaration après confirmation.
   */
  supprimerPollution(pollution: Pollution): void {
    if (pollution.id === undefined) {
      this.erreurMessage = 'Cette déclaration ne possède pas d’identifiant.';
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
      },
      error: () => {
        this.erreurMessage = 'La suppression a échoué. Veuillez réessayer.';
      },
    });
  }
}
