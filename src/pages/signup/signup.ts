import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import { newuser } from '../../models/interfaces/newUser';

import { LoginPage } from '../login/login';
import { ProfilepicPage } from '../profilepic/profilepic';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  newuser = {} as newuser;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public userservice: UserProvider,
    public loadingCtrl: LoadingController, 
    public toastCtrl: ToastController
  ) {
    this.newuser.displayName = '';
    this.newuser.email = '';
    this.newuser.password = '';
  }
 
  signup() {

    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    
    // chua chung thuc tai khoan 
    if (this.newuser.email == '' || this.newuser.password == '' || this.newuser.displayName == '') {
      toaster.setMessage('All fields are required dude');
      toaster.present();
    }
    else if (this.newuser.password.length < 7) {
      toaster.setMessage('Password is not strong. Try giving more than six characters');
      toaster.present();
    }
    else {
      let loader = this.loadingCtrl.create({
        content: 'Please wait'
      });
      loader.present();
      this.userservice.adduser(this.newuser)
      .then((res: any) => {
        loader.dismiss();
        if (res.success)
          this.navCtrl.push(ProfilepicPage);
        else
          alert('Error' + res);
      })
      .catch(err => {
        loader.dismiss();
        toaster.setMessage(err.message);
        toaster.present();
      })
    }
  }  
 
  goback() {
    this.navCtrl.setRoot(LoginPage);
  }

}
