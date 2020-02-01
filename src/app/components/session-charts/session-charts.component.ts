import { Component, OnInit } from "@angular/core";
import { ChartDataSets, ChartType, ChartOptions } from "chart.js";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-session-charts",
  templateUrl: "./session-charts.component.html",
  styleUrls: ["./session-charts.component.scss"]
})
export class SessionChartsComponent implements OnInit {
  curPlayerID;

  sessions;

  allPitches = [];

  chartsArray = [
    {
      release4FB: [{}],
      release2FB: [{}],
      releaseCH: [{}],
      releaseSL: [{}],
      releaseCB: [{}],
      releaseCU: [{}]
    },
    {
      movement4FB: [{}],
      movement2FB: [{}],
      movementCH: [{}],
      movementSL: [{}],
      movementCB: [{}],
      movementCU: [{}]
    },
    {
      release4FBAvg: [{}],
      release2FBAvg: [{}],
      releaseCHAvg: [{}],
      releaseSLAvg: [{}],
      releaseCBAvg: [{}],
      releaseCUAvg: [{}]
    },
    {
      movement4FBAvg: [{}],
      movement2FBAvg: [{}],
      movementCHAvg: [{}],
      movementSLAvg: [{}],
      movementCBAvg: [{}],
      movementCUAvg: [{}]
    }
  ];

