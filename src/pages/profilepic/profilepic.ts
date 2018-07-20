import { Component, NgZone } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';

import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { UserProvider } from '../../providers/user/user';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-profilepic',
  templateUrl: 'profilepic.html',
})

export class ProfilepicPage {

  imgurl = '../../assets/imgs/defaultProfilepic.png';

  moveon = true;

  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public imgservice: ImghandlerProvider,
    public zone: NgZone, 
    public userservice: UserProvider, 
    public loadingCtrl: LoadingController
  ) {
  }

  chooseimage() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    })
    loader.present();
    this.imgservice.uploadimage()
    .then((uploadedurl: any) => {
      loader.dismiss();
      this.zone.run(() => {
        this.imgurl = uploadedurl;
        this.moveon = false;
      })
    })
    .catch(err => {
      loader.dismiss();
      let alert = this.alertCtrl.create({
        buttons: ['Ok']
      });
      alert.setTitle('Choose Image Error');
      alert.setSubTitle(err);
      alert.present();
    })
  }

  updateproceed() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    })
    loader.present();
    let alert = this.alertCtrl.create({
      buttons: ['Ok']
    });
    this.userservice.updateimage(this.imgurl)
    .then((res: any) => {
      loader.dismiss();
      if (res.success) {
        this.navCtrl.setRoot(TabsPage);
      }
      else {
        alert.setTitle('Update Image Error');
        alert.present();
      }
    })
    .catch(err => {
      loader.dismiss();
      alert.setTitle('Update Proceed Error');
      alert.setSubTitle(err.message);
      alert.present();
    })
  }

  proceed() {
    this.navCtrl.setRoot(TabsPage);
  }

}
