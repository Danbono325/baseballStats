import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserAgentApplication } from "msal";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  //d65eed6d-9372-4e9b-bdc4-25d64ef67a0c
  //d65eed6d-9372-4e9b-bdc4-25d64ef67a0c

  userData;
  userAgentApplication;

  constructor(private router: Router, private userService: UserService) {
    const msalConfig = {
      auth: {
        clientId: "d65eed6d-9372-4e9b-bdc4-25d64ef67a0c",
        authority:
          "https://login.microsoftonline.com/d398fb56-1bf0-4c4a-9221-4d138fa72653"
      }
    };

    this.userAgentApplication = new UserAgentApplication(msalConfig);
    this.userService.userAgent = this.userAgentApplication;
  }

  ngOnInit() {}

  public tokenReceivedCallback(errorDesc, token, error, tokenType) {
    if (token) {
      this.userData = token;

      console.log("Token: " + token);
    } else {
      console.log(error + ":" + errorDesc);
    }
  }

  public microsoftSignIn() {
    let that = this;
    var loginRequest = {
      scopes: ["user.read", "mail.send", "profile"] // optional Array<string>
    };

    that.userAgentApplication.loginPopup(loginRequest).then(
      function(idToken) {
        //Login Success
        that.userAgentApplication.acquireTokenSilent(loginRequest).then(
          function(access_token) {
            console.log(access_token);

            //AcquireTokenSilent Success
            var headers = new Headers();
            var bearer = "Bearer " + access_token.accessToken;
            headers.append("Authorization", bearer);
            var options = {
              method: "GET",
              headers: headers
            };
            // console.log(access_token)
            var graphEndpoint = "https://graph.microsoft.com/v1.0/me";

            fetch(graphEndpoint, options).then(response => {
              response.json().then(function(data) {
                that.userData = data;
                that.userService.setUserData(data);
                console.log(data);
                that.router.navigate(["overview"]);
              });
            });
          },
          function(error) {
            //AcquireTokenSilent Failure, send an interactive request.
            that.userAgentApplication.acquireTokenPopup(loginRequest).then(
              function(access_token) {
                //updateUI();
              },
              function(error) {
                console.log(error);
              }
            );
          }
        );
      },
      function(error) {
        //login failure
        console.log(error);
      }
    );
  }

  // login() {
  //   this.router.navigate(["overview"]);
  // }
}
