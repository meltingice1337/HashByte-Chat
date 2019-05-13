import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  login(username: string, password: string) {
    return this.httpClient.post('http://localhost:8011/auth/login', {
      username: username,
      password: password
    }).pipe(map((x: any) => { this.setToken(x.token) }));
  }

  setToken(x) {
    localStorage.setItem('token', x);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  register(username: string, password: string) {
    return this.httpClient.post('http://localhost:8011/auth/register', {
      username: username,
      password: password
    });
  }
}
