/* eslint-disable @typescript-eslint/naming-convention */
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';

import { AuthService } from '../../../services/auth.service';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChild('cardriver', {read: ElementRef, static: true}) cardriver: ElementRef;
  @ViewChild('carpooling', {read: ElementRef, static: true}) carpooling: ElementRef;

  userData: User = {
    username: '',
    name: '',
    email: ''
  };

  info={
    nombre:'',
    apellido:'',
    educacion:'',
    fechanac:'',
  };

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    public alertCtrl: AlertController,
    private animationCtrl: AnimationController,
    private authService: AuthService
  ) {
      this.activeroute.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state){
          this.userData = this.router.getCurrentNavigation().extras.state.user;
        }
        else{
          this.authService.getUserData()
            .subscribe(
              data => {
                this.userData = data;
              },
              err => {
                console.log(err);
                this.router.navigate(['/login']);
              }
            );
        }
      });
  }

  ngAfterViewInit(){
    const animationCarDriver = this.animationCtrl
      .create()
      .addElement(this.cardriver.nativeElement)
      .duration(200)
      .iterations(1)
      .fromTo('transform','translateX(-100px)', 'translateX(0px)');

    animationCarDriver.play();

    const animationCarPooling = this.animationCtrl
      .create()
      .addElement(this.carpooling.nativeElement)
      .duration(200)
      .iterations(1)
      .fromTo('transform','translateY(50px)', 'translateY(0px)')
      .fromTo('opacity', 0.2, 1);

    animationCarPooling.play();
  }

  onClickDriver() {
    const animationCarDriver2 = this.animationCtrl
      .create()
      .addElement(this.cardriver.nativeElement)
      .duration(200)
      .iterations(1)
      .fromTo('transform','translateX(0px)', 'translateX(500px)');

    animationCarDriver2.play();

    this.router.navigate(['application/driver-newtrip']);
  }

  onClickPassenger() {

    const animationCarPooling = this.animationCtrl
      .create()
      .addElement(this.carpooling.nativeElement)
      .duration(200)
      .iterations(1)
      .keyframes([
        {offset: 0, width: '60%' },
        {offset: 0.5, width: '62%'},
        {offset: 1, width: '60%' }
      ]);

    animationCarPooling.play();

  }

}

