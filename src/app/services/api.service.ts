import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import {Pitcher} from '../models/Pitcher';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
   }

   getAllPictherData(): Observable<any[]>{
     return this.http.get<any[]>('http://localhost:3000/pitchers');
   }

   getPitcherById(pitcherID): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/pitchers/' + pitcherID);
   }
   
   getSessionsById(pitcherId): Observable<any[]> {
     return this.http.get<any[]>('http://localhost:3000/sessions/' + pitcherId);
   }


}
