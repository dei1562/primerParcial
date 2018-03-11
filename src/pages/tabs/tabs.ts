import { Component } from '@angular/core';

import { AnemiaPage } from '../anemia/anemia';
import { GastoEnergeticoTotalPage } from '../gasto-energetico-total/gasto-energetico-total';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = GastoEnergeticoTotalPage;
  tab3Root = AnemiaPage;

  constructor() {

  }
}
