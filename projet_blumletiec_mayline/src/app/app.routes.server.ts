
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Les pages avec un identifiant sont rendues à la demande.
  {
    path: 'pollutions/:id/modifier',
    renderMode: RenderMode.Server,
  },
  {
    path: 'pollutions/:id',
    renderMode: RenderMode.Server,
  },

  // Les autres pages peuvent être prérendues.
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
