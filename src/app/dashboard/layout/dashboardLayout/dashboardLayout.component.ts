import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `

      <h3>USUARIO: </h3>
      <hr>

      <pre>{{user() | json}}</pre>
      <br>

      <a (click)="login()">LOGIN click me</a>

  `,
  styleUrl: './dashboardLayout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {

  private authService = inject(AuthService);
  private route = inject(Router);
  public user =  computed(()=> this.authService.currentUser());
  getUser(){
    return this.user();
  }

  login(){
    this.route.navigateByUrl('/auth/login');
  }

}
