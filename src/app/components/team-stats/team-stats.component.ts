import { Component, OnInit, ElementRef, ViewChildren, QueryList } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { Pitcher } from "../../models/Pitcher";
import { NgbdSortableHeader, compare } from 'src/app/helpers/NgbdSortableHeader';
import { SortEvent } from 'src/app/models/SortEvent';

@Component({
  selector: "app-team-stats",
  templateUrl: "./team-stats.component.html",
  styleUrls: ["./team-stats.component.scss"]
})
export class TeamStatsComponent implements OnInit {

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
      this.pitcherdata = this.pitcherdata;
      let index = this.pitcherdata.findIndex(item => item["_id"] === 510895);
      this.pitcherdata.splice(index, 1); 
    } else {
      this.pitcherdata = [...this.pitcherdata].sort((a, b) => {
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

  pitchers: Pitcher[] = [];
  pitcherdata: any;
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
    console.log("TEAM DATA", this.tableData);
    this.apiService.getAllPictherData().subscribe(data => {

      this.pitcherdata = data;
      let index = this.pitcherdata.findIndex(item => item["_id"] === 510895);
      this.pitcherdata.splice(index, 1);
      console.log("Data ", this.pitcherdata);
      console.log(data.length);
    });

    this.apiService.getAvgMax(0).subscribe(data => {
      this.allData = data;
      console.log("ALL DATA", data);
      this.getMaxAvgs(data);
    });

   

    
  }

  getMaxAvgs(data) {
   let currentID = data[0].Pitcher_pitcher_id;

    let curPitches = [];
   for(var i =0; i < data.length; i++) {
    
     if(currentID != data[i].Pitcher_pitcher_id) {
      //  this.tableData.push(this.makeTableData(curPitches));
      let index = this.pitcherdata.findIndex(item => item["_id"] === currentID);
      this.makeTableData(curPitches, index);
       currentID = data[i].Pitcher_pitcher_id;
       curPitches = [];
       curPitches.push(data[i]);
     }
     else {
      curPitches.push(data[i]);
     }

     if(i == data.length -1) {
      //  this.tableData.push(this.makeTableData(curPitches));
      let index = this.pitcherdata.findIndex(item => item["_id"] === currentID);
      this.makeTableData(curPitches, index);
     }
   }

   console.log('PITCHER FULL DATA', this.pitcherdata);
  //  this.tableData[currentID] = [];
  
  }

  makeTableData(maxAvg, index) {
    console.log('index in makeTableData: ', index);
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
    console.log('Pitcht tYpes: ', pitchTypes);
    this.pitcherdata[index]["PT"] = pitchTypes;
    // return pitchTypes;

    // console.log(this.sessionMaxAvg[0]);
  }
}
