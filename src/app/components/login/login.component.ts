import { Component, OnInit, ElementRef, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, AfterViewInit {
  constructor(private elementRef: ElementRef, private router: Router) {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      "#8794b0";
  }

  ngOnInit() {}

  login() {
    this.router.navigate(["overview"]);
  }
}
