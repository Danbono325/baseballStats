import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  curUser;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.curUser = this.userService.getUserData();
  }

  logout() {
    this.userService.logout();
    // this.router.navigatede
  }
}
