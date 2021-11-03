import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {

  userData: User = {
    username: '',
    email: '',
    name: ''
  };

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.getUserData()
      .subscribe(
        data => {
          this.userData = data;
        }
      );
  }

  guardar() {
    this.auth.updateUserData(this.userData)
      .subscribe(
        resp => {
          this.router.navigate(['/application/home']);
        }
      );
  }

}
