import { Component, Input } from '@angular/core';

import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';

import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Input() titulo: string;
  @Input() backButton: boolean;

  userData: User = {
    username: '',
    name: '',
    email: ''
  };

  constructor(
    private router: Router,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private authService: AuthService
  ) {
    this.authService.getUserData()
      .subscribe(
        data => {
          this.userData = data;
        },
        err => {
          this.router.navigate(['/login']);
        }
      );
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
          this.router.navigate (['/application/profile']);
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
            this.authService.logout();
            this.router.navigate(['auth/login']);
          }
        }
      ]
    });

    await alert.present();
  }

}
