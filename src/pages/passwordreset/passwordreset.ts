import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {

  email: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userservice: UserProvider, 
    public alertCtrl: AlertController
  ) {}

  reset() {
    // chua co hien thi dang nhap sau khi xac nhan mk moi
    // chua internal resetpassword
    // To complete the password reset, call firebase.auth.Auth#confirmPasswordReset 
    // with the code supplied in the email sent to the user, along 
    // with the new password specified by the user.
    let alert = this.alertCtrl.create({
      buttons: ['Ok']
    });
    this.userservice.passwordreset(this.email)
    .then((res: any) => {
      if (res.success) {
        alert.setTitle('Email Sent');
        alert.setSubTitle('Please follow the instructions in the email to reset your password');
        alert.present()
      }
      else {
        alert.setTitle('Failed');
        alert.present()
      }
    })
    .catch(err => {
      alert.setTitle('Error');
      alert.setSubTitle(err);
      alert.present()
    })
  }

  goback() {
    this.navCtrl.setRoot(LoginPage);
  }

}