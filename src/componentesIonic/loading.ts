import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

import 'rxjs/add/operator/map';

@Injectable()
export class Loading {
    public response: string;
    public static loader: any;
    public static loadingCtrl: LoadingController;

    // CONSTANTES DOS TIPOS
    static readonly DEFAULT = 'default';
    static readonly IOS = 'ios';
    static readonly DOTS = 'dots';
    static readonly BUBBLES = 'bubbles';
    static readonly CIRCLES = 'circles';
    static readonly CRESCENT = 'crescent';

    constructor(loading: LoadingController) {
        Loading.loadingCtrl = loading;
    }

    /**
     * mÃ©todo responsÃ¡vel por abrir uma tela de loading.
     * O parÃ¢metro tipoLoading altera o tipo do loading apresentado na tela. 
     * Os valores do parÃ¢metro sÃ£o disponibilizados atravÃ©s das constante estÃ¡ticas da
     * classe
     * @param mensagem
     * @param tipoLoading
     * @param conteudo
     * */
    static showLoading(mensagem: string, tipoLoading: string, conteudo: string) {
        if (conteudo) {
            this.loader = this.loadingCtrl.create({
                content: conteudo,
                dismissOnPageChange: true,
                spinner: tipoLoading
            });
            this.loader.present();
        } else {
            this.loader = this.loadingCtrl.create({
                content: mensagem,
                dismissOnPageChange: true,
                spinner: tipoLoading
            });
            this.loader.present();
        }
        /*
                // COMENTAR QUANDO TESTADO
                setTimeout(() => {
                    this.dismissLoading();
                }, 3000);*/
    }

    /**
     * mÃ©todo responsÃ¡vel por fechar uma tela de loading
     * */
    static dismissLoading() {
        if (this.loader) {
            this.loader.dismiss();
        }
    }

    static presentLoadingCustom() {
        let loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: `            
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">        
         <img style="margin-top: 10px; display: block; margin: 0 auto;"  width="130" height="65" src="assets/svg/logo_intergado_animado.svg" />
        </div>
        <ion-label text-capitalize style="display: flex; margin: auto" color="primary">processando</ion-label>
      </div>`,
            duration: 5000
        });
        loading.present();
    }

}