import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications'
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { }

  initPush() {

    if (Capacitor.getPlatform() !== 'web') {
      this.registerPush();
    }
  }

  private registerPush() {
    PushNotifications.requestPermissions().then(permission => {
      if (permission.receive === 'granted') {
        PushNotifications.register();
      }
      else {
        // If permission is not granted
      }
    });

    /** 
     * getting the fcm token by this event lisner
     */
    PushNotifications.addListener('registration', (token) => {
      console.log('token here', JSON.stringify(token));
    });

    /** 
     * if some err while registration
     */
    PushNotifications.addListener('registrationError', (err) => {
      console.log(err);
    });

    /** 
     * when the push notification recieved by firebase
     */
    PushNotifications.addListener('pushNotificationReceived', (notifications) => {
      console.log('recieved', JSON.stringify(notifications));
    });

  }
}
