
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
import { environment } from '../../environments/environment';

// Informations nécessaires pour créer un compte.
export interface DonneesInscription {
  nom: string;
  email: string;
  motDePasse: string;
}

// Informations retournées par le backend.
export interface Utilisateur {
  id: number;
  nom: string;
  email: string;
}

// Réponse du backend après une connexion réussie.
export interface ReponseConnexion {
  message: string;
  utilisateur: Utilisateur;
}

/**
 * Service responsable de l'inscription et de la connexion.
 * Il centralise les communications HTTP avec l'API.
 */
@Injectable({
  providedIn: 'root'
})
export class Inscription {

  private http = inject(HttpClient);

  // URL de base de l'API, définie dans environment.ts.
  private readonly apiUrl = `${environment.apiUrl}/users`;

  /**
   * Crée un nouveau compte utilisateur.
   */
  inscrire(donnees: DonneesInscription): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(
      this.apiUrl,
      donnees
    ).pipe(
      timeout(10000)
    );
  }

  /**
   * Vérifie les identifiants d'un utilisateur.
   */
  connecter(email: string, motDePasse: string): Observable<ReponseConnexion> {
    return this.http.post<ReponseConnexion>(
      `${this.apiUrl}/login`,
      { email, motDePasse }
    ).pipe(
      timeout(10000)
    );
  }
}
