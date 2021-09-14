import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, AnimationController } from '@ionic/angular';
import { Animation } from '@ionic/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChild("cardriver", {read: ElementRef, static: true}) cardriver: ElementRef;
  @ViewChild("carpooling", {read: ElementRef, static: true}) carpooling: ElementRef;

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
    public alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private animationCtrl: AnimationController
  ) {
    
      this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.data = this.router.getCurrentNavigation().extras.state.user;
      }
      else{
        this.router.navigate(['/login']);
      }
    });
  }

  ngAfterViewInit(){
    const animationCarDriver = this.animationCtrl
      .create()
      .addElement(this.cardriver.nativeElement)
      .duration(200)
      .iterations(1)
      .fromTo("transform","translateX(-100px)", "translateX(0px)");
    
    animationCarDriver.play();

    const animationCarPooling = this.animationCtrl
      .create()
      .addElement(this.carpooling.nativeElement)
      .duration(200)
      .iterations(1)
      .fromTo("transform","translateY(50px)", "translateY(0px)")
      .fromTo("opacity", 0.2, 1);
    
    animationCarPooling.play();
  }

  onClickDriver() {
    const animationCarDriver2 = this.animationCtrl
      .create()
      .addElement(this.cardriver.nativeElement)
      .duration(200)
      .iterations(1)
      .fromTo("transform","translateX(0px)", "translateX(500px)");
    
    animationCarDriver2.play();
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
      ])
    
    animationCarPooling.play();

  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Acciones',
      cssClass: 'yellow',
      buttons: [{
        text: 'Ver Perfil',
        icon: 'person-circle-outline',
        cssClass: 'yellow',
        handler: () => {
          console.log('Profile clicked');
        }
      }, {
        text: 'Cerrar sesión',
        icon: 'log-out-outline',
        cssClass: 'yellow',
        handler: () => {
          console.log('Log Out');
          this.presentAlertConfirm();
        }
      }, {
        text: 'Cancelar',
        icon: 'close-outline',
        cssClass: 'yellow',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  onClickAvatar() {
    this.presentActionSheet();
  }
  
  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Salir de TeLlevoAPP',
      message: '¿Desea cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }, {
          text: 'Sí',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }

}

