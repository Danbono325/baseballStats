import { Injectable } from "@angular/core";
import { UserAgentApplication } from "msal";

@Injectable({
  providedIn: "root"
})
export class UserService {
  curUserData;

  userAgent;

  constructor() {}

  setUserData(data) {
    this.curUserData = data;
  }

  getUserData() {
    return this.curUserData;
  }

  logout() {
    this.userAgent.logout();
  }
}
