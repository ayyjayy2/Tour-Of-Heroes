import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  //path is a string that matches the URL in the browser -> localhost:4200/heroes
  //component that is created/displayed by the router when naving to this route
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, //default route that auto goes to dashboard
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent }, //parameterized route to send an id 
];

@NgModule({
  //configure the router at the app's root level. forRoot() supplies the service providers and directives needed for routing, and performs the initial nav based on the current browser URL
  imports: [RouterModule.forRoot(routes)], //adds the RouterModule to the AppRoutingModule imports array and configures it with the routes in one step by calling RouterModule.forRoot()
  exports: [RouterModule] //exporting this makes it available throughout the app
})
export class AppRoutingModule { }
