import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  username:string = ""
  password:string = ""

  login() {
    // Add your login logic here
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }
}