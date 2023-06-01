import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() { }

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

}
