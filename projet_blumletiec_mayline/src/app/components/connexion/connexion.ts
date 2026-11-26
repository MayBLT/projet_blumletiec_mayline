
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TimeoutError } from 'rxjs';
import { Store } from '@ngxs/store';

import { Inscription as InscriptionService } from '../../services/inscription';
import { Login } from '../../states/auth/auth.actions';

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
  private readonly store = inject(Store);

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

    // Vérifie les identifiants auprès de l'API.
    this.service.connecter(donnees.email, donnees.motDePasse).subscribe({
      next: (reponse) => {
        const utilisateur = reponse.utilisateur;

        // Enregistre l'utilisateur dans le Store NGXS.
        this.store.dispatch(
          new Login({
            id: utilisateur.id,
            email: utilisateur.email,
            nom: utilisateur.nom,
          })
        ).subscribe({
          next: () => {
            this.chargement = false;
            this.router.navigate(['/pollutions']);
          },
          error: () => {
            this.chargement = false;
            this.messageErreur =
              'Impossible d’enregistrer la session utilisateur.';
          },
        });
      },
      error: (erreur: unknown) => {
        this.chargement = false;

        // Cas où le serveur met trop de temps à répondre.
        if (erreur instanceof TimeoutError) {
          this.messageErreur =
            'Le serveur met trop de temps à répondre. Veuillez réessayer.';
          return;
        }

        // Cas où les identifiants sont incorrects.
        if (erreur instanceof HttpErrorResponse && erreur.status === 401) {
          this.messageErreur = 'Adresse e-mail ou mot de passe incorrect.';
          return;
        }

        // Erreur de validation renvoyée par le backend.
        if (erreur instanceof HttpErrorResponse && erreur.status === 400) {
          this.messageErreur =
            erreur.error?.erreur ||
            'Veuillez vérifier les informations saisies.';
          return;
        }

        this.messageErreur =
          'Une erreur est survenue lors de la connexion. Veuillez réessayer.';
      },
    });
  }
}
