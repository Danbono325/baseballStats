import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ChartsModule } from "ng2-charts";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LoginComponent } from "./components/login/login.component";
import { TeamOverviewComponent } from "./components/team-overview/team-overview.component";

//Services
import { UserService } from "./services/user.service";
import { ApiService } from "./services/api.service";

import { TeamStatsComponent } from "./components/team-stats/team-stats.component";
import { SessionsOverviewComponent } from "./components/sessions-overview/sessions-overview.component";
import { SessionComponent } from "./components/session/session.component";
import { SessionChartsComponent } from './components/session-charts/session-charts.component';

//Pipe
import { PitchType } from './pipes/pitch-type.pipe';
import { MuDate } from './pipes/muData.pipe';

import { ChartsComponent } from './components/charts/charts.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    TeamOverviewComponent,
    TeamStatsComponent,
    SessionsOverviewComponent,
    SessionComponent,
    SessionChartsComponent,
    PitchType,
    MuDate,
    ChartsComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ChartsModule],
  providers: [UserService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
