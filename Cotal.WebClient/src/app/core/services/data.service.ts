﻿import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { SystemConstants } from './../common/system.constants';
import { AuthenService } from './authen.service';
import { NotificationService } from './notification.service';
import { UtilityService } from './utility.service';
import { Observable } from 'rxjs/Observable';
import { MessageContstants } from './../common/message.constants';

@Injectable()
export class DataService {

  private Bearer: string = 'Bearer ';
  constructor(private _http: Http, private _router: Router, private _authenService: AuthenService,
    private _utilityService: UtilityService,private notificationService:NotificationService) {

  }
  private jwt() {

    let headersA = new Headers({ 'content-Type': 'application/json; charset=utf-8' });
    headersA.append('Accept', 'application/json'); 
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
    if (currentUser && currentUser.access_token) {
      headersA.append('Authorization', this.Bearer + currentUser.access_token);
    }
    return new RequestOptions({ headers: headersA });
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
  delete(uri: string, key: string, id: string) {
    return this._http.delete(SystemConstants.BASE_API + uri + "/?" + key + "=" + id, this.jwt())
      .map(this.extractData);
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
    if (currentUser && currentUser.access_token) {
      newHeader.append("Authorization", this.Bearer + currentUser.access_token);
    }
    return this._http.post(SystemConstants.BASE_API + uri, data, { headers: newHeader })
      .map(this.extractData);
  }
  private extractData(res: Response) {
    //console.log(res);
    var result = res.json(); 
    if (result.isSuccess == false) { 
      this.notificationService.printErrorMessage(result.errorMessages);
    }
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
      return Observable.throw(errMsg);
    }
  }
}
