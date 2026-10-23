
import { Component } from '@angular/core';

// Importe le composant du formulaire d'inscription.
import { InscriptionForm } from './components/inscription-form/inscription-form';

@Component({
  // Sélecteur du composant principal de l'application.
  selector: 'app-root',

  // Importe le composant affiché dans le template principal.
  imports: [InscriptionForm],

  // Fichiers HTML et CSS associés à la page principale.
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
