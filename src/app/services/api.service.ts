import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { Pitcher } from "../models/Pitcher";

import { NgbDate, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  apiHost = 'https://hawksbaseballpitchplus.csse-projects.monmouth.edu:3000';

  singleSessionChartFiltered = false;
  singleSessionFiltered = [];
  singleSessionAVGFiltered = [];

  noneSelected = false;

  singleSessionPitchCheckbox = {};
  constructor(private http: HttpClient) { }

  callAdmin() {
    return this.http.get(this.apiHost+ "/adminpull");
  }
  
  getAllPictherData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiHost + "/pitchers");
  }

  getPitcherById(pitcherID): Observable<any[]> {
    return this.http.get<any[]>(this.apiHost + "/pitcher/" + pitcherID);
  }

  getSessionsById(pitcherId): Observable<any[]> {
    return this.http.get<any[]>(this.apiHost + "/sessions/all/" + pitcherId);
  }

  getAvgMaxByPT(sessionID, pitchType): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiHost + "/MaxAvg/one/" + sessionID + "/" + pitchType
    );
  }

  getAvgMax(pitcherId): Observable<any[]> {
    return this.http.get<any[]>(this.apiHost + "/MaxAvg/all/" + pitcherId);
  }

  getSessionData(sessionID): Observable<any[]> {
    return this.http.get<any[]>(this.apiHost + "/session/" + sessionID);
  }

  getChartData(pitcherId): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiHost + "/sessions/all/chartData/" + pitcherId
    );
  }

  getChartDataAvg(pitcherId): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiHost + "/sessions/all/chartDataAvg/" + pitcherId
    );
  }

  getChartDataSession(sessionID): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiHost + "/sessions/one/chartData/" + sessionID
    );
  }

  getChartDataSessionAvg(sessionID): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiHost + "/sessions/one/chartDataAvg/" + sessionID
    );
  }

  getFilteredData(
    sessionID, lowVelo, highVelo, lowTotalSpin, highTotalSpin, lowSpin,
    highSpin, lowVbreak, highVbreak, lowHbreak,
    highHbreak, lowRheight, highRheight, lowRside, highRside): Observable<any[]> {


    if (this.singleSessionChartFiltered) {
      this.singleSessionFiltered = [];
      this.singleSessionAVGFiltered = [];
      this.http.get<any[]>(
        this.apiHost + "/sessions/one/filter/" + sessionID + "/" + lowVelo + "/" +
        highVelo + "/" + lowTotalSpin + "/" + highTotalSpin + "/" + lowSpin + "/" + highSpin + "/" + lowVbreak + "/" + highVbreak + "/" +
        lowHbreak + "/" + highHbreak + "/" + lowRheight + "/" + highRheight + "/" + lowRside +
        "/" + highRside + "/").subscribe(data => {
          this.singleSessionFiltered = data;
        });

      this.http.get<any[]>(
        this.apiHost + "/sessions/one/avg/filter/" + sessionID + "/" + lowVelo + "/" +
        highVelo + "/" + lowTotalSpin + "/" + highTotalSpin + "/" + lowSpin + "/" + highSpin + "/" + lowVbreak + "/" + highVbreak + "/" +
        lowHbreak + "/" + highHbreak + "/" + lowRheight + "/" + highRheight + "/" + lowRside +
        "/" + highRside + "/").subscribe(data => {
          this.singleSessionAVGFiltered = data;
        });
    }
    return this.http.get<any[]>(
      this.apiHost + "/sessions/filter/" + sessionID + "/" + lowVelo + "/" +
      highVelo + "/" + lowTotalSpin + "/" + highTotalSpin + "/" + lowSpin + "/" + highSpin + "/" + lowVbreak + "/" + highVbreak + "/" +
      lowHbreak + "/" + highHbreak + "/" + lowRheight + "/" + highRheight + "/" + lowRside +
      "/" + highRside + "/");

  }

  getFilteredChartSingle() {
    return this.singleSessionFiltered;
  }

  getFilteredChartAVGSingle() {
    return this.singleSessionAVGFiltered;
  }

  filterSessionByDate(pitcherID, fromDate, toDate) {
    fromDate = fromDate.year + "-" + fromDate.month + "-" + fromDate.day;
    toDate = toDate.year + "-" + toDate.month + "-" + toDate.day;
    return this.http.get<any[]>(this.apiHost + "/sessions/date/" + pitcherID + "/" + fromDate + "/" + toDate + "/");
  }


  getLogs() {
    return this.http.get<any[]>(this.apiHost + "/admin/");
  }

  makeSingleSessionFiltered(sessionID, lowVelo, highVelo, lowTotalSpin, highTotalSpin, lowSpin,
    highSpin, lowVbreak, highVbreak, lowHbreak,
    highHbreak, lowRheight, highRheight, lowRside, highRside) {


    this.http.get<any[]>(this.apiHost + "/sessions/filter/" + sessionID + "/" + lowVelo + "/" +
      highVelo + "/" + lowTotalSpin + "/" + highTotalSpin + "/" + lowSpin + "/" + highSpin + "/" + lowVbreak + "/" + highVbreak + "/" +
      lowHbreak + "/" + highHbreak + "/" + lowRheight + "/" + highRheight + "/" + lowRside +
      "/" + highRside + "/");
  }
}
