import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.page.html',
  styleUrls: ['./new-trip.page.scss'],
})
export class NewTripPage {

  data: any;

  info={
    nombre:"",
    apellido:"",
    educacion:"",
    fechanac:"",
  }

  constructor(
    private activeroute: ActivatedRoute, 
    private router: Router,
    public alertCtrl: AlertController) {
    
      this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.data = this.router.getCurrentNavigation().extras.state.user;
      }
      else{
        this.router.navigate(['/login']);
      }
    });
  }
}
