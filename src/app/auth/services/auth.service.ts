import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../enviroments/enviroments'; // Import the environment variable
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);


  public currentUser =  computed(() => this._currentUser());  // Create a computed property
  public authStatus = computed(() => this._authStatus());  // Create a computed property


  //Cream9os un objeto con las opciones de la petición HTTP
   httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
    'Allow-Control-Allow-Origin': '*',
  });

  constructor() { }

  login(email: string, password: string): Observable<boolean>{
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };


    return this.http.post<LoginResponse>(url, body, { ...this.httpOptions})
      .pipe(


        tap(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this._currentUser.set(response.user);
          this._authStatus.set(AuthStatus.autenticated);
        }),
        map(() => true),
        catchError(error => {
          return throwError(()=> "Error al iniciar sesión, este es el error "+ error.message);
        })
      );


  }


  checkAuthStatus(): Observable<boolean>{
    const url = `${this.baseUrl}/auth/checkToken`;
    const token = localStorage.getItem('token');
    if(!token){
      this._currentUser.set(null);
      this._authStatus.set(AuthStatus.notAuthenticated);
      return of(false);
    }

    this.httpOptions = this.httpOptions.set(
      'Authorization',  'Bearer ' + token
    )
    return this.http.get<CheckTokenResponse>(url, { ...this.httpOptions})
      .pipe(
        tap(user => {
          this._currentUser.set(user.user);
          this._authStatus.set(AuthStatus.autenticated);
          localStorage.setItem('token',user.token)
        }),
        map(() => true),
        catchError(error => {
          this._currentUser.set(null);
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false);
        })
      );
  }
}
