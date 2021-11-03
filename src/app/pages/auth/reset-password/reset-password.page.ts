import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  user={
    usuario: ''
  };

  constructor(
    private router: Router,
    private toastController: ToastController,
    private authService: AuthService ) { }

  ngOnInit() {
  }

  onClick() {
    if ( this.user.usuario === '' ){
      this.toast2('Ingrese nombre de usuario');
    } else {
      this.authService.recoveryPassword( this.user.usuario )
        .subscribe(
          resp => this.toast(),
          ( err: HttpErrorResponse ) => this.toast2(err.error.error)
        );
    }
  }

  async toast() {

    const toast = await this.toastController.create({
      color: 'success',
      duration: 2000,
      message: 'Instrucciones enviadas a su correo'
    });

    this.router.navigate(['/login']);

    await toast.present();
  }

  async toast2( mensaje: string ) {

    const toast = await this.toastController.create({
      color:'danger',
      duration: 2000,
      message: mensaje
    });

    await toast.present();
  }

}
