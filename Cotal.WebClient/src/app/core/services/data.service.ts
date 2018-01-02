import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { SystemConstants } from './../common/system.constants'; 
import { UtilityService } from './utility.service';
import { Observable } from 'rxjs/Observable';
import { MessageContstants } from './../common/message.constants';

@Injectable()
export class DataService {

  private Bearer: string = 'Bearer ';
  constructor(private _http: Http, private _router: Router ,
    private _utilityService: UtilityService ) {

  }
  private jwt() {

    let headersA = new Headers({ 'content-Type': 'application/json; charset=utf-8' });
    headersA.append('Accept', 'application/json');  
    let currentUser = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
    if (currentUser && currentUser.access_token) {
      headersA.append('Authorization', this.Bearer + currentUser.access_token);
    }
    return new RequestOptions({ headers: headersA });
  }
  get(uri: string) { 
    return this._http.get(SystemConstants.BASE_API + uri, this.jwt()).map(this.extractData);
  } 
  private extractData(res: Response) { 
    var result = res.json();  
    let body = result.dataItem;
    return body || {};
  }
  public handleError(error: any) {
    if (error.status == 401) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      console.log(MessageContstants.LOGIN_AGAIN_MSG) 
    }
    else if (error.status == 403) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      console.log(MessageContstants.FORBIDDEN) 
    }
    else {
      let errMsg = JSON.parse(error._body).Message;  
      console.log(errMsg);
    }
  }
}
