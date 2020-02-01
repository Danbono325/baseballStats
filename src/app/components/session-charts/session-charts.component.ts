import { Component, OnInit } from "@angular/core";
import { ChartDataSets, ChartType, ChartOptions } from "chart.js";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { Chart } from "../../models/Chart";

@Component({
  selector: "app-session-charts",
  templateUrl: "./session-charts.component.html",
  styleUrls: ["./session-charts.component.scss"]
})
export class SessionChartsComponent implements OnInit {
  curPlayerID;

  sessions;

  allPitches = [];

  releaseArray = [{
    "release4FB": [{}],
    "release2FB": [{}],
    "releaseCH": [{}],
    "releaseSL": [{}],
    "releaseCB": [{}],
    "releaseCU": [{}]
  }];

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
            min: 5,
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
            min: -5,
            max: 5
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
            min: -30,
            max: 30
          }
        }
      ]
    }
  };

  release4FB = [{}];

  public releaseChartData: ChartDataSets[] = [
    {
      data: this.releaseArray[0]["release4FB"],
      backgroundColor: ["blue"],
      label: "Fastball",
      pointRadius: 2,
      pointBackgroundColor: "blue"
    },
    {
      data: this.releaseArray[0]["releaseCB"],
      backgroundColor: ["red"],
      label: "Curveball",
      pointRadius: 3,
      pointBackgroundColor: "red"
    },
    {
      data: this.releaseArray[0]["releaseSL"],
      backgroundColor: ["orange"],
      label: "Slider",
      pointRadius: 3,
      pointBackgroundColor: "orange"
    },
    {
      data: this.releaseArray[0]["releaseCU"],
      backgroundColor: ["green"],
      label: "Cut Fastball",
      pointRadius: 3,
      pointBackgroundColor: "green"
    },
    {
      data: this.releaseArray[0]["release2FB"],
      backgroundColor: ["yellow"],
      label: "2 Seam Fastball",
      pointRadius: 3,
      pointBackgroundColor: "yellow"
    },
    {
      data: this.releaseArray[0]["releaseCH"],
      backgroundColor: ["pink"],
      label: "Changeup",
      pointRadius: 3,
      pointBackgroundColor: "pink"
    }
  ];

  public releaseAvgChartData: ChartDataSets[] = [
    {
      data: [{ x: 2.9, y: 6.65 }],
      backgroundColor: "blue",
      label: "Fastball",
      pointRadius: 5,
      pointBackgroundColor: "blue"
    },
    {
      data: [{ x: 3.2, y: 6.3 }],
      backgroundColor: "red",
      label: "Curveball",
      pointRadius: 5,
      pointBackgroundColor: "red"
    },
    {
      data: [{ x: 2.65, y: 6.4 }],
      backgroundColor: "orange",
      label: "Slider",
      pointRadius: 5,
      pointBackgroundColor: "orange"
    },
    {
      data: [{ x: 2, y: 6.7 }],
      backgroundColor: "green",
      label: "Cut Fastball",
      pointRadius: 5,
      pointBackgroundColor: "green"
    }
  ];

  public movementChartData: ChartDataSets[] = [
    {
      data: [
        { x: -1, y: 10 },
        { x: 0, y: 11 },
        { x: 0, y: 12 },
        { x: 1, y: 13 },
        { x: 2, y: 12.5 }
      ],
      backgroundColor: ["blue"],
      label: "Fastball",
      pointRadius: 3,
      pointBackgroundColor: "blue"
    },
    {
      data: [
        { x: -1, y: 10 },
        { x: 0, y: 11 },
        { x: 0, y: 12 },
        { x: 1, y: 13 },
        { x: 2, y: 12.5 }
      ],
      backgroundColor: ["red"],
      label: "Curveball",
      pointRadius: 3,
      pointBackgroundColor: "red"
    },
    {
      data: [
        { x: 2, y: -10 },
        { x: 1, y: -11.5 },
        { x: 0, y: -9.5 },
        { x: 0, y: -12 },
        { x: 2.95, y: -10.5 }
      ],
      backgroundColor: ["orange"],
      label: "Slider",
      pointRadius: 3,
      pointBackgroundColor: "orange"
    },
    {
      data: [
        { x: 5, y: 10 },
        { x: 6.14, y: 11.6 },
        { x: 7.5, y: 9.65 },
        { x: 6.35, y: 11.55 },
        { x: 5.5, y: 12.5 }
      ],
      backgroundColor: ["green"],
      label: "Cut Fastball",
      pointRadius: 3,
      pointBackgroundColor: "green"
    }
  ];

  public movementAvgChartData: ChartDataSets[] = [
    {
      data: [{ x: 10, y: 15 }],
      backgroundColor: ["blue"],
      label: "Fastball",
      pointRadius: 5,
      pointBackgroundColor: "blue"
    },
    {
      data: [{ x: -1, y: 10 }],
      backgroundColor: ["red"],
      label: "Curveball",
      pointRadius: 5,
      pointBackgroundColor: "red"
    },
    {
      data: [{ x: 2, y: -10 }],
      backgroundColor: ["orange"],
      label: "Slider",
      pointRadius: 5,
      pointBackgroundColor: "orange"
    },
    {
      data: [{ x: 5, y: 10 }],
      backgroundColor: ["green"],
      label: "Cut Fastball",
      pointRadius: 5,
      pointBackgroundColor: "green"
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

      // this.apiService
      //   .getChartDataAvg(data[i]["idSession"])
      //   .subscribe(data => {
      //     let averages = data;
      //     //console.log("Values: ", values);
      //     this.makeSessionChartsAvg(i, averages);
      //     // this.sessionMaxAvg.push({i: maxAvg});
      //   });
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
          this.releaseArray[0]["release4FB"].push({
            x: values[i]["releaseSide"],
            y: values[i]["releaseHeight"]
          });
          break;
        case 1:
          this.releaseArray[0]["releaseCU"].push({
            x: values[i]["releaseSide"],
            y: values[i]["releaseHeight"]
          });
          break;
        case 3:
          this.releaseArray[0]["releaseCB"].push({
            x: values[i]["releaseSide"],
            y: values[i]["releaseHeight"]
          });
          break;
        case 4:
          this.releaseArray[0]["releaseSL"].push({
            x: values[i]["releaseSide"],
            y: values[i]["releaseHeight"]
          });
          break;
        case 5:
          this.releaseArray[0]["release2FB"].push({
            x: values[i]["releaseSide"],
            y: values[i]["releaseHeight"]
          });
          break;
        case 6:
          this.releaseArray[0]["releaseCH"].push({
            x: values[i]["releaseSide"],
            y: values[i]["releaseHeight"]
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

  // makeSessionChartsAvg(id, values) {
  //   // console.log(id)
  //   var pitchTypes = {};
  //   //console.log("Values", values);

  //   pitchTypes["4 Seam Fastball"] = [0, 0];
  //   pitchTypes["2 Seam Fastball"] = [0, 0];
  //   pitchTypes["Changeup"] = [0, 0];
  //   pitchTypes["Curveball"] = [0, 0];
  //   pitchTypes["Slider"] = [0, 0];
  //   pitchTypes["Cut Fastball"] = [0, 0];

  //   for (var i = 0; i < values.length; i++) {
  //     switch (values[i]["Pitch_Type_pitchType"]) {
  //       case 0:
  //         pitchTypes["4 Seam Fastball"] = [
  //           values[i]["AVG(verticalBreak)"],
  //           values[i]["AVG(horizontalBreak)"],
  //           values[i]["AVG(releaseHeight)"],
  //           values[i]["AVG(releaseSide)"]
  //         ];
  //         break;
  //       case 1:
  //         pitchTypes["Cut Fastball"] = [
  //           values[i]["AVG(verticalBreak)"],
  //           values[i]["AVG(horizontalBreak)"],
  //           values[i]["AVG(releaseHeight)"],
  //           values[i]["AVG(releaseSide)"]
  //         ];
  //         break;
  //       case 3:
  //         pitchTypes["Curveball"] = [
  //           values[i]["AVG(verticalBreak)"],
  //           values[i]["AVG(horizontalBreak)"],
  //           values[i]["AVG(releaseHeight)"],
  //           values[i]["AVG(releaseSide)"]
  //         ];
  //         break;
  //       case 4:
  //         pitchTypes["Slider"] = [
  //           values[i]["AVG(verticalBreak)"],
  //           values[i]["AVG(horizontalBreak)"],
  //           values[i]["AVG(releaseHeight)"],
  //           values[i]["AVG(releaseSide)"]
  //         ];
  //         break;
  //       case 5:
  //         pitchTypes["2 Seam Fastball"] = [
  //           values[i]["AVG(verticalBreak)"],
  //           values[i]["AVG(horizontalBreak)"],
  //           values[i]["AVG(releaseHeight)"],
  //           values[i]["AVG(releaseSide)"]
  //         ];
  //         break;
  //       case 6:
  //         pitchTypes["Changeup"] = [
  //           values[i]["AVG(verticalBreak)"],
  //           values[i]["AVG(horizontalBreak)"],
  //           values[i]["AVG(releaseHeight)"],
  //           values[i]["AVG(releaseSide)"]
  //         ];
  //         break;
  //       default:
  //         break;
  //     }
  //   }

  //   this.sessionChartsAvg.push(pitchTypes);
  //   console.log("avg charts: ", pitchTypes);
  //   // console.log(this.sessionMaxAvg[0]);
  // }
}
