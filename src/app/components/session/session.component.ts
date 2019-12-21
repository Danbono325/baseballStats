import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-session",
  templateUrl: "./session.component.html",
  styleUrls: ["./session.component.scss"]
})
export class SessionComponent implements OnInit {
  curUser;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.curUser = this.userService.getUserData();
  }
}
