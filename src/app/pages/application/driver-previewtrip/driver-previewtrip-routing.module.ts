import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverPreviewtripPage } from './driver-previewtrip.page';

const routes: Routes = [
  {
    path: '',
    component: DriverPreviewtripPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverPreviewtripPageRoutingModule {}
