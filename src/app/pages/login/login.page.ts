import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { Animation } from '@ionic/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit {
  @ViewChild("title", {read: ElementRef, static: true}) title: ElementRef;
  @ViewChild("username", {read: ElementRef, static: true}) username: ElementRef;
  @ViewChild("password", {read: ElementRef, static: true}) password: ElementRef;

  user={
    usuario:"",
    password:""
  }

  constructor( 
    private router: Router,
    public alertCtrl: AlertController,
    private animationCtrl: AnimationController  
  ) { }

  ngAfterViewInit(){
    const titleAnimation = this.animationCtrl
    .create()
    .addElement(this.title.nativeElement)
    .duration(1000)
    .iterations(1)
    .fromTo("transform","translateY(-50px)", "translateY(0px)")
    .fromTo("opacity", 0.2, 1)

    const animation = this.animationCtrl
      .create()
      .addElement(this.username.nativeElement)
      .addElement(this.password.nativeElement)
      .duration(1000)
      .iterations(1)
      .fromTo("transform","translateX(100px)", "translateX(0px)")
      .fromTo("opacity", 0.2, 1);
    
    titleAnimation.play();
    animation.play();
  }

  onClick(){
    if (this.user.usuario == "" || this.user.password == "")
      this.presentAlertConfirm();
    else 
      this.goToHome();
  }

  goToHome(){
    // Se declara e instancia un elemento de tipo NavigationExtras
    let navigationExtras: NavigationExtras = {
      state: {
        // Al estado se asignamos un objeto con clave y valor
        user: this.user 
      }
    };
    // navegamos hacia el Home y enviamos información adicional
    this.router.navigate(['home'],navigationExtras); 
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Más despacio cerebrito!!',
      message: 'Debes completar nombre de usuario y contraseña',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log("Ok");
          }
        }
      ]
    });

    await alert.present();
  }

}
