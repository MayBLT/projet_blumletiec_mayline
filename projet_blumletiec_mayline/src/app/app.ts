import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  login = '';
  password = '';
  confirmPassword = '';

  nom = '';
  prenom = '';
  email = '';

  numero = '';
  rue = '';
  codePostal = '';
  ville = '';

  submitted = false;

  onSubmit(): void {
    this.submitted = true;
  }

  resetForm(): void {
    this.login = '';
    this.password = '';
    this.confirmPassword = '';

    this.nom = '';
    this.prenom = '';
    this.email = '';

    this.numero = '';
    this.rue = '';
    this.codePostal = '';
    this.ville = '';

    this.submitted = false;
  }
}