import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  constructor(private httpClient: HttpClient, private router: Router) {}
  sendRegisterData(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.BASE_URL}/api/v1/users/signUp`,
      data
    );
  }
  sendLoginData(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.BASE_URL}/api/v1/users/signIn`,
      data
    );
  }

  saveUserToken(): void {
    const token1 = localStorage.getItem('token')!;
    this.userData = jwtDecode(token1);
    console.log(this.userData);
  }
  logOut(): void {
    localStorage.removeItem('token');
    this.userData = null;
    this.router.navigate(['/login']);
  }
}
