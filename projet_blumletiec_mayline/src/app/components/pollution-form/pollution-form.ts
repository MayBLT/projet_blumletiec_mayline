import { Component, EventEmitter, Output } from '@angular/core';

// Importe les directives Angular communes, notamment *ngIf.
import { CommonModule } from '@angular/common';

// Importe les outils nécessaires aux formulaires réactifs.
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

// Importe le modèle représentant une pollution.
import { Pollution } from '../../models/pollution';

@Component({
  // Nom de la balise HTML permettant d'utiliser le composant.
  selector: 'app-pollution-form',

  // Module nécessaire à l'utilisation des formulaires réactifs.
  imports: [CommonModule,ReactiveFormsModule],

  // Fichiers HTML et CSS associés au composant.
  templateUrl: './pollution-form.html',
  styleUrl: './pollution-form.css',
})
export class PollutionForm {
  // Contient les champs et les règles de validation du formulaire.
  pollutionForm: FormGroup;

  // Émet les données lorsque le formulaire est valide.
  @Output() pollutionValidated = new EventEmitter<Pollution>();

  // Initialise le formulaire et définit les validations de chaque champ.
  constructor(private formBuilder: FormBuilder) {
    this.pollutionForm = this.formBuilder.group({
      // Le titre est obligatoire et doit contenir au moins 3 caractères.
      titre: ['', [Validators.required, Validators.minLength(3)]],

      // Le type de pollution doit être sélectionné.
      type: ['', Validators.required],

      // La description est obligatoire et doit contenir au moins 10 caractères.
      description: ['', [Validators.required, Validators.minLength(10)]],

      // La date de constatation est obligatoire.
      date: ['', Validators.required],

      // Le code postal est obligatoire.
      codePostal: ['', Validators.required],

      // La ville est obligatoire.
      ville: ['', Validators.required],

      // Le pays est obligatoire.
      pays: ['', Validators.required],

      // La rue est facultative.
      rue: [''],

      // Le numéro de rue est facultatif.
      numero: [''],

      // Les coordonnées géographiques doivent être comprises dans leurs limites.
      latitude: [
        '',
        [Validators.required, Validators.min(-90), Validators.max(90)],
      ],
      longitude: [
        '',
        [Validators.required, Validators.min(-180), Validators.max(180)],
      ],

      // L'URL de la photo est facultative.
      photoUrl: [''],
    });
  }

  // Vérifie le formulaire et transmet les données si elles sont valides.
  onSubmit(): void {
    // Si le formulaire est invalide, affiche les erreurs de validation.
    if (this.pollutionForm.invalid) {
      this.pollutionForm.markAllAsTouched();
      return;
    }

    // Récupère les valeurs saisies et les convertit au format du modèle.
    const pollution: Pollution = {
      ...this.pollutionForm.value,
      latitude: Number(this.pollutionForm.value.latitude),
      longitude: Number(this.pollutionForm.value.longitude),
    };

    // Transmet la déclaration validée au composant parent.
    this.pollutionValidated.emit(pollution);
  }
}