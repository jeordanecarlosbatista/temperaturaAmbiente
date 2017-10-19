import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class Alertas {
    public response: string;
    public testRadioOpen: boolean;
    public testRadioResult: any;
    constructor(public alertCtrl: AlertController) {

    }

    /**
     * MÃ©todo responsÃ¡vel por abrir uma tela simples de alerta
     * */
    simpleAlert(titulo: string, subtitulo: string) {
        let alert = this.alertCtrl.create({
            title: titulo,
            subTitle: subtitulo,
            cssClass: "overflow-y: auto;",
            buttons: ['OK']
        });
        alert.present();
    }

    teste() {

    }


    /**
     * MÃ©todo responsÃ¡vel por abrir uma tela de prompt
     * */
    promptAlert(titulo: string, mensagem: string, atributo: string, placeholderInput: string,
        acaoString: string, callback: Function) {

        let prompt = this.alertCtrl.create({
            title: titulo,
            message: mensagem,
            inputs: [
                {
                    name: atributo,
                    placeholder: placeholderInput
                },
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    handler: data => {
                        callback(data);
                        console.log('BotÃ£o Cancelar clicado');
                    }
                },
                {
                    text: acaoString,
                    handler: data => {
                        callback(data);
                        console.log('BotÃ£o salvar clicado');
                    }
                }
            ]
        });
        prompt.present();
    }

    /**
     * MÃ©todo responsÃ¡vel por abrir uma tela de confirmaÃ§Ã£o na tela.
     * Resposta do callback 
     * */
    confirmationAlert(titulo: string, mensagem: string, textoBotaoDisagree: string, textoBotaoAgree: string,
        callback: Function) {

        let confirm = this.alertCtrl.create({
            title: titulo,
            message: mensagem,
            buttons: [
                {
                    text: textoBotaoDisagree,
                    handler: data => {
                        callback({ response: "Disagree", cod: 0 });
                    }
                },
                {
                    text: textoBotaoAgree,
                    handler: data => {
                        callback({ response: "Agree", cod: 1 });
                    }
                }
            ]
        });
        confirm.present();
    }

    /**
     * MÃ©todo responsÃ¡vel por abrir um radio button na tela a partir de uma lista
     * */
    radioAlert(titulo: string, opcoes: Array<any>, callback) {
        let alert = this.alertCtrl.create();
        alert.setTitle(titulo);

        opcoes.sort();

        let quantidadeDeOpcoes = opcoes.length;

        for (var i = 0; i < quantidadeDeOpcoes; i++) {

            alert.addInput({
                type: 'radio',
                label: opcoes[i].label,
                value: opcoes[i].value,
                checked: false
            });
        }

        alert.addButton('Cancelar');
        alert.addButton({
            text: 'OK',
            handler: data => {
                this.testRadioOpen = false;
                callback({ codigo: data });
            }
        });

        alert.present().then(() => {
            this.testRadioOpen = true;
        });
    }

    /**
     * MÃ©todo utilizado para abrir uma seleÃ§Ã£o mÃºltipla na tela. 
     * No parÃ¢metro opcoes Ã© passado um Array de objetos JSON, onde devem
     * possuir os atributos 'label' (modo como serÃ£o apresentados na tela) 
     * e 'value' (valores para cada item do checkbox)
     * */
    checkBoxAlert(titulo: string, opcoes: Array<any>, callback) {
        let alert = this.alertCtrl.create({
            cssClass: '.alert-ios .alert-radio-label{ white-space: pre-line;} .alert-md .alert-radio-label{ white-space: pre-line;} .alert-wp .alert-radio-label{ white-space: pre-line;}',
        });
        alert.setTitle(titulo);
        opcoes.sort();

        let quantidadeDeOpcoes = opcoes.length;

        for (var i = 0; i < quantidadeDeOpcoes; i++) {
            alert.addInput({
                type: 'checkbox',
                label: opcoes[i].label,
                value: opcoes[i].value,
                checked: false
            });
        }

        alert.addButton('Cancelar');
        alert.addButton({
            text: 'OK',
            handler: data => {
                this.testRadioOpen = false;
                callback(data);
            }
        });

        alert.present().then(() => {
            this.testRadioOpen = true;
        });
    }

}