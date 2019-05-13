import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users = [];
  messages = [];
  msg = '';
  constructor(
    private loginService: LoginService,
    private dashService: DashboardService
  ) { }

  ngOnInit() {
    this.dashService.init();
    this.dashService.connectedUsers.subscribe((x: any) => {
      this.users = x;
    });
    this.dashService.userDisconnected.subscribe((x: any) => {
      this.users = this.users.filter(u => u !== x);
    });
    this.dashService.userConnected.subscribe((x: any) => {
      this.users.push(x);
    });
    this.dashService.messages.subscribe((x: any) => {
      if (localStorage.getItem('currentUser') === x.username) {
        this.messages.push({
          username: x.username,
          msg: x.message,
          me: true,
          date: new Date()
        });
      } else {
        this.messages.push({
          username: x.username,
          msg: x.message,
          me: false,
          date: new Date()
        });
      }
    });
  }

  logout() {
    this.loginService.logout();
    this.dashService.close();
  }

  isEnter(ev) {
    if (ev.keyCode == 13) {
      this.sendMsg();
    }
  }

  sendMsg() {
    if (this.msg) {
      this.dashService.sendMessage(this.msg);
    }
    this.msg = '';
  }

}
