/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import EncryptedStorage from 'react-native-encrypted-storage';

PushNotification.configure({
  onRegister: async function (token) {
    console.log('TOKEN: ', token);
    await EncryptedStorage.setItem('deviceToken', token.token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
    // 여기에서 로컬 저장소에 알림 저장
  },
  popInitialNotification: true,
  requestPermissions: true,

  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
});

AppRegistry.registerComponent(appName, () => App);
