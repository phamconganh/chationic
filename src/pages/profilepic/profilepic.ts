import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

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
    public navParams: NavParams, 
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
      alert(err);
    })
  }

  updateproceed() {
    // chua UI cho err
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    })
    loader.present();
    this.userservice.updateimage(this.imgurl)
    .then((res: any) => {
      loader.dismiss();
      if (res.success) {
        this.navCtrl.setRoot(TabsPage);
      }
      else {
        alert(res);
      }
    })
    .catch(err => {
      alert(err);
    })
  }

  proceed() {
    this.navCtrl.setRoot(TabsPage);
  }

}
