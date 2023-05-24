import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController, isPlatform } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'
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
  ) {
    if (!isPlatform('capacitor')) {
      GoogleAuth.initialize()
    }
  }

  submitForm(): void {
    if (!this.signupForm.value.email) {
      this.service.presentToast('Please Enter Email')
    } else if (!this.signupForm.value.password) {
      this.service.presentToast('Please Enter Password')
    } else {
      this.service.showLoading();
      this.go('/home')
    }

  }

  go(value: string) {
    this.router.navigateByUrl(value)
  }

  async signIn() {
    let user = await GoogleAuth.signIn();
    console.log('usersss', JSON.stringify(user));
    if (user) {
      this.go('/home');
    }

  }



}
