
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { timeout } from 'rxjs';

/**
 * Service responsable de la gestion des inscriptions.
 * Il centralise les communications HTTP avec l'API
 * afin de ne pas placer ces appels directement dans les composants.
 */
@Injectable({
  // providedIn: 'root' permet à Angular de créer une instance
  // unique du service, accessible dans toute l'application.
  providedIn: 'root'
})
export class Inscription {

  // inject(HttpClient) demande à Angular de fournir une instance
  // du client HTTP. Cela évite de créer manuellement cet objet.
  
  // HttpClient permet d'envoyer des requêtes HTTP vers une API REST.
  private http = inject(HttpClient);

  /**
   * Envoie les données d'un utilisateur au serveur pour son inscription.
   *
   * @param donnees Objet contenant les informations de l'utilisateur.
   * @returns Un Observable représentant la réponse HTTP du serveur.
   *
   * Un Observable permet de gérer une réponse asynchrone :
   * le résultat sera disponible lorsque le serveur aura répondu.
   */
  
inscrire(donnees: Record<string, unknown>): Observable<unknown> {
  return this.http.post<unknown>(
    `${environment.apiUrl}/inscription`,
    donnees
  ).pipe(
    // Déclenche une erreur si le serveur ne répond pas
    // dans les 10 secondes.
    timeout(10000)
  );


  }
}
