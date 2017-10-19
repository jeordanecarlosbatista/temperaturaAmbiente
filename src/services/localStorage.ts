import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class LocalStorage {
    localStorage;
    constructor() {
        this.localStorage = window.localStorage;
    }
    setItem(key: string, value: string) {
        this.localStorage.setItem(key, value);
    }
    getItem(key: string) {
        return this.localStorage.getItem(key);
    }
    removeItem(key: string) {
        this.localStorage.removeItem(key);
    }
}