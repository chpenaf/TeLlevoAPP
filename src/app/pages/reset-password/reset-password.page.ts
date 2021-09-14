import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  user={
    usuario:""
  }

  constructor( 
    private router: Router,
    private toastController: ToastController ) { }

  ngOnInit() {
  }

  onClick() {
    if ( this.user.usuario == "" ){
      this.toast2();
    } else {
      this.toast();
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

  async toast2() {

    const toast = await this.toastController.create({
      color:"danger",
      duration: 2000,
      message: 'Ingrese nombre de usuario'
    });

    await toast.present();    
  }

}
