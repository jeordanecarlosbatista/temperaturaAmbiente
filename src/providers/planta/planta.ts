import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Server } from '../../entity/server';

/*
  Generated class for the PlantaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlantaProvider {

  constructor(public http: Http) {
    console.log('Hello PlantaProvider Provider');
  }

  
  async getHistoricos() {
    let results = [];
    let promise = new Promise((resolve, reject) => {
      this.http.get(`${Server.URI_PREFIX}historicos`)
        .toPromise()
        .then(
        req => { // Success
          resolve(req.json());
        },
        error => { // Error
          reject(error);
        }
        );
    });
    return promise;
  }

  async irrigarPlanta() {
    let results = [];
    let promise = new Promise((resolve, reject) => {
      this.http.post(`${Server.URI_PREFIX}irrigacoes`, {})
        .toPromise()
        .then(
        req => { // Success
          resolve(req.json());
        },
        error => { // Error
          reject(error);
        }
        );
    });
    return promise;
  }

  async getStatusPlanta() {
    let results = [];
    let promise = new Promise((resolve, reject) => {
      this.http.get(`${Server.URI_PREFIX}umidades/current`, {})
        .toPromise()
        .then(
        req => { // Success
          resolve(req.json());
        },
        error => { // Error
          reject(error);
        }
        );
    });
    return promise;
  }

}
