import { Pipe, PipeTransform } from '@angular/core';

import { User } from '../interfaces/user.interface';

@Pipe({
  name: 'avatar'
})
export class AvatarPipe implements PipeTransform {

  transform(user: User): string {
    if( user.avatar_url ){
      return user.avatar_url;
    } else {
      return '/assets/icon/default_user.png';
    }
  }

}
