import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BNCCFKeyService } from '../../services/BNCCFKeyService';

declare var window: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    private iab: InAppBrowser,
    private bnccfks: BNCCFKeyService) {

  }

  ngOnInit() {
    console.log("ASDASD")
    console.log("ASDASD")
    console.log("ASDASD")
    console.log("ASDASD")
    console.log("ASDASD")
    console.log("ASDASD")
    console.log("ASDASD")

  }

  public login() {
    this.bnccfks.getToken().subscribe((obj) => console.log("WE ARE", obj))
    return
  //   this.platform.ready().then(() => {

  //     this.battleNetLogin().then(success => {
  //         alert(success.access_token);
  //     }, (error) => {
  //       throw error;
  //       //   alert(error);
  //     });
  // });
  }

  public battleNetLogin(): Promise<any> {
    return new Promise((resolve, reject) => {
      var browserRef = this.iab.create(
          "https://eu.battle.net/oauth/authorize"
            + "?client_id=6444af056c954e3cb22c153cf534483d"
            + "&redirect_uri=http://localhost/callback"
            + "&response_type=code"
            + "&scope=wow.profile"
            + "&state=roflmao",
          "_blank",
          "location=no,clearsessioncache=yes,clearcache=yes"
        );

      let exitEvent = browserRef.on("exit").subscribe((event) => {
          reject("The Facebook sign in flow was canceled");
      });
      browserRef.on("loadstart").subscribe((event) => {
          if ((event.url).indexOf("http://localhost/callback") === 0) {
              exitEvent.remove(exitEvent)
              browserRef.close();
              var responseParameters = ((event.url).split("#")[1]).split("&");
              var parsedResponse = {};
              for (var i = 0; i < responseParameters.length; i++) {
                  parsedResponse[responseParameters[i].split("=")[0]] =
                  responseParameters[i].split("=")[1];
              }
              if (parsedResponse["access_token"] !== undefined && parsedResponse["access_token"] !== null) {
                  resolve(parsedResponse);
              } else {
                  reject("Problem authenticating with Facebook");
              }
          }
      });
  });
  }

}
