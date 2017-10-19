import { Component } from '@angular/core';


@Component({
  selector: 'card-umidade',
  templateUrl: 'card-umidade.html'
})
export class CardUmidadeComponent {

  text: string;

  constructor() {
    console.log('Hello CardUmidadeComponent Component');
    this.text = 'Hello World';
  }



}
