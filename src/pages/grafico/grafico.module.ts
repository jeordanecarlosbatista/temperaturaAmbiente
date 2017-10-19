import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GraficoPage } from './grafico';

// BIBLIOTECA DE GRÁFICO
import { ChartsModule } from 'ng2-charts/ng2-charts';
import '../../../node_modules/chart.js/dist/Chart.bundle.min.js';

@NgModule({
  declarations: [
    GraficoPage,
  ],
  imports: [
    IonicPageModule.forChild(GraficoPage),ChartsModule
  ],
})
export class GraficoPageModule {}
