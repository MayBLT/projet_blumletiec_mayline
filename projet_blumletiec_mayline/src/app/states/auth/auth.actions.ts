
import { UserProfile } from './auth.models';

// Action déclenchée lorsqu'un utilisateur se connecte.
export class Login {
  static readonly type = '[Auth] Login';

  constructor(
    public payload: {
      email: string;
      nom: string;
      id?: number;
      role?: string;
    }
  ) {}
}

// Action déclenchée lorsqu'un utilisateur se déconnecte.
export class Logout {
  static readonly type = '[Auth] Logout';
}
