import { DateUtil } from './../../services/dateUtil';
import { Toast } from './../../componentesIonic/toast';
import { Server } from './../../entity/server';
import { Loading } from './../../componentesIonic/loading';
import { Alertas } from './../../componentesIonic/alertas';
import { HttpUtil } from './../../services/httpUtil';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-grafico',
  templateUrl: 'grafico.html',
})
export class GraficoPage {
  public dias: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public httpUtil: HttpUtil, public alertar: Alertas,
    public loading: Loading, public toast: Toast, public dateUtil: DateUtil) {
  }

  restringirInput() {
    if (this.dias > 30) {
      this.toast.showToast("Quantidade máxima 30 dias", Toast.BOTTOM, 4000);
      this.dias = 30;
    } else if (this.dias <= 0 && this.dias.toString() != "") {
      this.toast.showToast("Dia mínimo 1, dia máximo 30", Toast.BOTTOM, 4000);
      this.dias = 1;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GraficoPage');
  }

  fecharLoading() {
    Loading.dismissLoading();
  }

  buscarDados() {
    let dataAtual = new Date();
    let dataInicio = new Date();
    dataInicio.setDate(dataInicio.getDate() - this.dias);

    console.log(dataAtual.getTime());
    console.log(dataInicio.getTime());

    Loading.showLoading("Buscando dados", Loading.CRESCENT, undefined);

    let url = Server.URI_PREFIX + `?dataInicio=${this.dateUtil.dateToStringSimple(dataInicio)}&dataFim=${this.dateUtil.dateToStringSimple(dataAtual)}`;
    this.httpUtil.requestGet(url, {}, [], response => {
      this.fecharLoading();
    }, error => {
      this.fecharLoading();
    });
  }

  // CONFIGURAÇÃO DO GRÁFICO
  public lineChartOptions: any = {
    responsive: true
  };

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  // lineChart
  public lineChartData: Array<any> = 
  [20, 25, 25, 20, 18, 17, 15, 15, 15, 18, 20, 22, 26, 30, 35, 40, 45,
    35, 33, 33, 30, 28, 27, 26];

  public lineChartLabels: Array<any> = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

  public randomizeType(): void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';  
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  // CORES
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
}
