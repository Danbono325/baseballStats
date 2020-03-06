import { Component, OnInit, ViewChildren, QueryList } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { ApiService } from "src/app/services/api.service";
import { Pitcher } from "src/app/models/Pitcher";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Options } from "ng5-slider";
import {
  NgbdSortableHeader,
  compare
} from "src/app/helpers/NgbdSortableHeader";
import { SortEvent } from "src/app/models/SortEvent";

@Component({
  selector: "app-session",
  templateUrl: "./session.component.html",
  styleUrls: ["./session.component.scss"]
})
export class SessionComponent implements OnInit {
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
      this.sessionData = this.sessionData;
    } else {
      this.sessionData = [...this.sessionData].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === "asc" ? res : -res;
      });
    }
  }

  curUser;
  currentPitcher;
  curPlayerID;
  curSessionID;
  sessionData;
  sessionDate;
  sessionSummaryData = {};
  filteredSessionData = [];

  filterStrikes = false;
  isFiltered = false;

  lowVelo: number = 0;
  highVelo: number = 100;
  lowSpin: number = 0;
  highSpin: number = 100;
  options: Options = {
    floor: 0,
    ceil: 100
  };

  lowVbreak: number = -25;
  highVbreak: number = 25;
  lowHbreak: number = -25;
  highHbreak: number = 25;
  breakOptions: Options = {
    floor: -25,
    ceil: 25
  };

  lowRheight: number = 0;
  highRheight: number = 7;
  heightOptions: Options = {
    floor: 0,
    ceil: 7,
    step: 0.5
  };

  lowRside: number = -5;
  highRside: number = 5;
  sideOptions: Options = {
    floor: -5,
    ceil: 5,
    step: 0.5
  };

  lowTotalSpin: number = 100;
  highTotalSpin: number = 3000;
  totalSpinOptions: Options = {
    floor: 100,
    ceil: 3000,
    step: 100
  }

  pitchTypeCheckboxes = {
    0: false,
    5: false,
    1: false,
    6: false,
    4: false,
    3: false
  };

  pitchTypesEnabled = {
    "4FB": false,
    "CUT": false,
    "CUR": true,
    "2FB": false,
    "SLI": false
  };

  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.curPlayerID = params["id"];
      this.curSessionID = params["sessionID"];
      this.sessionDate = params["sessionDate"];
    });

    console.log("Session Date", this.sessionDate);
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
    // console.log(this.currentPitcher);

    this.apiService.getSessionData(this.curSessionID).subscribe(data => {
      this.sessionData = data;
      
      console.log("Session Data", data);
    });

    this.apiService
      .getAvgMaxByPT(this.curSessionID, this.curPlayerID)
      .subscribe(data => {
        let summaryData = data;
        console.log("Session Summary Data", data);
        this.makeMaxAvg(summaryData);
      });

    this.curUser = this.userService.getUserData();
  }

  makeMaxAvg(maxAvg) {
    // console.log(id)
    //console.log("MAX AVG", maxAvg);
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

    this.sessionSummaryData = pitchTypes;

    // console.log(this.sessionMaxAvg[0]);
  }

  createPitcher(pitcher: Pitcher) {
    this.currentPitcher = pitcher;
  }

  filterItems() {
    this.apiService.filterSingleSession = true;
    this.isFiltered = true;
    console.log(this.pitchTypeCheckboxes);
    this.filteredSessionData = [];
    this.sessionData = [];

    this.apiService
      .getFilteredData(
        this.curSessionID,
        this.lowVelo,
        this.highVelo,
        this.lowTotalSpin,
        this.highTotalSpin,
        this.lowSpin,
        this.highSpin,
        this.lowVbreak,
        this.highVbreak,
        this.lowHbreak,
        this.highHbreak,
        this.lowRheight,
        this.highRheight,
        this.lowRside,
        this.highRside
      )
      .subscribe(data => {
        //  this.sessionData = [];
        let addedSelected = false;
        console.log("DATA Length is: ", data.length);
        for (var i = 0; i < data.length; i++) {
          switch (data[i]["Pitch_Type_pitchType"]) {
            case 0:
              if (this.pitchTypeCheckboxes[0]) {
                this.sessionData.push(data[i]);
                addedSelected = true;
              }
              break;
            case 1:
              if (this.pitchTypeCheckboxes[1]) {
                this.sessionData.push(data[i]);
                addedSelected = true;
              }
              break;
            case 3:
              if (this.pitchTypeCheckboxes[3]) {
                this.sessionData.push(data[i]);
                addedSelected = true;
              }
              break;
            case 4:
              if (this.pitchTypeCheckboxes[4]) {
                this.sessionData.push(data[i]);
                addedSelected = true;
              }
              break;
            case 5:
              if (this.pitchTypeCheckboxes[5]) {
                this.sessionData.push(data[i]);
                addedSelected = true;
              }
              break;
            case 6:
              if (this.pitchTypeCheckboxes[6]) {
                this.sessionData.push(data[i]);
                addedSelected = true;
              }
              break;
            default:
              break;
          }
        }

        if (this.sessionData.length == 0 && !addedSelected) {
          console.log("NOTHING");
          this.sessionData = data;
        }
        if (this.filterStrikes) {
          console.log("FILTERTING");
          this.sessionData = this.sessionData.filter(
            session => session.strike == "Y"
          );
        }
      });
  }

  resetFilter() {
    this.filterStrikes = false;
    this.isFiltered = false;

    this.lowVelo = 0;
    this.highVelo = 100;
    this.lowSpin = 0;
    this.highSpin = 100;

    this.lowVbreak = -25;
    this.highVbreak = 25;
    this.lowHbreak = -25;
    this.highHbreak = 25;
    this.lowRheight = 0;
    this.highRheight = 7;
    this.lowRside = -5;
    this.highRside = 5;

    this.pitchTypeCheckboxes = {
      0: false,
      5: false,
      1: false,
      6: false,
      4: false,
      3: false
    };

    console.log("PT CB", this.pitchTypeCheckboxes);

    this.sessionData = [];
    this.apiService.getSessionData(this.curSessionID).subscribe(data => {
      this.sessionData = data;
      console.log("Session Data", data);
    });
  }
}
