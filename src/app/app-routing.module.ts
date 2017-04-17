import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OffersComponent } from './offers/offers.component';
import { SuccessComponent } from './success/success.component'
import { MainComponent } from './main/main.component';

const routes: Routes = [
    { path: 'offers', component: OffersComponent },
    { path: 'success', component: SuccessComponent },
    { path: '', component: MainComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
