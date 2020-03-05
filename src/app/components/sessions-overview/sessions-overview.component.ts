import { Component, OnInit, ViewChildren, QueryList } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { Pitcher } from "src/app/models/Pitcher";
import {
  NgbdSortableHeader,
  compare
} from "src/app/helpers/NgbdSortableHeader";
import { NgbDate, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";

import { SortEvent } from "src/app/models/SortEvent";
import { from } from "rxjs";

@Component({
  selector: "app-sessions-overview",
  templateUrl: "./sessions-overview.component.html",
  styleUrls: ["./sessions-overview.component.scss"]
})

//PUT EVERYTHING INTO ONE ARRAY AND TRY SORTING THAT WAY
export class SessionsOverviewComponent implements OnInit {
  isFiltered = false;

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;
  fromDateDATE = "";
  toDateDATE = "";

  daysOfWeekBox = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false
  };

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = "";
      }
    });

    // sorting sessions
    if (direction === "") {
      this.sessions = this.sessions;
    } else {
      this.sessions = [...this.sessions].sort((a, b) => {
        if (column != "date") {
          let pitchType = column.split(",")[0];
          let type = Number.parseInt(column.split(",")[1]);
          const res = compare(
            a["PT"][pitchType][type],
            b["PT"][pitchType][type]
          );
          return direction === "asc" ? res : -res;
        } else {
          const res = compare(a[column], b[column]);
          return direction === "asc" ? res : -res;
        }
      });
    }
  }

  currentPitcher;
  curPlayerID;

  sessions;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    calendar: NgbCalendar
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), "d", 10);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.curPlayerID = params["id"];
    });

    this.apiService.getPitcherById(this.curPlayerID).subscribe(data => {
      console.log(data);
      let pitcher = new Pitcher(
        data["player_name"],
        data["handedness"],
        data["_id"],
        data["height"],
        data["dob"]
      );
      this.createPitcher(pitcher);
    });

    this.apiService.getSessionsById(this.curPlayerID).subscribe(data => {
      console.log("sessions: ", data);
      this.sessions = data;
      for (var i = 0; i < data.length; i++) {
        console.log("INDEX BEFORE LOOP: ", i);
        let index = i;
        this.apiService
          .getAvgMaxByPT(data[i]["idSession"], 0)
          .subscribe(data => {
            let maxAvg = data;
            this.makeMaxAvg(index, maxAvg);
          });
      }
    });
  }

  makeMaxAvg(index, maxAvg) {
    console.log("INDEX: ", index);
    console.log("MAX AVG", maxAvg);
    var pitchTypes = {};

    pitchTypes["4 Seam Fastball"] = [0, 0];
    pitchTypes["2 Seam Fastball"] = [0, 0];
    pitchTypes["Changeup"] = [0, 0];
    pitchTypes["Curveball"] = [0, 0];
    pitchTypes["Slider"] = [0, 0];
    pitchTypes["Cut Fastball"] = [0, 0];

    for (var i = 0; i < maxAvg.length; i++) {
      switch (maxAvg[i]["Pitch_Type_pitchType"]) {
        case 0:
          pitchTypes["4 Seam Fastball"] = [
            maxAvg[i]["MAX(speed)"],
            maxAvg[i]["AVG(speed)"]
          ];
          break;
        case 1:
          pitchTypes["Cut Fastball"] = [
            maxAvg[i]["MAX(speed)"],
            maxAvg[i]["AVG(speed)"]
          ];
          break;
        case 3:
          pitchTypes["Curveball"] = [
            maxAvg[i]["MAX(speed)"],
            maxAvg[i]["AVG(speed)"]
          ];
          break;
        case 4:
          pitchTypes["Slider"] = [
            maxAvg[i]["MAX(speed)"],
            maxAvg[i]["AVG(speed)"]
          ];
          break;
        case 5:
          pitchTypes["2 Seam Fastball"] = [
            maxAvg[i]["MAX(speed)"],
            maxAvg[i]["AVG(speed)"]
          ];
          break;
        case 6:
          pitchTypes["Changeup"] = [
            maxAvg[i]["MAX(speed)"],
            maxAvg[i]["AVG(speed)"]
          ];
          break;
        default:
          break;
      }
    }
    this.sessions[index]["PT"] = pitchTypes;
  }

  createPitcher(pitcher: Pitcher) {
    this.currentPitcher = pitcher;
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    this.fromDateDATE =
      this.fromDate.year + "-" + this.fromDate.month + "-" + this.fromDate.day;
    this.toDateDATE =
      this.toDate.year + "-" + this.toDate.month + "-" + this.toDate.day;
    return (
      date.equals(this.fromDate) ||
      date.equals(this.toDate) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  filterDate() {
    this.sessions = [];
    this.isFiltered = true;
    // console.log('FROM DATE: ', this.fromDateDATE);
    // console.log('to DATE: ', this.toDateDATE);
    // console.log('FROM DATE DOW: ', (new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day).getDay()))
    this.apiService
      .filterSessionByDate(this.curPlayerID, this.fromDateDATE, this.toDateDATE)
      .subscribe(data => {
        // this.sessions = data;

        let dayPicked = false;
        for (var i = 0; i < data.length; i++) {
          let date = new Date(data[i]["date"]);
          switch (date.getDay()) {
            case 1:
              if (this.daysOfWeekBox[1]) {
                this.sessions.push(data[i]);
                dayPicked = true;
              }
              break;
            case 2:
              if (this.daysOfWeekBox[2]) {
                this.sessions.push(data[i]);
                dayPicked = true;
              }
              break;
            case 3:
              if (this.daysOfWeekBox[3]) {
                this.sessions.push(data[i]);
                dayPicked = true;
              }
              break;
            case 4:
              if (this.daysOfWeekBox[4]) {
                this.sessions.push(data[i]);
                dayPicked = true;
              }
              break;
            case 5:
              if (this.daysOfWeekBox[5]) {
                this.sessions.push(data[i]);
                dayPicked = true;
              }
              break;
            case 6:
              if (this.daysOfWeekBox[6]) {
                this.sessions.push(data[i]);
                dayPicked = true;
              }
              break;
            case 7:
              if (this.daysOfWeekBox[7]) {
                this.sessions.push(data[i]);
                dayPicked = true;
              }
              break;
            default:
              break;
          }
        }
        if (!dayPicked) {
          this.sessions = data;
        }

        for (var i = 0; i < this.sessions.length; i++) {
          // console.log('INDEX BEFORE LOOP: ', i);
          let index = i;
          this.apiService
            .getAvgMaxByPT(this.sessions[i]["idSession"], 0)
            .subscribe(data => {
              let maxAvg = data;
              this.makeMaxAvg(index, maxAvg);
            });
        }
      });
  }

  resetFilter() {
    this.apiService.getSessionsById(this.curPlayerID).subscribe(data => {
      console.log("sessions: ", data);
      this.sessions = data;
      for (var i = 0; i < data.length; i++) {
        console.log("INDEX BEFORE LOOP: ", i);
        let index = i;
        this.apiService
          .getAvgMaxByPT(data[i]["idSession"], 0)
          .subscribe(data => {
            let maxAvg = data;
            this.makeMaxAvg(index, maxAvg);
          });
      }
    });

    this.daysOfWeekBox = {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false
    };

    this.isFiltered = false;
  }

  goToSession(sessionId, date) {
    // this.router.navigate['/session'], qu
    // from /results?page=1 to /view?page=1&page=2xw
    this.router.navigate(['/session/:id/:sessionID/:sessionDate/'], { queryParams: { id: this.curPlayerID, sessionID: sessionId, sessionDate: date }, preserveFragment: true });
    // this.router.navigate(['/session'], {id: this.curPlayerID, sessionID: sessionId, sessionDate: date});
  }
}
