import { Component, OnInit, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { Pitcher } from "../../models/Pitcher";

@Component({
  selector: "app-team-stats",
  templateUrl: "./team-stats.component.html",
  styleUrls: ["./team-stats.component.scss"]
})
export class TeamStatsComponent implements OnInit {
  pitchers: Pitcher[] = [];
  pitcherdata;
  tableData = [];

  constructor(
    private elementRef: ElementRef,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      "white";
  }


  allData;

  ngOnInit() {
    console.log('TEAM DATA', this.tableData);
    this.apiService.getAllPictherData().subscribe(data => {
      this.pitcherdata = data;
      console.log("Data ", this.pitcherdata);
      console.log(data.length);
      for (var i = 0; i < data.length; i++) {
        this.apiService.getAvgMax(data[i]._id).subscribe(data2 => {
          console.log("data2 ", data2);
          let maxAvg = data2;
          this.makeTableData(i, maxAvg);
        });
      }
    });


    this.apiService.getAvgMax(0).subscribe(data => {
      this.allData = data;
      console.log('ALL DATA', data);
      this.getMaxAvgs(data);


    })

    
  }

<<<<<<< HEAD
  makeTableData(id, maxAvg) {
    // console.log(id)
    //console.log("MAX AVG", maxAvg);
=======
  getMaxAvgs(data) {
   let currentID = data[0].Pitcher_pitcher_id;
    let ids = [];

    let curPitches = [];
   for(var i =0; i < data.length; i++) {
    
     if(currentID != data[i].Pitcher_pitcher_id) {
       ids.push(currentID);
       this.tableData.push(this.makeTableData(curPitches));
       currentID = data[i].Pitcher_pitcher_id;
       curPitches = [];
     }
     else {
      curPitches.push(data[i]);
     }

     if(i == data.length -1) {
       ids.push(currentID);
       this.tableData.push(this.makeTableData(curPitches));
     }
   }

   console.log('IDS: ', ids);
   console.log('TABLE DATA', this.tableData);
  //  this.tableData[currentID] = [];
  
  }

  makeTableData(maxAvg) {
    console.log("MAX AVG", maxAvg);
>>>>>>> 4a41da6c06bddbcce45236cd9c4cc65a927a548c
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
<<<<<<< HEAD
=======
    return pitchTypes;
>>>>>>> 4a41da6c06bddbcce45236cd9c4cc65a927a548c
    this.tableData.push(pitchTypes);
  }
}
