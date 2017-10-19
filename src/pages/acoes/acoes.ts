import { HttpUtil } from './../../services/httpUtil';
import { NetworkUtil } from './../../services/networkUtil';
import { Toast } from './../../componentesIonic/toast';
import { Loading } from './../../componentesIonic/loading';
import { Alertas } from './../../componentesIonic/alertas';
import { StatusBar } from '@ionic-native/status-bar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PlantaProvider } from '../../providers/planta/planta';

@IonicPage()
@Component({
  selector: 'page-acoes',
  templateUrl: 'acoes.html',
})
export class AcoesPage {
  public cep: number;
  private statusPlanta: Object = {text: null, color: null, class: null};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public statusBar: StatusBar, public alertas: Alertas,
    public loading: Loading, public toast: Toast, public networkUtil: NetworkUtil,
    public httpUtil: HttpUtil, public plantaProvider: PlantaProvider) {
    this.getStatusPlanta();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcoesPage');
  }

  ionViewDidEnter() {
    this.statusBar.backgroundColorByHexString("#006666");
  }

  deslizar(evento) {
    console.log(evento);
  }

  regarAPlanta() {
    this.networkUtil.checkNetwork(responsee => {
      let url: string = "https://viacep.com.br/ws/" + this.cep + "/json/"; 
      Loading.showLoading("Buscando CEP", Loading.CRESCENT, undefined);
      this.httpUtil.requestGet(url, {}, {},
        response => {
          let data = JSON.parse(response.data);
          this.alertas.simpleAlert("Endereço", "Rua:" + data.logradouro + " Bairro:" + data.bairro + " Cidade:" + data.localidade);
          Loading.dismissLoading();
        }, error => {
          console.error(error);
          this.toast.showToast("Cep inválido", Toast.BOTTOM, 4000);
          Loading.dismissLoading();
        });

      /*       setTimeout(() => {
              Loading.dismissLoading();
              this.toast.showToast("A planta foi regada com sucesso", Toast.BOTTOM, 3000);
            }, 3000); */
    }, error => {
      this.toast.showToast("Você não possui conectvidade com a internet", Toast.BOTTOM, 4000);
    });
  }

  async regarPlanta() {
    try {
      // this.loading.dismiss();
      await this.plantaProvider.irrigarPlanta();
      this.toast.showToast("Aguarde, sua planta será irrigada", Toast.BOTTOM, 4000);
      console.log("Sucesso");
    }
    catch (error) {
      console.log(error);
      this.toast.showToast("Não foi possível irrigar sua planta", Toast.BOTTOM, 4000);
      console.log("Erro");
      // this.loading.dismiss();
    }
  }

  async getStatusPlanta() {
    try {
      // this.loading.dismiss();
      let response = await this.plantaProvider.getStatusPlanta();
      this.statusPlanta = this.getStringStatusPlanta(response[0].ValorUmidade);
      console.log("Sucesso");
    }
    catch (error) {
      console.log(error);
      console.log("Erro");
      // this.loading.dismiss();
    } 
  }

  getStringStatusPlanta(umidade) {
  // Solo umido, acende o led verde
    if (umidade > 0 && umidade < 400)
    {
      return {text: 'Solo úmido', color: 'green', class: 'umido'};
      // Serial.println(" Status: Solo umido");
      // apagaleds();
      // digitalWrite(pino_led_verde, HIGH);
    }
 
  //Solo com umidade moderada, acende led amarelo
    if (umidade > 400 && umidade < 800)
    {
      return {text: 'Umidade moderada', color: 'yellow', class: 'moderado'};
      // Serial.println(" Status: Umidade moderada");
      // apagaleds();
      // digitalWrite(pino_led_amarelo, HIGH);
    }
 
  //Solo seco, acende led vermelho
    if (umidade > 800 && umidade < 1024)
    {
      return {text: 'Solo seco', color: 'red', class: 'seco'};
      // Serial.println(" Status: Solo seco");
      // apagaleds();
      // digitalWrite(pino_led_vermelho, HIGH);
    }
  }

  

}
