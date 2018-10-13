import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class BNCCFKeyService {
  private ID = "6444af056c954e3cb22c153cf534483d"
  private SECRET = "9269MvvF4zWDg63x6xHlcEODPeZcoomH";

  private token: String;

  constructor(private http: HttpClient) {

  }

  public getToken(): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': btoa(`${this.ID}:${this.SECRET}`)
      })
    };
    const httpBody = {
      grant_type: "client_credentials"
    };
    return this.http.post("https://eu.battle.net/oauth/token", httpBody, httpOptions)
  }
}
