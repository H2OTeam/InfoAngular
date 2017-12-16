import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { SystemConstants } from './../common/system.constants';
import { AuthenService } from './authen.service';
import { NotificationService } from './notification.service';
import { UtilityService } from './utility.service';
import { Observable } from 'rxjs/Observable';
import { MessageContstants } from './../common/message.constants';
import { log } from 'util';

@Injectable()
export class DataService {

  private Bearer: string = 'Bearer ';
  constructor(private _http: Http, private _router: Router, private _authenService: AuthenService,
    private _notificationService: NotificationService, private _utilityService: UtilityService) {

  }
  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
    if (currentUser && currentUser.Token) {
      let headersA = new Headers({ 'Authorization': 'Bearer ' + currentUser.Token });
      headersA.append('content-Type', 'application/json; charset=utf-8');
      headersA.append('Accept', 'application/json');
      headersA.append("Access-Control-Allow-Origin", "*");
      headersA.append("Access-Control-Allow-Methods", "POST, GET, DELETE");
      headersA.append("Access-Control-Max-Age", "3600");
      headersA.append("Access-Control-Allow-Headers", "Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Client-Offset");
      // headersA.append('GET', 'POST', 'OPTIONS');

      return new RequestOptions({ headers: headersA });
    }
  }
  getEnumAsList(enumName: string) {
    let uri = 'static/GetEnumAsList?name=' + enumName
    return this._http.get(SystemConstants.BASE_API + uri, this.jwt()).map(this.extractData);
  }
  get(uri: string) {

    return this._http.get(SystemConstants.BASE_API + uri, this.jwt()).map(this.extractData);
  }
  post(uri: string, data?: any) {
    return this._http.post(SystemConstants.BASE_API + uri, data, this.jwt()).map(this.extractData);
  }
  put(uri: string, data?: any) {

    return this._http.put(SystemConstants.BASE_API + uri, data, this.jwt()).map(this.extractData);
  }

  deleteBase(uri: string) {

    return this._http.delete(SystemConstants.BASE_API + uri, this.jwt())
      .map(this.extractData);
  }

  delete(uri: string, key: string, id: string) {
    let urlFull: string = uri + "/?" + key + "=" + id;
    return this.deleteBase(urlFull);
  }
  deleteWithMultiParams(uri: string, params) {
    var paramStr: string = '';
    for (let param in params) {
      paramStr += param + "=" + params[param] + '&';
    }
    return this._http.delete(SystemConstants.BASE_API + uri + "/?" + paramStr, this.jwt())
      .map(this.extractData);

  }
  postFile(uri: string, data?: any) {
    let newHeader = new Headers();
    let currentUser = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
    newHeader.append("Authorization", this.Bearer + currentUser.Token);   
    return this._http.post(SystemConstants.BASE_API + uri, data, { headers: newHeader })
      .map(this.extractData);
  }
  private extractData(res: Response) { 
    var result = res.json(); 
    if (result.isSuccess == false) {
      console.log(result.errorMessages)
      this._notificationService.printErrorMessage(result.errorMessages);
    }
    let body = result.dataItem;
    return body || {};
  }
  public handleError(error: any) {
    if (error.status == 401) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notificationService.printErrorMessage(MessageContstants.LOGIN_AGAIN_MSG);
      this._utilityService.navigateToLogin();
    }
    else if (error.status == 403) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notificationService.printErrorMessage(MessageContstants.FORBIDDEN);
      this._utilityService.navigateToLogin();
    }
    else if (error.status == 400) { 
      this._notificationService.printErrorMessage(MessageContstants.BADREQUEST+". Chi tiết:"+JSON.parse(error._body).errorMessages);
    }
    else { 
      let errMsg = JSON.parse(error._body).errorMessages; 
      this._notificationService.printErrorMessage(errMsg); 
      return Observable.throw(errMsg);
    }
  }
}
