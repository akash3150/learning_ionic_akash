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
    this.push.initPush();
    this.logDeviceInfo();
  }

  logDeviceInfo = async () => {
    const info = await Device.getId();
    console.log('infooooo', JSON.stringify(info));
  };
}
