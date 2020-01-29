import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import {Pitcher} from '../models/Pitcher';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiHost = 'https://hawksbaseballpitchplus.csse-projects.monmouth.edu:3000';

  constructor(private http: HttpClient) {
   }

   getAllPictherData(): Observable<any[]>{
     return this.http.get<any[]>(this.apiHost + '/pitchers');
   }

   getPitcherById(pitcherID): Observable<any[]> {
    return this.http.get<any[]>(this.apiHost + '/pitchers/' + pitcherID);
   }
   
   getSessionsById(pitcherId): Observable<any[]> {
     return this.http.get<any[]>(this.apiHost + '/sessions/' + pitcherId);
   }

   getAvgMaxByPT(sessionID, pitchType): Observable<any[]> {
     return this.http.get<any[]>(this.apiHost + "/sessions/" + sessionID + "/" + pitchType);
   }


}
