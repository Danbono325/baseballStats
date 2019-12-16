import { Component, OnInit, ElementRef } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-team-overview",
  templateUrl: "./team-overview.component.html",
  styleUrls: ["./team-overview.component.scss"]
})
export class TeamOverviewComponent implements OnInit {
  curUser;

  constructor(
    private elementRef: ElementRef,
    private userService: UserService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      "white";
  }

  ngOnInit() {
    this.curUser = this.userService.getUserData();
    if (this.curUser == null) {
      this.router.navigate([""]);
    }
  }
}
