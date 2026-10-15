/**
 * Interface représentant une pollution déclarée.
 * Elle définit les informations nécessaires à la déclaration.
 */
export interface Pollution {
  titre: string;       // Titre de la déclaration
  type: string;        // Type de pollution
  description: string; // Description de la pollution
  date: string;        // Date de constatation

  codePostal: string;  // Code postal du lieu
  ville: string;       // Ville où la pollution a été constatée
  pays: string;        // Pays du lieu
  rue?: string;        // Rue (facultative)
  numero?: string;     // Numéro de rue (facultatif)

  latitude: number;    // Coordonnée géographique nord-sud
  longitude: number;   // Coordonnée géographique est-ouest
  photoUrl?: string;   // URL de la photo (facultative)
}