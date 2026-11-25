
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TimeoutError } from 'rxjs';
import { Inscription as InscriptionService } from '../../services/inscription';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css',
})
export class Inscription {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(InscriptionService);
  private readonly router = inject(Router);

  chargement = false;
  messageErreur = '';
  messageSucces = '';

  formulaire = this.fb.nonNullable.group({
    nom: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    motDePasse: ['', [Validators.required, Validators.minLength(8)]],
  });

  inscrire(): void {
    this.messageErreur = '';
    this.messageSucces = '';

    if (this.formulaire.invalid) {
      this.formulaire.markAllAsTouched();
      return;
    }

    this.chargement = true;

    this.service.inscrire(this.formulaire.getRawValue()).subscribe({
      next: () => {
        this.chargement = false;
        this.messageSucces = 'Votre compte a été créé avec succès.';

        // Redirection vers la connexion après une courte confirmation.
        this.router.navigate(['/connexion'], {
          state: { message: this.messageSucces },
        });
      },
      error: (erreur: unknown) => {
  this.chargement = false;

  // Délai d'attente dépassé.
  if (erreur instanceof TimeoutError) {
    this.messageErreur =
      'Le serveur met trop de temps à répondre. Veuillez réessayer.';
    return;
  }

  // L'adresse e-mail est déjà enregistrée.
  if (erreur instanceof HttpErrorResponse && erreur.status === 409) {
    this.messageErreur =
      'Cette adresse e-mail est déjà utilisée. Vous pouvez vous connecter.';
    return;
  }

  // Erreur de validation renvoyée par le backend.
  if (erreur instanceof HttpErrorResponse && erreur.status === 400) {
    this.messageErreur =
      erreur.error?.erreur || 'Veuillez vérifier les informations saisies.';
    return;
  }

  this.messageErreur =
    'Une erreur est survenue lors de la création du compte. Veuillez réessayer.';
},
    });
  }
}
