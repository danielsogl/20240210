import { inject } from '@angular/core';
import { CanMatchFn, GuardResult, MaybeAsync, Router } from '@angular/router';
import { AuthService } from './auth.service';

export function authGuard(username?: string, redirect?: string): CanMatchFn {
  return (): MaybeAsync<GuardResult> => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const shallMatch = username
      ? authService.isUser(username)
      : authService.isLoggedIn();

    return redirect && !shallMatch
      ? router.createUrlTree([redirect])
      : shallMatch;
  };
}
