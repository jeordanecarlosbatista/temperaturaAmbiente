import { HTTP } from '@ionic-native/http';
import { Network } from '@ionic-native/network';
import { HttpModule } from '@angular/http'

import { DateUtil } from './../services/dateUtil';
import { HttpUtil } from './../services/httpUtil';
import { LocalStorage } from './../services/localStorage';
import { NetworkUtil } from './../services/networkUtil';
import { Toast } from './../componentesIonic/toast';
import { Loading } from './../componentesIonic/loading';
import { Alertas } from './../componentesIonic/alertas';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PlantaProvider } from '../providers/planta/planta';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    StatusBar, Alertas, Loading, Toast, NetworkUtil, LocalStorage, HttpUtil, DateUtil, Network, HTTP,
    PlantaProvider
  ]
})
export class AppModule { }
