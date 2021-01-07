import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent } // the colon (:) in the path indicates that :id is a placeholder for a specific hero id
];

@NgModule({
  // The following line adds the RouterModule to the AppRoutingModule imports array and configures it with the routes in one step by calling RouterModule.forRoot()
  imports: [RouterModule.forRoot(routes)],
  // Next, AppRoutingModule exports RouterModule so it will be available througout the app.
  exports: [RouterModule]
})

export class AppRoutingModule { }



// je kan de routing ook via de CLI aanmaken, geef dan: ng generate module app-routing --flat --module=app
// --flat puts the file in src/app instead of its own folder
// --module=app tells the CLI to register it in the imports array of AppModule
