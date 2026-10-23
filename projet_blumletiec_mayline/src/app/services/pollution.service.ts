
/**
 * Service chargé de gérer les déclarations de pollution.
 * Il communique avec le backend simulé grâce à HttpClient.
 */
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Pollution } from '../models/pollution';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PollutionService {
  // Client HTTP utilisé pour envoyer les requêtes à l'API.
  private readonly http = inject(HttpClient);

  // Adresse de la ressource "pollutions" de l'API.
  private readonly apiUrl = `${environment.apiUrl}/pollutions`;

  /**
   * Récupère toutes les déclarations.
   */
  getAll(): Observable<Pollution[]> {
    return this.http.get<Pollution[]>(this.apiUrl);
  }

  /**
   * Récupère une déclaration à partir de son identifiant.
   */
  getById(id: number): Observable<Pollution> {
    return this.http.get<Pollution>(`${this.apiUrl}/${id}`);
  }

  /**
   * Ajoute une nouvelle déclaration.
   */
  create(pollution: Pollution): Observable<Pollution> {
    return this.http.post<Pollution>(this.apiUrl, pollution);
  }

  /**
   * Modifie une déclaration existante.
   */
  update(id: number, pollution: Pollution): Observable<Pollution> {
    return this.http.put<Pollution>(`${this.apiUrl}/${id}`, pollution);
  }

  /**
   * Supprime une déclaration.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
