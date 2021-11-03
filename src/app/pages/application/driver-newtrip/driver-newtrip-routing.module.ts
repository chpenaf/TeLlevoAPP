import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverNewtripPage } from './driver-newtrip.page';

const routes: Routes = [
  {
    path: '',
    component: DriverNewtripPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverNewtripPageRoutingModule {}
