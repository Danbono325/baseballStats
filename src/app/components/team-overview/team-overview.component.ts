import {
  Component,
  OnInit,
  ElementRef,
  Directive,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList
} from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { Pitcher } from "../../models/Pitcher";

export type SortDirection = "asc" | "desc" | "";
const rotate: { [key: string]: SortDirection } = {
  asc: "desc",
  desc: "",
  "": "asc"
};
export const compare = (v1, v2) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: "th[sortable]",
  host: {
    "[class.asc]": 'direction === "asc"',
    "[class.desc]": 'direction === "desc"',
    "(click)": "rotate()"
  }
})
export class NgbdSortableHeader {
  @Input() sortable: string;
  @Input() direction: SortDirection = "";
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

@Component({
  selector: "app-team-overview",
  templateUrl: "./team-overview.component.html",
  styleUrls: ["./team-overview.component.scss"]
})
export class TeamOverviewComponent implements OnInit {
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = "";
      }
    });

    // sorting countries
    if (direction === "") {
      this.pitchers = this.pitchers;
    } else {
      this.pitchers = [...this.pitchers].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === "asc" ? res : -res;
      });
    }
  }

  curUser;

  pitchers: Pitcher[] = [];
  pitchersa: Pitcher[] = [];

  constructor(
    private elementRef: ElementRef,
    private userService: UserService,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      "white";
  }

  ngOnInit() {
    // this.curUser = this.userService.getUserData();
    // if (this.curUser == null) {
    //   this.router.navigate([""]);
    // }

    this.apiService.getAllPictherData().subscribe(data => {
      for (var i = 0; i < data.length; i++) {
        let pitcher = new Pitcher(
          data[i].player_name,
          data[i].handedness,
          data[i]._id,
          data[i].height,
          data[i].dob
        );
        this.pitchers.push(pitcher);
      }
    });

    console.log(this.pitchers.length);
    console.log("LENGTH: ", this.pitchers);
  }
}
