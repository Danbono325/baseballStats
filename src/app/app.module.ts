import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";


import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LoginComponent } from "./components/login/login.component";
import { TeamOverviewComponent } from "./components/team-overview/team-overview.component";

//Services
import { UserService } from "./services/user.service";
import { ApiService } from './services/api.service';

import { TeamStatsComponent } from "./components/team-stats/team-stats.component";
import { SessionsOverviewComponent } from "./components/sessions-overview/sessions-overview.component";
import { SessionComponent } from './components/session/session.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    TeamOverviewComponent,
    TeamStatsComponent,
    SessionsOverviewComponent,
    SessionComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [UserService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
