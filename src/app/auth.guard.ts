import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from './auth.service';
import * as routes from './constants/routes.constants';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (!authService.isLoggedIn()) {
    console.log('not logged in');
    router.navigate([`/${routes.LOGIN}`]);
    return false;
  }

  console.log('logged in');
  return true;
};
