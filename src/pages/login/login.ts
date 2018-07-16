import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { usercreds } from '../../models/interfaces/userCreds';
import { AuthProvider } from '../../providers/auth/auth';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { PasswordresetPage } from '../passwordreset/passwordreset';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credentials = {} as usercreds;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthProvider) {
  }

  // thieu alert error
  login() {
    this.authService.login(this.credentials)
    .then((res: any) => {
      if (!res.code)
        this.navCtrl.setRoot(TabsPage);
      else
        alert(res);
    })
  }

  passwordreset() {
    this.navCtrl.push(PasswordresetPage);
  }
   
  signup() {
    this.navCtrl.push(SignupPage);
  }

}
