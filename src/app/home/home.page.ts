import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { PhotoService } from '../services/photo.service';
import { Router } from '@angular/router';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { MenuController, NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocalNotifications } from '@capacitor/local-notifications'
import { Share } from '@capacitor/share';
import { Preferences } from '@capacitor/preferences';
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
  wait: any;

  constructor(private service: PhotoService,
    private navCtrl: NavController,
    private menu: MenuController,
    private router: Router,
    private geolocation: Geolocation) { }

  ngOnInit() {
    this.service.showLoading(1500);
    this.getCurrentCoordinates();
    this.schedule();

  }

  /*
    Schedule the Local Notification 
  */
  async schedule() {
    // let data = await LocalNotifications.schedule({
    //   notifications: [{
    //     title: 'Alaram Baja',
    //     body: 'Body chahiye',
    //     id: 1,
    //     schedule: {
    //       every: 'second'
    //     }
    //   }]
    // });

  }
  /*
       creating the new map 
     */

  async createMap() {
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
      }
    });

    /*
      If you want to add marker any locations
    */



    /*
        added current location circle or blue dot 
     */
    await this.newMap.enableCurrentLocation(true);
    /*
      Enabled the traffic layers like (traffic red blue and other color lines)
    */
    await this.newMap.enableTrafficLayer(false);



    // const markerId = await this.newMap.addMarkers([
    //   {
    //     coordinate: {
    //       lat: this.latitude,
    //       lng: this.longitude
    //     },
    //     draggable: false
    //   },
    //   {
    //     coordinate: {
    //       lat: 30.7046,
    //       lng: 76.7179
    //     },
    //     draggable: false
    //   }
    // ]);
    // const letdata = await this.newMap.setCamera({
    //   coordinate: {
    //     lat: this.latitude,
    //     lng: this.longitude
    //   },
    //   animate: true
    // });

    // this.newMap.setOnCameraIdleListener((value: any) => {
    //   console.log('herer', value);
    // })
    // console.log('daatta', letdata);
  }

  async go() {
    await this.newMap.destroy();
    this.menu.close();

    Preferences.remove({ key: 'myAppToken' });
    this.router.navigateByUrl('/tabs2')


  }


  getCurrentCoordinates() {
    /*
      Get the current location of ur device return the lat lng
    */

    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.createMap();
      this.watchPosition()

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  /*
     Watching the current position of your device in every 10s by geolocation plugins
  */
  watchPosition() {
    this.wait = this.geolocation.watchPosition({ enableHighAccuracy: true, timeout: 10000 })
      .subscribe((res: any) => {
        console.log('datas', res.coords.longitude, res.coords.latitude);
      })
  }

  public openItem(): void {
    this.navCtrl.navigateForward(["tabs1"]);
    this.menu.close();
  }


  shareValue = async () => {
    let data = await Share.canShare();
    if (data.value) {
      await Share.share({
        title: 'See cool stuff',
        text: 'Really awesome thing you need to see right meow',
        url: 'http://ionicframework.com/',
        dialogTitle: 'Share with buddies',
      });
    }
  }


}
