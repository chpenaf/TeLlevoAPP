/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

import { Environment, GoogleMap, GoogleMaps } from '@ionic-native/google-maps/ngx';

@Component({
  selector: 'app-driver-previewtrip',
  templateUrl: './driver-previewtrip.page.html',
  styleUrls: ['./driver-previewtrip.page.scss'],
})
export class DriverPreviewtripPage implements OnInit {

  map: GoogleMap;

  constructor(
    private platform: Platform,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap() {
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: '',
      API_KEY_FOR_BROWSER_DEBUG: ''
    });

    this.map = GoogleMaps.create('map_canvas');
  }

  confirmar(){
    console.log('confirmado');
    this.router.navigate(['/application/home']);
  }

}
