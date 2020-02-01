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
    localStorage.setItem("curUserData", JSON.stringify(data));
  }

  getUserData() {
    if (localStorage.getItem("curUserData") != null) {
      this.curUserData = JSON.parse(localStorage.getItem("curUserData"));
    }
    return this.curUserData.givenName;
  }

  logout() {
    this.userAgent.logout();
  }
}
