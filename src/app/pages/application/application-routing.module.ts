import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplicationGuard } from '../../guards/application.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule ),
    canLoad:[ ApplicationGuard ],
    canActivate: [ ApplicationGuard ]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule ),
    canLoad:[ ApplicationGuard ],
    canActivate: [ ApplicationGuard ]
  },
  {
    path: 'update-profile',
    loadChildren: () => import('./update-profile/update-profile.module').then( m => m.UpdateProfilePageModule),
    canLoad:[ ApplicationGuard ],
    canActivate: [ ApplicationGuard ]
  },
  {
    path: 'update-password',
    loadChildren: () => import('./update-password/update-password.module').then( m => m.UpdatePasswordPageModule),
    canLoad:[ ApplicationGuard ],
    canActivate: [ ApplicationGuard ]
  },
  {
    path: 'driver-newtrip',
    loadChildren: () => import('./driver-newtrip/driver-newtrip.module').then( m => m.DriverNewtripPageModule),
    canLoad:[ ApplicationGuard ],
    canActivate: [ ApplicationGuard ]
  },
  {
    path: 'driver-previewtrip',
    loadChildren: () => import('./driver-previewtrip/driver-previewtrip.module').then( m => m.DriverPreviewtripPageModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
