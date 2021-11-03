import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverNewtripPageRoutingModule } from './driver-newtrip-routing.module';

import { DriverNewtripPage } from './driver-newtrip.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverNewtripPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DriverNewtripPage]
})
export class DriverNewtripPageModule {}
