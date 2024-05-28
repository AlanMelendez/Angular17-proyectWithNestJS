import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../enviroments/enviroments'; // Import the environment variable
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthStatus, User } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = environment.baseUrl;
  private http = inject(HttpClient);


  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  constructor() { }

  login(email: string, password: string): Observable<boolean>{
   this.http.post(`${this.baseUrl}/login`, { email, password });

   return of(true);
  }

}
