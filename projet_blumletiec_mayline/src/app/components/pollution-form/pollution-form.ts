
 // Importe les outils nécessaires au composant Angular.
import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

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

  // Modules nécessaires au fonctionnement du composant.
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],

  // Fichiers HTML et CSS associés au composant.
  templateUrl: './pollution-form.html',
  styleUrl: './pollution-form.css',
})
export class PollutionForm implements OnChanges {
  // Contient les champs et les règles de validation du formulaire.
  pollutionForm: FormGroup;

  @Input() isSubmitting = false;

  // Émet les données lorsque le formulaire est valide.
  @Output() pollutionValidated = new EventEmitter<Pollution>();

  // Signale au parent que le traitement est terminé.
@Output() submissionFinished = new EventEmitter<void>();

  // Pollution reçue du composant parent en mode modification.
  @Input() pollution: Pollution | null = null;



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
    console.log('Formulaire initialisé :', this.pollutionForm);
  }

  // Détecte l'arrivée d'une déclaration à modifier.
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pollution'] && this.pollution !== null) {
      // Préremplit le formulaire avec les données existantes.
      this.pollutionForm.patchValue(this.pollution);
    }
  }

  // Réactive le bouton lorsque le traitement est terminé.
finishSubmission(): void {
  this.isSubmitting = false;
}

  // Vérifie le formulaire et transmet les données si elles sont valides.
  
  // Vérifie le formulaire et transmet les données si elles sont valides.
  onSubmit(): void {
    console.log('Le formulaire a été soumis');

    console.log('Formulaire valide :', this.pollutionForm.valid);
    console.log('Valeurs saisies :', this.pollutionForm.value);

    // Arrête la soumission si un champ obligatoire est invalide.
    if (this.pollutionForm.invalid) {
      this.pollutionForm.markAllAsTouched();

      // Affiche les erreurs de chaque champ pour identifier le blocage.
      console.log('Formulaire invalide, arrêt de la soumission');

      Object.keys(this.pollutionForm.controls).forEach((champ) => {
        const controle = this.pollutionForm.get(champ);

        if (controle?.invalid) {
          console.log(`Champ invalide : ${champ}`, controle.errors);
        }
      });

      return;
    }
  

    // Récupère les valeurs saisies et convertit les coordonnées en nombres.
    const pollution: Pollution = {
      ...this.pollutionForm.value,

      // Conserve l'identifiant si la déclaration est modifiée.
      ...(this.pollution?.id !== undefined
        ? { id: this.pollution.id }
        : {}),

      latitude: Number(this.pollutionForm.value.latitude),
      longitude: Number(this.pollutionForm.value.longitude),
    };

    // Transmet la déclaration validée au composant parent.
    console.log('Émission de la pollution :', pollution);
    this.pollutionValidated.emit(pollution);
  }

}
