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
import {HostDashboardComponent} from './components/host-dashboard/host-dashboard.component';
import {GuestDashboardComponent} from './components/guest-dashboard/guest-dashboard.component';
import {UserDetailComponent} from './components/user-detail/user-detail.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {EventComponent} from './components/event/event.component';
import {EventDetailComponent} from './components/event-detail/event-detail.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: MovieBuddiesHomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'login', component: LoginComponent},
  {path: 'event-list', component: EventComponent},
  {path: 'event/:hostId', component: EventComponent},
  {path: 'event-list/event-detail/:eventId', component: EventDetailComponent},
  {path: 'profile-guest', component: GuestProfileComponent},
  {path: 'profile-host', component: HostProfileComponent},
  {path: 'dashboard-guest', component: GuestDashboardComponent},
  {path: 'dashboard-guest/:bookingId', component: GuestDashboardComponent},
  {path: 'dashboard-host', component: HostDashboardComponent},
  {path: 'dashboard-host/:eventId', component: HostDashboardComponent},
  {path: 'user-list', component: UserListComponent},
  {path: 'user-list/user-detail/:userId', component: UserDetailComponent},
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
