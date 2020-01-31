import { Component, OnInit } from "@angular/core";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";

@Component({
  selector: "app-release-charts",
  templateUrl: "./release-charts.component.html",
  styleUrls: ["./release-charts.component.scss"]
})
export class ReleaseChartsComponent implements OnInit {
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

  constructor() {}

  ngOnInit() {}
}
