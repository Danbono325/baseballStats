import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LoginComponent } from "./components/login/login.component";
import { TeamOverviewComponent } from "./components/team-overview/team-overview.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "overview", component: TeamOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
