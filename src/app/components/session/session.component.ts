import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { ApiService } from "src/app/services/api.service";
import { Pitcher } from "src/app/models/Pitcher";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-session",
  templateUrl: "./session.component.html",
  styleUrls: ["./session.component.scss"]
})
export class SessionComponent implements OnInit {
  curUser;
  currentPitcher;
  curPlayerID;
  curSessionID;
  sessionData;
  sessionSummaryData = {};
  filteredSessionData = [];

  isFiltered = false;

  pitchTypeCheckboxes = {
    0: false,
    5: false,
    1: false,
    6: false,
    4: false,
    3: false
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
    this.activatedRoute.params.subscribe(params => {
      this.curPlayerID = params["id"];
      this.curSessionID = params["sessionID"];
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
    this.isFiltered = true;
    console.log(this.pitchTypeCheckboxes);
    this.filteredSessionData = [];

    for (var i = 0; i < this.sessionData.length; i++) {
      switch (this.sessionData[i]["Pitch_Type_pitchType"]) {
        case 0:
          if (this.pitchTypeCheckboxes[0]) {
            this.filteredSessionData.push(this.sessionData[i]);
          }
          break;
        case 1:
          if (this.pitchTypeCheckboxes[1]) {
            this.filteredSessionData.push(this.sessionData[i]);
          }
          break;
        case 3:
          if (this.pitchTypeCheckboxes[3]) {
            this.filteredSessionData.push(this.sessionData[i]);
          }
          break;
        case 4:
          if (this.pitchTypeCheckboxes[4]) {
            this.filteredSessionData.push(this.sessionData[i]);
          }
          break;
        case 5:
          if (this.pitchTypeCheckboxes[5]) {
            this.filteredSessionData.push(this.sessionData[i]);
          }
          break;
        case 6:
          if (this.pitchTypeCheckboxes[6]) {
            this.filteredSessionData.push(this.sessionData[i]);
          }
          break;
        default:
          break;
      }
    }

    if (this.filteredSessionData.length == 0) {
      this.isFiltered = false;
    }
  }
}
