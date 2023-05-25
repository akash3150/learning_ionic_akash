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
    if (!isPlatform('capacitor')) {
      GoogleAuth.initialize()
    };
    FacebookLogin.initialize({ appId: '266623475747288' });
  }


  submitForm(): void {
    if (!this.signupForm.value.email) {
      this.service.presentToast('Please Enter Email')
    } else if (!this.signupForm.value.password) {
      this.service.presentToast('Please Enter Password')
    } else {
      this.service.showLoading();
      this.go('/home');
      localStorage.setItem('myAppToken', 'user')
    }

  }

  go(value: string) {
    this.router.navigateByUrl(value)
  }

  async signIn() {
    let user = await GoogleAuth.signIn();
    console.log('usersss', JSON.stringify(user));
    if (user) {
      this.service.presentToast('Login Successfully');
      localStorage.setItem('myAppToken', 'user')
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
      localStorage.setItem('myAppToken', result.accessToken)
      this.service.presentToast('Login Successfully');
      console.log(`Facebook access token is `, JSON.stringify(result), result1);
      this.go('/home');
      await FacebookLogin.logout();
    }
  }








}
