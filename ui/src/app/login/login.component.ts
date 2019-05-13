import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {
    username: '',
    password: ''
  };
  login = true;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private snack: MatSnackBar
  ) { }

  ngOnInit() {
  }

  loginAcc(f) {
    this.loginService.login(this.user.username, this.user.password).subscribe(x => {
      localStorage.setItem('currentUser', this.user.username);
      this.router.navigate(['dashboard']);
    }, err => {
      this.snack.open(`Error! ${err.error.message}`)
    });
  }

  registerAcc(f) {
    // console.log(f);
    this.loginService.register(this.user.username, this.user.password).subscribe(x => {
      this.login = true;
      this.snack.open('Success! User was created!')
    }, err => {
      this.snack.open(`Error! ${err.error.message}`)
    });
  }

}
