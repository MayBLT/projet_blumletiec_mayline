
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Login, Logout } from './auth.actions';
import { AuthStateModel, UserProfile } from './auth.models';

// État initial de l'authentification.
@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null,
    isAuthenticated: false,
  },
})
@Injectable()export class AuthState {

  // Retourne les informations de l'utilisateur connecté.
  @Selector()
  static user(state: AuthStateModel): UserProfile | null {
    return state.user;
  }

  // Indique si un utilisateur est authentifié.
  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return state.isAuthenticated;
  }

  // Retourne le nom de l'utilisateur connecté.
  @Selector([AuthState.user])
  static username(user: UserProfile | null): string | null {
    return user ? user.nom : null;
  }

  // Met à jour le Store après une connexion.
  @Action(Login)
  login(
    ctx: StateContext<AuthStateModel>,
    action: Login
  ): void {
    const user: UserProfile = {
      id: action.payload.id ?? 0,
      email: action.payload.email,
      nom: action.payload.nom,
      role: action.payload.role ?? 'user',
    };

    ctx.patchState({
      user,
      isAuthenticated: true,
    });
  }

  // Réinitialise le Store après une déconnexion.
  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>): void {
    ctx.setState({
      user: null,
      isAuthenticated: false,
    });
  }
}
