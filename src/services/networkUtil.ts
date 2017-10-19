import { Injectable } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Loading } from '../componentesIonic/loading';
import { Alertas } from '../componentesIonic/alertas';
import 'rxjs/add/operator/map';

@Injectable()
export class NetworkUtil {

    constructor(public loading: Loading, public alertar: Alertas, public platform: Platform,
        public network: Network, public event: Events) {

    }

    /**Método utilizado para verificar se o dispositivo está conectado. 
     * O primeiro parâmetro é uma função que é chamada quando o dispostivo está conectado e 
     o segundo parâmetro é uma função chamada quando o dispositivo está desconectado. A resposta da 
     verificação é um objeto JSON contendo o atributo 'status' [true ou false] e 'message' que nada mais é 
     que o tipo de conexão do dispositivo. Os tipos de conexão são: unknown(desconhecido), ethernet, wifi, 2g, 3g, 4g, cellular, none (sem conexão) */
    checkNetwork(callbackSucess, callbackFail) {

        if (this.network.type != undefined) {
            switch (this.network.type) {

                case 'unknown':
                    callbackFail({
                        status: false,
                        message: 'Conexão Desconhecida'
                    });
                    break;

                case 'ethernet':
                    callbackSucess({
                        status: true,
                        message: 'Conexão Ethernet'
                    });
                    break;

                case 'wifi':
                    callbackSucess({
                        status: true,
                        message: 'Conexão Wifi'
                    });
                    break;

                case '2g':
                    callbackSucess({
                        status: true,
                        message: 'Conexão 2g'
                    });
                    break;

                case '3g':
                    callbackSucess({
                        status: true,
                        message: 'Conexão 3g'
                    });
                    break;

                case '4g':
                    callbackSucess({
                        status: true,
                        message: 'Conexão 4g'
                    })
                    break;

                case 'cellular':
                    callbackSucess({
                        status: true,
                        message: 'Conexão Cellular'
                    });
                    break;

                case 'none':
                    callbackFail({
                        status: false,
                        message: 'Sem conexão com a internet'
                    });
                    break;
            }
        }
    }

    /**método utilizado para instanciar um ouvinte que executará a função passada pelo parâmetro quando o 
     * dispostivo for desconectado
    */
    listenDisconnected() {
        var disconnectSubscription = this.network.onDisconnect().subscribe(() => {
            this.event.publish("isConnected", false);
        });
    }

    /**método utilizado para instanciar um ouvinte que executará a função passada pelo parâmetro quando o 
    * dispostivo for conectado
    */
    listenConnected() {
        var connectSubscription = this.network.onConnect().subscribe(() => {
            this.event.publish("isConnected", true);
        });
    }

}
