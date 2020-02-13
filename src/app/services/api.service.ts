import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Pitcher } from "../models/Pitcher";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  apiHost = 'https://hawksbaseballpitchplus.csse-projects.monmouth.edu:3000';
  // apiHost = "https://localhost:3000";

  constructor(private http: HttpClient) {}

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
}
