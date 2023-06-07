import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
// import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { FilePath } from '@awesome-cordova-plugins/file-path/ngx';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private flashlight: Flashlight,
    private chooser: Chooser,
    private filePath: FilePath
    // private barcodeScanner: BarcodeScanner,
  ) { }
  isTorch = false;
  src: any = '';
  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      webUseInput: true,
      promptLabelHeader: 'Select Prompt',
      promptLabelPhoto: 'Gallery',
      promptLabelPicture: 'Camera'
    });

    let imageUrl = image.webPath;

    console.log(imageUrl, 'imageUrl');
    // // Can be set to the src of an image now
    this.src = imageUrl;
  }

  onFlashlight = async () => {
    try {
      this.isTorch = false;
      await this.flashlight.switchOn();
    } catch (error) {
      console.log(error);
    }
  }

  offFlashlight() {
    this.isTorch = true;
    this.flashlight.switchOff();
  }

  /**
   * You can choose any file from this
   */

  chooseFile = () => {
    this.chooser.getFile({ mimeTypes: 'application/pdf', maxFileSize: 1024 })
      .then((file: any) => {
        file ? this.getNativePath(file.uri) : ''
        console.log('filesss', file ? file.uri : 'canceled')
      })
      .catch((error: any) => console.error(error));
  }

  changeListener(event: any) {
    console.log(event.target.files[0]);
  }

  // scanCode = () => {
  //   this.barcodeScanner.scan({ showTorchButton: true })
  //     .then((barcodeData: any) => {
  //       console.log('Barcode data', JSON.stringify(barcodeData));
  //     }).catch((err: any) => {
  //       console.log('Error', err);
  //     });
  // }

  /**
   * @param path 
   *  path to of the file to get native path
   */
  getNativePath = (path: any) => {
    this.filePath.resolveNativePath(path)
      .then(filePath => console.log(filePath))
      .catch(err => console.log(err));
  };




}
