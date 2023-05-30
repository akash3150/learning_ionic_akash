import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { LoadingController, ToastController } from '@ionic/angular';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: UserPhoto[] = [];
  constructor(
    private loadingCtrl: LoadingController,
    private toastController: ToastController) { }


  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      allowEditing: true,
      source: CameraSource.Camera,
      quality: 100
    });
    console.log(capturedPhoto);

    this.photos.unshift({
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath
    });
    console.log(this.photos)
  }


  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
      color: 'warning',
      mode: 'ios',
      animated: true
    });

    await toast.present();
  }


  async showLoading(duration: any = 1000) {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Please wait...',
      duration: duration,
      cssClass: 'loader-css-class',
      mode: 'ios'
    });

    loading.present();
  }




}
