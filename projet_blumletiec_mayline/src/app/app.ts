
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';

import { AuthState } from './states/auth/auth.state';
import { Logout } from './states/auth/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  // Sélecteurs réactifs de l'utilisateur et de son état de connexion.
  utilisateur = this.store.selectSignal(AuthState.user);
  estAuthentifie = this.store.selectSignal(AuthState.isAuthenticated);

  // Déconnecte l'utilisateur et revient à la page de connexion.
  deconnecter(): void {
    this.store.dispatch(new Logout()).subscribe({
      next: () => {
        this.router.navigate(['/connexion']);
      },
      error: (erreur) => {
        console.error('Erreur lors de la déconnexion :', erreur);
      },
    });
  }
}
