import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);



  //Url a la que se intenta acceder
  const url = state.url;

  // console.log({staus: authService.authStatus()});

  if(authService.authStatus() === AuthStatus.autenticated){
    return true;
  }

  //Si no está autenticado, redirigimos a la página de login
  router.navigate(['/auth/login'], { queryParams: { returnUrl: url } });

  /**
   * Mandamos la ruta anterior, por que en el guard del login, si ya esta autenticado, redirigimos a la ruta anterior.
   */
  return false;
};
