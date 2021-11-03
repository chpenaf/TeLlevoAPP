import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';

import { AuthService } from '../../../services/auth.service';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html'
})
export class LoginPage implements AfterViewInit {
  @ViewChild('title', {read: ElementRef, static: true}) title: ElementRef;
  @ViewChild('username', {read: ElementRef, static: true}) username: ElementRef;
  @ViewChild('password', {read: ElementRef, static: true}) password: ElementRef;

  user={
    usuario: '',
    password: ''
  };

  userData!: User;

  constructor(
    private router: Router,
    public alertCtrl: AlertController,
    private animationCtrl: AnimationController,
    private authService: AuthService
  ) { }

  ngAfterViewInit(){
    const titleAnimation = this.animationCtrl
    .create()
    .addElement(this.title.nativeElement)
    .duration(1000)
    .iterations(1)
    .fromTo('transform','translateY(-50px)', 'translateY(0px)')
    .fromTo('opacity', 0.2, 1);

    const animation = this.animationCtrl
      .create()
      .addElement(this.username.nativeElement)
      .addElement(this.password.nativeElement)
      .duration(1000)
      .iterations(1)
      .fromTo('transform','translateX(100px)', 'translateX(0px)')
      .fromTo('opacity', 0.2, 1);

    titleAnimation.play();
    animation.play();
  }

  onClick(){
    if (this.user.usuario === '' || this.user.password === ''){
      this.presentAlertConfirm(
        'Más despacio cerebrito!!',
        'Debes completar nombre de usuario y contraseña');
    }
    else{
      this.authService.login(this.user.usuario,this.user.password)
        .subscribe(
          resp => {
            this.goToHome();
          },
          ( err: HttpErrorResponse ) => {
            this.presentAlertConfirm(
              'Error de autenticación',
              'Nombre de usuario o contraseña incorrectos');
          }
        );
    }
  }

  goToHome(){

    // Una vez realizado el login correctamente se cargan los datos del usuario
    this.authService.getUserData()
      .subscribe(
        data => {
          this.userData = data;
          // Se declara e instancia un elemento de tipo NavigationExtras
          const navigationExtras: NavigationExtras = {
            state: {
              // Al estado se asignamos un objeto con clave y valor
              user: this.userData
            }
          };
          // navegamos hacia el Home y enviamos información adicional
          this.router.navigate(['application/home'],navigationExtras);
        },
        err => console.log(err)
      );
  }

  async presentAlertConfirm(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Ok');
          }
        }
      ]
    });

    await alert.present();
  }

}
