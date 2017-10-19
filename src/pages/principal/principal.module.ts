import { CardUmidadeModule } from './../../components/card-umidade/card-umidade.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrincipalPage } from './principal';

@NgModule({
  declarations: [
    PrincipalPage,
  ],
  imports: [
    IonicPageModule.forChild(PrincipalPage), CardUmidadeModule
  ],
})
export class PrincipalPageModule { }
