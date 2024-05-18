import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>authLayout works!</p>`,
  styleUrl: './authLayout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayoutComponent { }
