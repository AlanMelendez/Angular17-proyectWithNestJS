import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { AuthStatus } from './auth/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'authAppAngular-WithNestJS';

  //Aplicamos siempre la autencicación en el componente principal. (ya que todo pasa por aqui o crearse un modulo macro como un dashboard etc etc.)
  private authService = inject(AuthService);

  private router = inject(Router);

  public finshedAuthCheck = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.checking) {
      return false;
    }

    return true;
  });

  public authStatusChange = effect(() => {
    console.log('authStatusChange', this.authService.authStatus());
    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        return;
      case AuthStatus.autenticated:
        this.router.navigateByUrl('/dashboard');
        return;
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;
    }
  });
}
