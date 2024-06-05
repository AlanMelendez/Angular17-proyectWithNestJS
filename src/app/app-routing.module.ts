import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard/layout/dashboardLayout/dashboardLayout.component';
import { isAuthenticatedGuard } from './auth/guards/isAuthenticated.guard';
import { isNotAuthenticatedGuard } from './auth/guards/isNotAuthenticated.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [isNotAuthenticatedGuard]

  },
  {
    path: 'dashboard',
    // loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    component: DashboardLayoutComponent,
    canActivate: [isAuthenticatedGuard]
  },
  // {
  //   path: '',
  //   redirectTo: 'auth',
  //   pathMatch: 'full'
  // },
  {
    path: '**',
    redirectTo: 'auth'

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
