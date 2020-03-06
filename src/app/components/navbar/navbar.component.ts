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
  curEmail;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.curUser = this.userService.getUserData();

    this.curEmail = this.userService.getEmail();
  }

  logout() {
    this.curEmail = null;
    this.userService.logout();
    // this.router.navigatede
  }
}
