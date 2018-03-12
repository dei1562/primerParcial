import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AnemiaPage } from '../pages/anemia/anemia';
import { GastoEnergeticoTotalPage } from '../pages/gasto-energetico-total/gasto-energetico-total';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

var config = {
  apiKey: "AIzaSyBhHAo5zORZWL84JvnE2aHTSwSDcsfYYIA",
  authDomain: "pruebafirebase-bf93d.firebaseapp.com",
  databaseURL: "https://pruebafirebase-bf93d.firebaseio.com",
  projectId: "pruebafirebase-bf93d",
  storageBucket: "pruebafirebase-bf93d.appspot.com",
  messagingSenderId: "877824622877"
};

@NgModule({
  declarations: [
    MyApp,
    AnemiaPage,
    GastoEnergeticoTotalPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AnemiaPage,
    GastoEnergeticoTotalPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
