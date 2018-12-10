import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieBuddiesHomeComponent } from './components/movie-buddies-home/movie-buddies-home.component';
import { AdminComponent } from './components/admin/admin.component';
import { FooterComponent } from './components/footer/footer.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { GuestDashboardComponent } from './components/guest-dashboard/guest-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HostDashboardComponent } from './components/host-dashboard/host-dashboard.component';
import { HostProfileComponent } from './components/host-profile/host-profile.component';
import { GuestProfileComponent } from './components/guest-profile/guest-profile.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { RegisterComponent } from './components/register/register.component';
import {UserService} from './services/user.service';
import {MovieListingService} from './services/movie-listing.service';

@NgModule({
  declarations: [
    AppComponent,
    MovieBuddiesHomeComponent,
    AdminComponent,
    FooterComponent,
    MovieListComponent,
    GuestDashboardComponent,
    LoginComponent,
    NavBarComponent,
    HostDashboardComponent,
    HostProfileComponent,
    GuestProfileComponent,
    MovieDetailComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    UserService,
    MovieListingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
