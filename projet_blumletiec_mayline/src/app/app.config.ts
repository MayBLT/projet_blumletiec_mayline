
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { provideStore } from '@ngxs/store';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';

import { routes } from './app.routes';
import { AuthState } from './states/auth/auth.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),

    // Enregistre le State d'authentification et active NGXS.
    provideStore(
      [AuthState],
      withNgxsStoragePlugin({
        keys: ['auth'],
      })
    ),
  ],
};
