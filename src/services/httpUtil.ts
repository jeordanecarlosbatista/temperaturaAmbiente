import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { Loading } from '../componentesIonic/loading';
import { Alertas } from '../componentesIonic/alertas';
import { NetworkUtil } from '../services/networkUtil';
import 'rxjs/add/operator/map';
declare var cordovaHTTP: any;

@Injectable()
export class HttpUtil {
    public response: string;

    constructor(public loading: Loading, public alertar: Alertas, public networkUtil: NetworkUtil, public http: HTTP) {

    }

    /**
     * Requisição GET padrão. A resposta é retornada na função callback correspondente (sucesso ou erro)
     * @param string
     * @param params
     * @param headers
     * @param callbackSucess
     * @param callbackError
     * */
    requestGet(url: string, params: Object, headers: Object, callbackSucess, callbackError) {
        /* cordovaHTTP.get(url, params, headers, callbackSucess, callbackError); */
        this.http.get(url, {}, {})
            .then(data => {
                callbackSucess(data);
            })
            .catch(error => {
                callbackError(error);
            });
    }

    /**
     * Requisição GET padrão. A resposta é retornada na função callback correspondente (sucesso ou erro)
     * @param string
     * @param params
     * @param headers
     * @param callbackSucess
     * @param callbackError
     * */
    requestPost(url: string, body: Object, headers: Object, callbackSucess, callbackError) {
        cordovaHTTP.post(url, body, headers, callbackSucess, callbackError);
    }

    /**
    * Requisição GET padrão. A resposta é retornada na função callback correspondente (sucesso ou erro)
    * @param string
    * @param params
    * @param headers
    * @param callbackSucess
    * @param callbackError
    * */
    requestPostJson(url: string, body: Object, headers: Object, callbackSucess, callbackError) {
        cordovaHTTP.postJson(url, body, headers, callbackSucess, callbackError);
    }

    uploadFile(url, body, headers, filePath, name, callbackSucess, callbackError) {
        cordovaHTTP.uploadFile(url, body, headers, filePath, name, callbackSucess, callbackError);
    }

}
