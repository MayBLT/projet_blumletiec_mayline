/**
 * Service chargé de communiquer avec l'API de pollution.
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
  private readonly http = inject(HttpClient);

  // URL de la ressource pollution dans le backend Express.
  private readonly apiUrl = `${environment.apiUrl}/pollutions`;

  /**
   * Récupère toutes les déclarations depuis PostgreSQL.
   */
  getAll(): Observable<Pollution[]> {
    return this.http.get<Pollution[]>(this.apiUrl);
  }

  /**
   * Récupère une déclaration par son identifiant.
   * Cette route devra être ajoutée au backend.
   */
  getById(id: number): Observable<Pollution> {
    return this.http.get<Pollution>(`${this.apiUrl}/${id}`);
  }

  /**
   * Ajoute une déclaration.
   * Cette route devra être ajoutée au backend.
   */
  create(pollution: Pollution): Observable<Pollution> {
    return this.http.post<Pollution>(this.apiUrl, pollution);
  }

  /**
   * Modifie une déclaration.
   * Cette route devra être ajoutée au backend.
   */
  update(id: number, pollution: Pollution): Observable<Pollution> {
    return this.http.put<Pollution>(`${this.apiUrl}/${id}`, pollution);
  }

  /**
   * Supprime une déclaration.
   * Cette route devra être ajoutée au backend.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}