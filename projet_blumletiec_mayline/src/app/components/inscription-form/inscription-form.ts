
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Inscription } from '../../services/inscription';
import { finalize } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Composant responsable de l'affichage et de la gestion
 * du formulaire d'inscription d'un utilisateur.
 */
@Component({
  selector: 'app-inscription-form',

  // Importe les modules nécessaires au formulaire réactif
  // et aux directives Angular utilisées dans le template.
  imports: [CommonModule, ReactiveFormsModule],

  templateUrl: './inscription-form.html',
  styleUrl: './inscription-form.css'
})
export class InscriptionForm {

  // Injection du FormBuilder : Angular fournit cet outil
  // pour construire et configurer facilement le formulaire.
  private formBuilder = inject(FormBuilder);

  // Injection du service d'inscription.
  // Le composant délègue les requêtes HTTP au service
  // plutôt que de communiquer directement avec le serveur.
  private inscriptionService = inject(Inscription);

  // Indique si une requête d'inscription est en cours.
  envoiEnCours = false;

  // Contient le message à afficher après la requête HTTP.
  message = '';

  // Indique si le message correspond à une erreur.
  erreur = false;

  // Création du formulaire et définition des règles de validation.
  // Les champs nom, email et motDePasse sont obligatoires.
  // Le format de l'adresse e-mail et la longueur du mot de passe
  // sont également vérifiés par Angular.
  

formulaire = this.formBuilder.nonNullable.group({
  // Le nom et le prénom acceptent les lettres,
  // les espaces, les tirets et les apostrophes.
  nom: [
    '',
    [
      Validators.required,
      Validators.pattern(/^[\p{L}]+(?:[ '-][\p{L}]+)*$/u)
    ]
  ],

  prenom: [
    '',
    [
      Validators.required,
      Validators.pattern(/^[\p{L}]+(?:[ '-][\p{L}]+)*$/u)
    ]
  ],

  // Vérifie le format de l'adresse e-mail.
  email: ['', [Validators.required, Validators.email]],

  // Le mot de passe doit contenir au moins huit caractères.
  motDePasse: ['', [Validators.required, Validators.minLength(8)]],

  // La confirmation est obligatoire.
  confirmationMotDePasse: ['', Validators.required],

  // La date de naissance est obligatoire.
  dateNaissance: ['', Validators.required]
});



  
/**
 * Vérifie le formulaire puis transmet les données au service.
 * Le chargement est arrêté que la requête réussisse ou échoue.
 */
onSubmit(): void {
  if (this.formulaire.invalid) {
    this.formulaire.markAllAsTouched();
    this.message = 'Veuillez corriger les champs du formulaire.';
    this.erreur = true;
    return;
  }

  // Empêche une requête inutile si l'API n'est pas configurée.
  if (!environment.apiUrl.trim()) {
    this.message = 'Erreur : l’adresse de l’API n’est pas configurée.';
    this.erreur = true;
    return;
  }

  const donnees = this.formulaire.getRawValue();

  this.envoiEnCours = true;
  this.message = '';
  this.erreur = false;

  this.inscriptionService.inscrire(donnees)
    .pipe(
      // Exécuté à la fin de la requête, en cas de succès ou d'erreur.
      finalize(() => {
        this.envoiEnCours = false;
      })
    )
    .subscribe({
      next: () => {
        this.message = 'La demande d’inscription a été envoyée.';
        this.erreur = false;
        this.formulaire.reset();
      },

      error: () => {
        this.message =
          'Impossible de réaliser l’inscription. Vérifiez le serveur et l’adresse de l’API.';
        this.erreur = true;
      }
    });
}

}
