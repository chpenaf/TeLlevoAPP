import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { User } from '../../../interfaces/user.interface';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  userData: User = {
    username: '',
    email: '',
    name: ''
  };

  constructor(
    public alertCtrl: AlertController,
    private authService: AuthService
    ) {
      this.authService.getUserData()
        .subscribe(
          data => {
            this.userData = data;
          }
        );
    }

}
