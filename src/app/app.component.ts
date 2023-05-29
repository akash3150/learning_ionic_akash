import { Component } from '@angular/core';
import { NotificationsService } from './services/notifications.service';
import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private push: NotificationsService) {
    //itialize the push notification listener
    this.push.initPush();
    this.logDeviceInfo();
    this.getInfo();


    App.addListener('appStateChange', ({ isActive }) => {
      console.log('App state changed. Is active?', isActive);
    });

    App.addListener('appUrlOpen', data => {
      console.log('App opened with URL:', data);
    });

    App.addListener('appRestoredResult', data => {
      console.log('Restored state:', data);
    });
  }
  // Taking device information like device id and other information
  logDeviceInfo = async () => {
    //getiing device Id
    const info = await Device.getId();

    //getting device information
    const value = await Device.getInfo()
    console.log('infooooo', JSON.stringify(info), JSON.stringify(value));
  }

  /*
    Getting app info like build, version, name and id
  */
  async getInfo() {
    let data = await App.getInfo();
    console.log('app infooo', JSON.stringify(data));
    // this.minimizeApp()
  }


  checkAppLaunchUrl = async () => {
    const url = await App.getLaunchUrl();
    console.log('App opened with URL: ' + url);
  };

  /*
    To minimize the app using the app/Capacitor
  */
  minimizeApp = async () => {
    const minimize = await App.minimizeApp();
    console.log('app infooo', JSON.stringify(minimize));
  }
}
