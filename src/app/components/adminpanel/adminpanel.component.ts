import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss']
})
export class AdminpanelComponent implements OnInit {

  logs;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getLogs().subscribe(data => {
      this.logs = data;
    })
  }

}
