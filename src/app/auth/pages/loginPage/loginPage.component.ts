import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form class="login100-form" [formGroup]="myform" autocomplete="off">
      <span class="login100-form-title p-b-49"> Login </span>

      <div class="wrap-input100 m-b-23">
        <span class="label-input100">Correo</span>
        <input
          class="input100"
          formControlName="email"
          type="email"
          placeholder="Correo electrónico"
        />
        <span class="focus-input100"></span>
      </div>

      <div class="wrap-input100">
        <span class="label-input100">Contraseña</span>
        <input
          class="input100"
          formControlName="password"
          type="password"
          placeholder="Ingrese su contraseña"
        />
        <span class="focus-input100"></span>
      </div>

      <div class="text-right p-t-8 p-b-31"></div>

      <div class="container-login100-form-btn">
        <div class="wrap-login100-form-btn">
          <div class="login100-form-bgbtn"></div>
          <button
            class="login100-form-btn"
            [disabled]="!myform.valid"
            [type]="'submit'"
            (click)="login()"
          >
            Login
          </button>
        </div>
      </div>

      <div class="flex-col-c p-t-60">
        <span class="txt1 p-b-17"> ¿No tienes cuenta? </span>

        <a routerLink="/auth/register" class="txt2"> Crear una aquí </a>
      </div>
    </form>
  `,
  styleUrl: './loginPage.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private service = inject(AuthService);
  private router = inject(Router);

  public myform: FormGroup = this.fb.group({
    email: ['test@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    //Extract the email and password from the form and call the login method from the service
    const { email, password } = this.myform.value;
    this.service.login(email, password).subscribe({
      next: () => {
        console.log('Login success');
        //Mostramos una alerta de éxito son sweetalert2.
        Swal.fire({
          icon: 'success',
          title: 'Login success',
          text: 'Welcome',
          timer: 2000,
        });
        setTimeout(() => {
          //Redirigimos al usuario al dashboard.
          this.router.navigate(['/dashboard']);
        }, 2100);
      },
      error: (error) => {
        console.error('Error:', error);
        //Mostramos una alerta de error son sweetalert2.
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error,
        });
      },
    });
  }
}
