import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcoesPage } from './acoes';

@NgModule({
  declarations: [
    AcoesPage,
  ],
  imports: [
    IonicPageModule.forChild(AcoesPage),
  ],
})
export class AcoesPageModule {}
