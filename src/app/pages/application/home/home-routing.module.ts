import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'new-trip',
        loadChildren: () => import('../new-trip/new-trip.module').then( m => m.NewTripPageModule )
      },
      {
        path: 'trip-history',
        loadChildren: () => import('../trip-history/trip-history.module').then( m => m.TripHistoryPageModule )
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
