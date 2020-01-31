import { Component, OnInit } from "@angular/core";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";

@Component({
  selector: "app-movement-charts",
  templateUrl: "./movement-charts.component.html",
  styleUrls: ["./movement-charts.component.scss"]
})
export class MovementChartsComponent implements OnInit {
  public scatterChartType: ChartType = "scatter";

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

  public movementChartData: ChartDataSets[] = [
    {
      data: [
        { x: 10, y: 15 },
        { x: 11, y: 16 },
        { x: 12, y: 18 },
        { x: 11, y: 17 },
        { x: 12.5, y: 16.5 }
      ],
      backgroundColor: ["blue"],
      label: "Fastball",
      pointRadius: 5,
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
      pointRadius: 5,
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
      pointRadius: 5,
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
      pointRadius: 5,
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

  constructor() {}

  ngOnInit() {}
}
