import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { ApiService } from 'src/app/services/api.service';
import { Pitcher } from 'src/app/models/Pitcher';



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

  constructor(private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.curPlayerID = params['id'];
    });

    this.apiService.getPitcherById(this.curPlayerID).subscribe(data => {
      // console.log(data);
      let pitcher = new Pitcher(data['player_name'], data['handedness'], data['_id'], data['height'], data['dob']);
      this.createPitcher(pitcher);
    })
    
    this.apiService.getSessionsById(this.curPlayerID).subscribe(data => {
      console.log('sessions: ', data);
      this.sessions = data;
    })
    console.log(this.sessions);
    this.curUser = this.userService.getUserData();
  }

  createPitcher(pitcher: Pitcher) {
    this.currentPitcher = pitcher;
  }
}
