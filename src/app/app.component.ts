import { Component } from '@angular/core';
import { NotificationsService } from './services/notifications.service';
import { Device } from '@capacitor/device';
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
  }
  // Taking device information like device id and other information
  logDeviceInfo = async () => {
    //getiing device Id
    const info = await Device.getId();

    //getting device information
    const value = await Device.getInfo()
    console.log('infooooo', JSON.stringify(info), JSON.stringify(value));
  }
}
