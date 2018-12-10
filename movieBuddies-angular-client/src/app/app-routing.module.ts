import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MovieBuddiesHomeComponent} from './components/movie-buddies-home/movie-buddies-home.component';
import {RegisterComponent} from './components/register/register.component';
import {MovieListComponent} from './components/movie-list/movie-list.component';
import {MovieDetailComponent} from './components/movie-detail/movie-detail.component';
import {LoginComponent} from './components/login/login.component';
import {GuestProfileComponent} from './components/guest-profile/guest-profile.component';
import {HostProfileComponent} from './components/host-profile/host-profile.component';
import {AdminComponent} from './components/admin/admin.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: MovieBuddiesHomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile-guest', component: GuestProfileComponent},
  {path: 'profile-host', component: HostProfileComponent},
  {path: 'movie-list/:page' , component: MovieListComponent},
  {path: 'movie-list/:page/movie-detail/:movieId', component: MovieDetailComponent},
  // {path: 'movie-list/:location/:keyword', component: MovieListComponent},
  {path: '**', component: MovieBuddiesHomeComponent} // last
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
