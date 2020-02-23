import { Component, OnInit, ViewChildren, QueryList } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { Pitcher } from "src/app/models/Pitcher";
import {
  NgbdSortableHeader,
  compare
} from "src/app/helpers/NgbdSortableHeader";
import { SortEvent } from "src/app/models/SortEvent";

@Component({
  selector: "app-sessions-overview",
  templateUrl: "./sessions-overview.component.html",
  styleUrls: ["./sessions-overview.component.scss"]
})

//PUT EVERYTHING INTO ONE ARRAY AND TRY SORTING THAT WAY
export class SessionsOverviewComponent implements OnInit {
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
      this.sessionMaxAvg = [];
      this.sessions = [...this.sessions].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === "asc" ? res : -res;
      });
      for (var i = 0; i < this.sessions.length; i++) {
        this.apiService
          .getAvgMaxByPT(this.sessions[i]["idSession"], 0)
          .subscribe(data => {
            let maxAvg = data;
            // console.log(maxAvg);
            this.makeMaxAvg(i, maxAvg);
            // this.sessionMaxAvg.push({i: maxAvg});
          });
        // console.log(data[i]['idSession']);
      }
    }
  }

  currentPitcher;
  curPlayerID;

  sessions;

  sessionMaxAvg = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

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
      // console.log(data.length);
      // console.log(data[])

      for (var i = 0; i < data.length; i++) {
        this.apiService
          .getAvgMaxByPT(data[i]["idSession"], 0)
          .subscribe(data => {
            let maxAvg = data;
            // console.log(maxAvg);
            this.makeMaxAvg(i, maxAvg);
            // this.sessionMaxAvg.push({i: maxAvg});
          });
        // console.log(data[i]['idSession']);
      }
    });

    //console.log(this.sessions);
  }

  makeMaxAvg(id, maxAvg) {
    // console.log(id)
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

    this.sessionMaxAvg.push(pitchTypes);

    // console.log(this.sessionMaxAvg[0]);
  }

  createPitcher(pitcher: Pitcher) {
    this.currentPitcher = pitcher;
  }
}
