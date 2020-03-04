import { Component, OnInit, ViewChildren, QueryList } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { Pitcher } from "src/app/models/Pitcher";
import {
  NgbdSortableHeader,
  compare
} from "src/app/helpers/NgbdSortableHeader";
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

import { SortEvent } from "src/app/models/SortEvent";
import { from } from 'rxjs';

@Component({
  selector: "app-sessions-overview",
  templateUrl: "./sessions-overview.component.html",
  styleUrls: ["./sessions-overview.component.scss"]
})

//PUT EVERYTHING INTO ONE ARRAY AND TRY SORTING THAT WAY
export class SessionsOverviewComponent implements OnInit {


  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;
  fromDateDATE ='';
  toDateDATE ='';




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
        if(column != 'date') {
          let pitchType = column.split(',')[0];
          let type = Number.parseInt(column.split(',')[1]);
          const res = compare(a['PT'][pitchType][type], b['PT'][pitchType][type]);
          return direction === "asc" ? res : -res;
        }
        else {
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
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
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
        console.log('INDEX BEFORE LOOP: ', i);
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
    console.log('INDEX: ',index);
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
    this.sessions[index]['PT'] = pitchTypes;
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
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    
    this.fromDateDATE = this.fromDate.year+"-"+this.fromDate.month+"-"+this.fromDate.day;
    this.toDateDATE = this.toDate.year+"-"+this.toDate.month+"-"+this.toDate.day;
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  filterDate() {
    console.log('FROM DATE: ', this.fromDateDATE);
    console.log('to DATE: ', this.toDateDATE);
    this.apiService.filterSessionByDate(this.curPlayerID, this.fromDateDATE, this.toDateDATE).subscribe(data => {
      this.sessions = data;
      for (var i = 0; i < data.length; i++) {
        console.log('INDEX BEFORE LOOP: ', i);
        let index = i;
        this.apiService
          .getAvgMaxByPT(data[i]["idSession"], 0)
          .subscribe(data => {
            let maxAvg = data;
            this.makeMaxAvg(index, maxAvg);
          });
      }
    })
  }
}
