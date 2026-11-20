
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Inscription as InscriptionService } from '../../services/inscription';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './connexion.html',
  styleUrl: './connexion.css',
})
export class Connexion {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(InscriptionService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  chargement = false;
  messageErreur = '';
  messageSucces = '';

  formulaire = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    motDePasse: ['', [Validators.required]],
  });

  constructor() {
  // Accède à l'historique uniquement dans le navigateur.
  if (isPlatformBrowser(this.platformId)) {
    this.messageSucces = window.history.state?.message || '';
  }
}

  connecter(): void {
    this.messageErreur = '';

    if (this.formulaire.invalid) {
      this.formulaire.markAllAsTouched();
      return;
    }

    this.chargement = true;

    const donnees = this.formulaire.getRawValue();

    this.service.connecter(donnees.email, donnees.motDePasse).subscribe({
      next: (reponse) => {
        this.chargement = false;

        // Conserve uniquement les informations publiques de l'utilisateur.
        localStorage.setItem(
          'utilisateur',
          JSON.stringify(reponse.utilisateur)
        );

        this.router.navigate(['/pollutions']);
      },
      error: (erreur: HttpErrorResponse) => {
        this.chargement = false;

        this.messageErreur =
          erreur.error?.erreur ||
          'Une erreur est survenue lors de la connexion.';
      },
    });
  }
}
