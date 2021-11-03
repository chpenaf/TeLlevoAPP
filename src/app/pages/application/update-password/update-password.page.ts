/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.page.html',
  styleUrls: ['./update-password.page.scss'],
})
export class UpdatePasswordPage {

  chgPassword = {
    old_password: '',
    new_password: '',
    new_passwd2: ''
  };

  constructor(
    private router: Router,
    private toastController: ToastController,
    private authService: AuthService
  ) { }

  guardar() {

    if(this.chgPassword.new_password.match(this.chgPassword.new_passwd2) === null ){
      this.toast('Contraseñas deben coincidir');
      return;
    }

    this.authService.updatePassword(this.chgPassword.old_password, this.chgPassword.new_passwd2)
      .subscribe(
        resp => {
          this.toast('Contraseña actualizada');
          this.router.navigate(['/application/profile']);
        },
        error => {
          this.toast(error.error.error);
        }
      );
  }

  async toast(msg: string) {
    const toast = await this.toastController.create({
      color: 'dark',
      duration: 2000,
      message: msg
    });

    await toast.present();
  }

}
