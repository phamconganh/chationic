import { Injectable } from '@angular/core';
// import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
// import { FilePath } from '@ionic-native/file-path';
import firebase from 'firebase';

@Injectable()
export class ImghandlerProvider {

  nativepath: any;

  firestore = firebase.storage();

  constructor(public filechooser: FileChooser) {
  }
 
  uploadimage() {
    let promise = new Promise((resolve, reject) => {
      this.filechooser.open()
      .then((url) => {
        (<any>window).FilePath.resolveNativePath(url, (result) => {;
          this.nativepath = result;
          (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
            res.file((resFile) => {
              let reader = new FileReader();
              reader.readAsArrayBuffer(resFile);
              reader.onloadend = (evt: any) => {
                //type /*
                let imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                let imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
                imageStore.put(imgBlob)
                .then((res) => {
                  this.firestore.ref('/profileimages')
                  .child(firebase.auth().currentUser.uid)
                  .getDownloadURL()
                  .then((url) => {
                    resolve(url);
                  }).catch((err) => {
                    console.log('profileimages');
                    reject(err);
                  })
                }).catch((err) => {
                  console.log('firestore');
                  reject(err);
                })
              }
            })
          })
        })
      })
      .catch(err => {
        reject(err);
      })
    })    
    return promise;   
  }

}