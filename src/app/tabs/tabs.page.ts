import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController, isPlatform } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import {
  FacebookLogin,
  FacebookLoginResponse,
} from '@capacitor-community/facebook-login';
import { HttpClient } from '@angular/common/http';
import { Browser } from '@capacitor/browser';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Motion } from '@capacitor/motion';
import { Network } from '@capacitor/network';
import { Preferences } from '@capacitor/preferences';

const FACEBOOK_PERMISSIONS = [
  'email'
];

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  showPasswordText = true;
  signupForm: any = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder,
    private service: PhotoService,
    private toastController: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private http: HttpClient
  ) {
    /**
     * Added orientation event for the motion
     */

    // Motion.addListener('orientation', event => {
    //   console.log('Device motion event:', JSON.stringify(event));
    // });

    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', JSON.stringify(status));
    });

    this.logCurrentNetworkStatus();

    if (!isPlatform('capacitor')) {
      GoogleAuth.initialize()
    };
    FacebookLogin.initialize({ appId: '266623475747288' });
    Browser.addListener('browserFinished', () => {
      console.log('Browser finshed');
    });
    let permissions = Filesystem.requestPermissions();
    this.writeFile();
  }


  submitForm(): void {
    if (!this.signupForm.value.email) {
      this.service.presentToast('Please Enter Email')
    } else if (!this.signupForm.value.password) {
      this.service.presentToast('Please Enter Password')
    } else {
      this.service.showLoading();
      // this.go('/home');
      this.openCapacitorSite();

      this.setToken('user');
    }
  }

  /** 
   * Set the token using preferences plugin
  */
  setToken(token: string): void {
    Preferences.set({
      key: 'myAppToken',
      value: token
    })
  }

  go(value: string) {
    this.router.navigateByUrl(value)
  }

  async signIn() {
    let user = await GoogleAuth.signIn();
    console.log('usersss', JSON.stringify(user));
    if (user) {
      this.service.presentToast('Login Successfully');
      this.setToken('user');
      this.go('/home');
      let logout = await GoogleAuth.signOut();
      console.log(logout);

    }
  }


  async faceBookLogin() {
    const result = await (<any>(
      FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS })
    ));
    const result1 = await FacebookLogin.getProfile<{
      email: string;
      name: string;
      birthday: string;
      picture: any
    }>({ fields: ['email', 'name', 'birthday', 'picture'] });
    if (result.accessToken) {
      // Login successful.
      this.setToken(result.accessToken);
      this.service.presentToast('Login Successfully');
      console.log(`Facebook access token is `, JSON.stringify(result), result1);
      this.go('/home');
      await FacebookLogin.logout();
    }
  }



  openCapacitorSite = async () => {
    await Browser.open({ url: 'https://www.flipkart.com/' });
  };


  /*  
    Used to create the file and write the file....
  */
  writeFile = async () => {
    try {
      let data = await Filesystem.writeFile({
        path: 'docs/text.txt',
        data: 'I am writing the file ',
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      console.log(data);
      this.readFile()


    } catch (error: any) {
      console.log('errror', error.message);
    }
  };

  /*  
    Used to read the Data in the file....
  */
  readFile = async () => {
    let uri = await Filesystem.readFile({
      path: 'docs/text.txt',
      directory: Directory.Documents,
    });

    console.log('urrrr', JSON.stringify(uri.data));
  }

  /*  
      Used to read the Directories....
    */
  readDir = async (path: string = '') => {
    let redir = await Filesystem.readdir({
      path: path,
      directory: Directory.Documents
    });
  }


  /*  
      Used to remove/Delete the folder or directory
    */
  async removeDir(directory: string) {
    await Filesystem.rmdir({
      path: directory,
      directory: Directory.Documents
    });
    console.log('Directory removed');
  }

  /*  
    **Used to create the folder or directory**
  */
  async createFolder(folderName: string) {
    let dir = await Filesystem.mkdir({
      path: folderName,
      directory: Directory.Documents
    });
  }


  logCurrentNetworkStatus = async () => {
    const status = await Network.getStatus();

    console.log('Network status:', JSON.stringify(status));
  };


}
