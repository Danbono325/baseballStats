import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { ApiService } from "src/app/services/api.service";
import { Pitcher } from "src/app/models/Pitcher";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";

@Component({
  selector: "app-sessions-overview",
  templateUrl: "./sessions-overview.component.html",
  styleUrls: ["./sessions-overview.component.scss"]
})
export class SessionsOverviewComponent implements OnInit {
  curUser;

  currentPitcher;
  curPlayerID;

  sessions;

  sessionMaxAvg = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.curPlayerID = params["id"];
    });

    this.apiService.getPitcherById(this.curPlayerID).subscribe(data => {
      // console.log(data);
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
    this.curUser = this.userService.getUserData();
    console.log('USER: ', this.curUser);
  }

  makeMaxAvg(id, maxAvg) {
    // console.log(id)
    var pitchTypes = {};
    console.log("MAX AVG", maxAvg);

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

  public scatterChartType: ChartType = "scatter";

  // Chart options for the release height and release side chart
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
            min: -4,
            max: 4
          }
        }
      ]
    }
  };

  public releaseChartData: ChartDataSets[] = [
    {
      data: [
        { x: 2.9, y: 6.65 },
        { x: 2.8, y: 6.75 },
        { x: 3, y: 6.7 },
        { x: 3.2, y: 6.8 },
        { x: 3.1, y: 6.5 }
      ],
      backgroundColor: ["blue"],
      label: "Fastball",
      pointRadius: 5,
      pointBackgroundColor: "blue"
    },
    {
      data: [
        { x: 3.2, y: 6.3 },
        { x: 2.9, y: 6.2 },
        { x: 3, y: 6 },
        { x: 2.95, y: 6.1 },
        { x: 2.7, y: 6.15 }
      ],
      backgroundColor: ["red"],
      label: "Curveball",
      pointRadius: 5,
      pointBackgroundColor: "red"
    },
    {
      data: [
        { x: 2.65, y: 6.4 },
        { x: 2.7, y: 6.54 },
        { x: 2.82, y: 6.6 },
        { x: 2.25, y: 6.3 },
        { x: 2.95, y: 6.45 }
      ],
      backgroundColor: ["orange"],
      label: "Slider",
      pointRadius: 5,
      pointBackgroundColor: "orange"
    },
    {
      data: [
        { x: 2, y: 6.7 },
        { x: 2.14, y: 6.6 },
        { x: 2.5, y: 6.65 },
        { x: 2.35, y: 6.55 },
        { x: 2.2, y: 6.5 }
      ],
      backgroundColor: ["green"],
      label: "Cut Fastball",
      pointRadius: 5,
      pointBackgroundColor: "green"
    }
  ];

  public releaseAvgChartData: ChartDataSets[] = [
    {
      data: [{ x: 2.9, y: 6.65 }],
      backgroundColor: ["blue"],
      label: "Fastball",
      pointRadius: 5,
      pointBackgroundColor: "blue"
    },
    {
      data: [{ x: 3.2, y: 6.3 }],
      backgroundColor: ["red"],
      label: "Curveball",
      pointRadius: 5,
      pointBackgroundColor: "red"
    },
    {
      data: [{ x: 2.65, y: 6.4 }],
      backgroundColor: ["orange"],
      label: "Slider",
      pointRadius: 5,
      pointBackgroundColor: "orange"
    },
    {
      data: [{ x: 2, y: 6.7 }],
      backgroundColor: ["green"],
      label: "Cut Fastball",
      pointRadius: 5,
      pointBackgroundColor: "green"
    }
  ];
}
