import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
// import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { FilePath } from '@awesome-cordova-plugins/file-path/ngx';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet'
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  fileTransfer: FileTransferObject = FileTransfer.create();
  constructor(
    private flashlight: Flashlight,
    private chooser: Chooser,
    private filePath: FilePath,
    // private barcodeScanner: BarcodeScanner,
  ) { }
  isTorch = false;
  src: any = '';
  takePicture = async () => {
    const result = await ActionSheet.showActions({
      options: [
        {
          title: 'Gallery',
          icon: 'https://cdn-icons-png.flaticon.com/512/1375/1375106.png'
        },
        {
          title: 'Photo',
          icon: 'https://w7.pngwing.com/pngs/639/614/png-transparent-computer-icons-camera-camera-photography-rectangle-camera-icon-thumbnail.png'
        }
      ],
    });
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
    this.chooser.getFile({ mimeTypes: 'application/pdf' })
      .then((file: any) => {
        console.log(typeof file.uri, JSON.stringify({ ...file, data: undefined }))
        file ? this.upload(file.uri, file.name, file.mediaType) : '';
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
      .then(filePath => {
        console.log(filePath, 'Native file path');

      })
      .catch(err => {
        console.log('error in native path', err.message);
      });
  };


  /**
   * Open the local file 
   *  -- First we need to copy File to external cache and then we need to open the local file
   */
  openFile = async () => {
    try {
      const url = "sample.pdf";
      await File.copyFile(File.applicationDirectory + 'public/assets/', 'sample.pdf', File.externalCacheDirectory, 'sample.pdf')
      console.log(File.externalCacheDirectory);
      await FileOpener.showOpenWithDialog(File.externalCacheDirectory + url, 'application/pdf')
    } catch (e: any) {
      console.log('Error opening file,', e.message)
    }
  }

  upload(path: string, name: string, mimeType: string) {
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: name,
      mimeType: mimeType,
      headers: {}
    }

    this.fileTransfer.upload(path, 'http://44.208.234.172:80/api/upload', options, true)
      .then((data: any) => {
        let value = JSON.parse(data.response)
        this.src = value.data;
        this.download(value.data, name)
        alert(value.message);
        console.log(JSON.stringify(data.response.data));
        // success
      }, (err) => {
        alert(err.message)
        console.log(JSON.stringify(err.message));

        // error
      })

  };
  /**
   * @param path 
   *  path to of the file to get native path
   */
  download(url: any, name: string) {
    this.fileTransfer.download(url, File.dataDirectory + name).then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      console.log('Error found');
    });
  }

}
