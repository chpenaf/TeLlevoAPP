/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-driver-newtrip',
  templateUrl: './driver-newtrip.page.html',
  styleUrls: ['./driver-newtrip.page.scss'],
})
export class DriverNewtripPage implements OnInit {

  constructor(
    private geolocation: Geolocation,
    private router: Router
  ) {}

  async ngOnInit() {
  }

  programar() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        console.log(resp);
        this.router.navigate(['application/driver-previewtrip']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
