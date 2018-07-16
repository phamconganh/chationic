import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

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

  constructor(private navCtrl: NavController, private authService: AuthProvider, private alertCtrl: AlertController) {
  }

  login() {
    let alert = this.alertCtrl.create({
      buttons: ['Ok']
    });
    this.authService.login(this.credentials)
    .then((res: any) => {
      if (!res.code)
        this.navCtrl.setRoot(TabsPage);
      else{
        alert.setTitle('Login Error');
        alert.present();
      }
    })
    .catch(err => {
      alert.setTitle('Login Error');
      alert.setSubTitle(err.message);
      alert.present();
    })
  }

  passwordreset() {
    this.navCtrl.push(PasswordresetPage);
  }
   
  signup() {
    this.navCtrl.push(SignupPage);
  }

}
