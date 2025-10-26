import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const role = localStorage.getItem('userRole'); // check if userRole exists

  if (role) {
    return true; // logged in
  } else {
    router.navigate(['/login']);
    return false;
  }
};
