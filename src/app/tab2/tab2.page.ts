import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PhotoService } from '../services/photo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  showPasswordText = true;
  presentingElement: any = null;

  signupForm: any = this.fb.group({
    phone: ['', [Validators.required, Validators.email]],
    countryCode: ['+1'],
    country: ['']
  });
  countries: any = [];
  allcountries: any = [];
  constructor(private fb: FormBuilder,
    private service: PhotoService,
    private router: Router,
  ) {
    this.presentingElement = document.querySelector('.ion-page');
    this.getMenu1();
  }


  async getMenu1() {
    await fetch("../../assets/country.json").then(res => res.json()).then(json => {
      this.countries = json;
      this.allcountries = json;
    });
  }

  submitForm(): void {
    if (!this.signupForm.value.phone) {
      this.service.presentToast('Please Enter Mobile Number')
    } else {
      this.service.showLoading()
    }
  }
  go(value: string) {
    this.router.navigateByUrl(value)
  }

  searchCountry(event: any) {
    this.countries = this.allcountries.filter((obj: any) => (obj.name).toLowerCase().indexOf((event.target.value).toLowerCase()) > -1)
  }
  onClick(country: any) {
    this.signupForm.patchValue({
      countryCode: country.dial_code,
      country: country.name
    })
  }
}
