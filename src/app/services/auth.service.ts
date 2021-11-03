/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AuthResponse, RefreshResponse } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private backendUrl: string = environment.backendUrl;
  private auth: AuthResponse | undefined;
  private userData: User;

  constructor(
    private http: HttpClient,
  ) { }

  login( username: string, password: string ) {
    const url = `${ this.backendUrl }/token/`;
    const body = { username, password };
    return this.http.post<AuthResponse>( url, body )
      .pipe(
        tap( auth => this.auth = auth ),
        tap( auth => {
          localStorage.setItem( 'access', auth.access );
          localStorage.setItem( 'refresh', auth.refresh );
        })
      );
  }

  logout() {
    this.auth = { access: '', refresh: '' };
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }

  recoveryPassword( username: string ) {
    const url = `${ this.backendUrl }/user/${ username }`;
    return this.http.get<AuthResponse>( url );
  }

  refresh(){
    const url = `${ this.backendUrl }/token/refresh/`;
    const body = {
      refresh: localStorage.getItem('refresh') || ''
    };
    return this.http.post<RefreshResponse>( url, body )
      .pipe(
        tap( refresh => this.auth.access = refresh.access ),
        tap( refresh => localStorage.setItem( 'access', refresh.access ) )
      );
  }

  verifyAuthenticacion() {
    if ( localStorage.getItem('access') ) {
      return true;
    } else {
      return false;
    }
  }

  getUserData(){
    const url = `${ this.backendUrl }/user/`;
    return this.http.get<User>( url, this.getHttpOptions() );
  }

  updateUserData( userData: User ){
    const url = `${ this.backendUrl }/user/update/`;
    const body = userData;
    return this.http.put<User>( url, body, this.getHttpOptions() )
      .pipe(
        tap( data => this.userData = data )
      );
  }

  updatePassword( old_passwd: string, new_passwd: string ){
    const url = `${ this.backendUrl }/user/update-password/`;
    const body = { old_passwd, new_passwd };

    return this.http.put<User>( url, body, this.getHttpOptions() )
      .pipe(
        tap( data => this.userData = data )
      );

  }

  getAuthorization(){
    const access = localStorage.getItem('access') || '';
    const token = `Bearer ${ access }`;
    return token;
  }

  getHttpOptions(){
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.getAuthorization()
      })
    };
  }

}
