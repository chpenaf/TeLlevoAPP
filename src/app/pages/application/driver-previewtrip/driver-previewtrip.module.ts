import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverPreviewtripPageRoutingModule } from './driver-previewtrip-routing.module';

import { DriverPreviewtripPage } from './driver-previewtrip.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverPreviewtripPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DriverPreviewtripPage]
})
export class DriverPreviewtripPageModule {}
