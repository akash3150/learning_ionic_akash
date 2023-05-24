import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { PhotoService } from '../services/photo.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  component = ExploreContainerComponent;
  @ViewChild('map') mapRef: ElementRef<HTMLElement> | any;
  newMap: GoogleMap | any;
  latitude: any = 0;
  longitude: any = 0;

  constructor(private service: PhotoService,
    private navCtrl: NavController,
    private menu: MenuController,
    private router: Router,
    private geolocation: Geolocation) { }

  ngOnInit() {
    this.service.showLoading(1500);
    this.getCurrentCoordinates();


  }

  async createMap() {
    console.log(this.mapRef.nativeElement);

    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: 'AIzaSyCNvTWfSe_R58Vm3cJqcGy5MDrtWhBVpcs',
      config: {
        center: {
          lat: this.latitude,
          lng: this.longitude,
        },
        zoom: 18,
      },
    });
    const markerId = await this.newMap.addMarker({
      coordinate: {
        lat: this.latitude,
        lng: this.longitude
      }
    });



  }
  go() {
    this.router.navigateByUrl('/tabs')
  }

  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log(this.latitude, this.longitude);

      this.createMap();

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  public openItem(): void {
    this.navCtrl.navigateForward(["tabs1"]);
    this.menu.close();
  }




}
