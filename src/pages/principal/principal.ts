import { StatusBar } from '@ionic-native/status-bar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PlantaProvider } from '../../providers/planta/planta';


@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {

  private historico: any = [];

  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public statusBar: StatusBar, private plantaProvider: PlantaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrincipalPage');
    this.getHistoricos();
  }

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString("#006666");
  }

  abrirConfiguracoes(){
    this.navCtrl.push("ConfiguracoesPage");
  }

  async getHistoricos() {
    try {
      // this.loading.dismiss();
      this.historico = await this.plantaProvider.getHistoricos();
      console.log(this.historico);
    }
    catch (error) {
      console.log(error);
      // this.loading.dismiss();
    }
  }

}