  public releaseChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Release Height"
          },
          ticks: {
            min: 3,
            max: 7
          }
        }
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Release Side"
          },
          ticks: {
            min: -4,
            max: 4
          }
        }
      ]
    }
  };

  // Chart Options for the Vertical and Horizontal movement chart
  public movementChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Vertical Break (Inch)"
          },
          ticks: {
            min: -30,
            max: 30
          }
        }
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Horizontal Break (Inch)"
          },
          ticks: {
            min: -20,
            max: 20
          }
        }
      ]
    }
  };

  public releaseChartData: ChartDataSets[] = [
    {
      data: this.chartsArray[0]["release4FB"],
      backgroundColor: ["blue"],
      label: "Fastball",
      pointRadius: 4,
      pointBackgroundColor: "blue"
    },
    {
      data: this.chartsArray[0]["releaseCB"],
      backgroundColor: ["red"],
      label: "Curveball",
      pointRadius: 4,
      pointBackgroundColor: "red"
    },
    {
      data: this.chartsArray[0]["releaseSL"],
      backgroundColor: ["orange"],
      label: "Slider",
      pointRadius: 4,
      pointBackgroundColor: "orange"
    },
    {
      data: this.chartsArray[0]["releaseCU"],
      backgroundColor: ["green"],
      label: "Cut Fastball",
      pointRadius: 4,
      pointBackgroundColor: "green"
    },
    {
      data: this.chartsArray[0]["release2FB"],
      backgroundColor: ["yellow"],
      label: "2 Seam Fastball",
      pointRadius: 4,
      pointBackgroundColor: "yellow"
    },
    {
      data: this.chartsArray[0]["releaseCH"],
      backgroundColor: ["hotpink"],
      label: "Changeup",
      pointRadius: 4,
      pointBackgroundColor: "hotpink"
    }
  ];

  public releaseAvgChartData: ChartDataSets[] = [
    {
      data: this.chartsArray[2]["release4FBAvg"],
      backgroundColor: ["blue"],
      label: "Fastball",
      pointRadius: 4,
      pointBackgroundColor: "blue"
    },
    {
      data: this.chartsArray[2]["releaseCBAvg"],
      backgroundColor: ["red"],
      label: "Curveball",
      pointRadius: 4,
      pointBackgroundColor: "red"
    },
    {
      data: this.chartsArray[2]["releaseSLAvg"],
      backgroundColor: ["orange"],
      label: "Slider",
      pointRadius: 4,
      pointBackgroundColor: "orange"
    },
    {
      data: this.chartsArray[2]["releaseCUAvg"],
      backgroundColor: ["green"],
      label: "Cut Fastball",
      pointRadius: 4,
      pointBackgroundColor: "green"
    },
    {
      data: this.chartsArray[2]["release2FBAvg"],
      backgroundColor: ["yellow"],
      label: "2 Seam Fastball",
      pointRadius: 4,
      pointBackgroundColor: "yellow"
    },
    {
      data: this.chartsArray[2]["releaseCHAvg"],
      backgroundColor: ["hotpink"],
      label: "Changeup",
      pointRadius: 4,
      pointBackgroundColor: "hotpink"
    }
  ];

  public movementChartData: ChartDataSets[] = [
    {
      data: this.chartsArray[1]["movement4FB"],
      backgroundColor: ["blue"],
      label: "Fastball",
      pointRadius: 4,
      pointBackgroundColor: "blue"
    },
    {
      data: this.chartsArray[1]["movementCB"],
      backgroundColor: ["red"],
      label: "Curveball",
      pointRadius: 4,
      pointBackgroundColor: "red"
    },
    {
      data: this.chartsArray[1]["movementSL"],
      backgroundColor: ["orange"],
      label: "Slider",
      pointRadius: 4,
      pointBackgroundColor: "orange"
    },
    {
      data: this.chartsArray[1]["movementCU"],
      backgroundColor: ["green"],
      label: "Cut Fastball",
      pointRadius: 4,
      pointBackgroundColor: "green"
    },
    {
      data: this.chartsArray[1]["movement2FB"],
      backgroundColor: ["yellow"],
      label: "2 Seam Fastball",
      pointRadius: 4,
      pointBackgroundColor: "yellow"
    },
    {
      data: this.chartsArray[1]["movementCH"],
      backgroundColor: ["hotpink"],
      label: "Changeup",
      pointRadius: 4,
      pointBackgroundColor: "hotpink"
    }
  ];

  public movementAvgChartData: ChartDataSets[] = [
    {
      data: this.chartsArray[3]["movement4FBAvg"],
      backgroundColor: ["blue"],
      label: "Fastball",
      pointRadius: 4,
      pointBackgroundColor: "blue"
    },
    {
      data: this.chartsArray[3]["movementCBAvg"],
      backgroundColor: ["red"],
      label: "Curveball",
      pointRadius: 4,
      pointBackgroundColor: "red"
    },
    {
      data: this.chartsArray[3]["movementSLAvg"],
      backgroundColor: ["orange"],
      label: "Slider",
      pointRadius: 4,
      pointBackgroundColor: "orange"
    },
    {
      data: this.chartsArray[3]["movementCUAvg"],
      backgroundColor: ["green"],
      label: "Cut Fastball",
      pointRadius: 4,
      pointBackgroundColor: "green"
    },
    {
      data: this.chartsArray[3]["movement2FBAvg"],
      backgroundColor: ["yellow"],
      label: "2 Seam Fastball",
      pointRadius: 4,
      pointBackgroundColor: "yellow"
    },
    {
      data: this.chartsArray[3]["movementCHAvg"],
      backgroundColor: ["hotpink"],
      label: "Changeup",
      pointRadius: 4,
      pointBackgroundColor: "hotpink"
    }
  ];

  public scatterChartType: ChartType = "scatter";

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.curPlayerID = params["id"];
    });

    this.apiService.getSessionsById(102036).subscribe(data => {
      console.log("chart sessions: ", data);
      this.sessions = data;
      // console.log(data.length);
      // console.log(data[])
      // for (var i = 0; i < data.length; i++) {

      // console.log(data[i]['idSession']);
      // }
    });

    this.apiService.getChartData(102036).subscribe(data => {
      let values = data;
      console.log("Values: ", values);
      this.makeSessionCharts(0, values);
      // this.sessionMaxAvg.push({i: maxAvg});
    });

    this.apiService.getChartDataAvg(102036).subscribe(data => {
      let averages = data;
      console.log("Averages: ", averages);
      this.makeSessionChartsAvg(0, averages);
      // this.sessionMaxAvg.push({i: maxAvg});
    });
  }

  makeSessionCharts(id, values) {
    // console.log(id)
    var pitchTypes = {};
    //console.log("Values", values);

    // testData = [
    //   { x: 10, y: 15 },
    //   { x: 11, y: 16 },
    //   { x: 12, y: 18 },
    //   { x: 11, y: 17 },
    //   { x: 12.5, y: 16.5 }
    // ];

    pitchTypes["4 Seam Fastball"] = [0, 0, 0, 0];
    pitchTypes["2 Seam Fastball"] = [0, 0, 0, 0];
    pitchTypes["Changeup"] = [0, 0, 0, 0];
    pitchTypes["Curveball"] = [0, 0, 0, 0];
    pitchTypes["Slider"] = [0, 0, 0, 0];
    pitchTypes["Cut Fastball"] = [0, 0, 0, 0];

    for (var i = 0; i < values.length; i++) {
      switch (values[i]["Pitch_Type_pitchType"]) {
        case 0:
          this.chartsArray[0]["release4FB"].push({
            x: values[i]["releaseSide"],
            y: values[i]["releaseHeight"]
          });
          this.chartsArray[1]["movement4FB"].push({
            x: values[i]["horizontalBreak"],
            y: values[i]["verticalBreak"]
          });
          break;
        case 1:
          this.chartsArray[0]["releaseCU"].push({
            x: values[i]["releaseSide"],
            y: values[i]["releaseHeight"]
          });
          this.chartsArray[1]["movementCU"].push({
            x: values[i]["horizontalBreak"],
            y: values[i]["verticalBreak"]
          });
          break;
        case 3:
          this.chartsArray[0]["releaseCB"].push({
            x: values[i]["releaseSide"],
            y: values[i]["releaseHeight"]
          });
          this.chartsArray[1]["movementCB"].push({
            x: values[i]["horizontalBreak"],
            y: values[i]["verticalBreak"]
          });
          break;
        case 4:
          this.chartsArray[0]["releaseSL"].push({
            x: values[i]["releaseSide"],
            y: values[i]["releaseHeight"]
          });
          this.chartsArray[1]["movementSL"].push({
            x: values[i]["horizontalBreak"],
            y: values[i]["verticalBreak"]
          });
          break;
        case 5:
          this.chartsArray[0]["release2FB"].push({
            x: values[i]["releaseSide"],
            y: values[i]["releaseHeight"]
          });
          this.chartsArray[1]["movement2FB"].push({
            x: values[i]["horizontalBreak"],
            y: values[i]["verticalBreak"]
          });
          break;
        case 6:
          this.chartsArray[0]["releaseCH"].push({
            x: values[i]["releaseSide"],
            y: values[i]["releaseHeight"]
          });
          this.chartsArray[1]["movementCH"].push({
            x: values[i]["horizontalBreak"],
            y: values[i]["verticalBreak"]
          });
          break;
        default:
          break;
      }
    }
    console.log("chartsTEST: ", pitchTypes);
    this.allPitches.push(pitchTypes);

    console.log("Pitches", this.allPitches);
  }

  makeSessionChartsAvg(id, values) {
    // console.log(id)
    var pitchTypes = {};
    //console.log("Values", values);

    // testData = [
    //   { x: 10, y: 15 },
    //   { x: 11, y: 16 },
    //   { x: 12, y: 18 },
    //   { x: 11, y: 17 },
    //   { x: 12.5, y: 16.5 }
    // ];

    pitchTypes["4 Seam Fastball"] = [0, 0, 0, 0];
    pitchTypes["2 Seam Fastball"] = [0, 0, 0, 0];
    pitchTypes["Changeup"] = [0, 0, 0, 0];
    pitchTypes["Curveball"] = [0, 0, 0, 0];
    pitchTypes["Slider"] = [0, 0, 0, 0];
    pitchTypes["Cut Fastball"] = [0, 0, 0, 0];

    for (var i = 0; i < values.length; i++) {
      switch (values[i]["Pitch_Type_pitchType"]) {
        case 0:
          this.chartsArray[2]["release4FBAvg"].push({
            x: values[i]["AVG(releaseSide)"],
            y: values[i]["AVG(releaseHeight)"]
          });
          this.chartsArray[3]["movement4FBAvg"].push({
            x: values[i]["AVG(horizontalBreak)"],
            y: values[i]["AVG(verticalBreak)"]
          });
          break;
        case 1:
          this.chartsArray[2]["releaseCUAvg"].push({
            x: values[i]["AVG(releaseSide)"],
            y: values[i]["AVG(releaseHeight)"]
          });
          this.chartsArray[3]["movementCUAvg"].push({
            x: values[i]["AVG(horizontalBreak)"],
            y: values[i]["AVG(verticalBreak)"]
          });
          break;
        case 3:
          this.chartsArray[2]["releaseCBAvg"].push({
            x: values[i]["AVG(releaseSide)"],
            y: values[i]["AVG(releaseHeight)"]
          });
          this.chartsArray[3]["movementCBAvg"].push({
            x: values[i]["AVG(horizontalBreak)"],
            y: values[i]["AVG(verticalBreak)"]
          });
          break;
        case 4:
          this.chartsArray[2]["releaseSLAvg"].push({
            x: values[i]["AVG(releaseSide)"],
            y: values[i]["AVG(releaseHeight)"]
          });
          this.chartsArray[3]["movementSLAvg"].push({
            x: values[i]["AVG(horizontalBreak)"],
            y: values[i]["AVG(verticalBreak)"]
          });
          break;
        case 5:
          this.chartsArray[2]["release2FBAvg"].push({
            x: values[i]["AVG(releaseSide)"],
            y: values[i]["AVG(releaseHeight)"]
          });
          this.chartsArray[3]["movement2FBAvg"].push({
            x: values[i]["AVG(horizontalBreak)"],
            y: values[i]["AVG(verticalBreak)"]
          });
          break;
        case 6:
          this.chartsArray[2]["releaseCHAvg"].push({
            x: values[i]["AVG(releaseSide)"],
            y: values[i]["AVG(releaseHeight)"]
          });
          this.chartsArray[3]["movementCHAvg"].push({
            x: values[i]["AVG(horizontalBreak)"],
            y: values[i]["AVG(verticalBreak)"]
          });
          break;
        default:
          break;
      }
    }
    console.log("chartsTEST: ", pitchTypes);
    this.allPitches.push(pitchTypes);

    console.log("Pitches", this.allPitches);
  }
}
