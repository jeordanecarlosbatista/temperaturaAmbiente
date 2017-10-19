import { IonicModule } from 'ionic-angular';
import { CardUmidadeComponent } from './card-umidade';
import { NgModule } from '@angular/core';


@NgModule({
    declarations: [
        CardUmidadeComponent
    ],
    imports: [
        IonicModule
    ],
    exports: [
        CardUmidadeComponent
    ]

})
export class CardUmidadeModule { }