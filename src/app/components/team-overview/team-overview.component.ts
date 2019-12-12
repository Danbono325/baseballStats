import { Component, OnInit, ElementRef } from "@angular/core";

@Component({
  selector: "app-team-overview",
  templateUrl: "./team-overview.component.html",
  styleUrls: ["./team-overview.component.scss"]
})
export class TeamOverviewComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      "white";
  }

  ngOnInit() {}
}
