import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-sessions-overview",
  templateUrl: "./sessions-overview.component.html",
  styleUrls: ["./sessions-overview.component.scss"]
})
export class SessionsOverviewComponent implements OnInit {
  curUser;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.curUser = this.userService.getUserData();
  }
}
