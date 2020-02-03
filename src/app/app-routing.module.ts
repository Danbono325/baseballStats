import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { TeamOverviewComponent } from "./components/team-overview/team-overview.component";
import { TeamStatsComponent } from "./components/team-stats/team-stats.component";
import { SessionsOverviewComponent } from "./components/sessions-overview/sessions-overview.component";
import { SessionComponent } from "./components/session/session.component";
import { SessionChartsComponent } from "./components/session-charts/session-charts.component";
import { ChartsComponent } from "./components/charts/charts.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "overview", component: TeamOverviewComponent },
  { path: "stats", component: TeamStatsComponent },
  { path: "sessions-overview/:id", component: SessionsOverviewComponent },
  { path: "session/:id/:sessionID", component: SessionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
