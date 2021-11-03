import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,
         CanActivate,
         CanLoad,
         Route,
         RouterStateSnapshot,
         UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApplicationGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.authService.refresh();

      if ( !this.authService.verifyAuthenticacion() ) {
        this.router.navigate(['/auth/login']);
        return false;
      } else {
        return true;
      }
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      this.authService.refresh();
      if ( !this.authService.verifyAuthenticacion() ) {
        this.router.navigate(['/auth/login']);
        return false;
      } else {
        return true;
      }
    }
}
