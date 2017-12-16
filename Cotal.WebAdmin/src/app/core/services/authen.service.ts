import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { SystemConstants } from "../common/system.constants";
import { LoggedInUser } from "../models/LoggedInUser";
import { log } from 'util';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';  

@Injectable() 

export class AuthenService {
  constructor(private _http: Http) {
  }
   
  login(userName: string, password: string) {

    let headers = new Headers();
    headers.append("Content-Type", "application/json-patch+json");
    headers.append("Accept", "application/json");
    let options = new RequestOptions({ headers: headers });
    let url = SystemConstants.BASE_API + 'security/login';
    let body = {
      "username": userName,
      "password": password
    };

    return this._http.post(url, body, options).map((response: Response) => {

      var token = response.json().dataItem;
      let jwtHelper: JwtHelper = new JwtHelper(); 
      var tockentData= jwtHelper.decodeToken(token);
      let userData = JSON.parse(tockentData.CURENT_USER); 
      let user = new LoggedInUser(token, userData.UserName,
          userData.FullName, userData.Email, userData.Avatar, userData.Permissions, userData.IsAdmin);
          console.log(user);
        if (user && user.Token) {
          localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));
        }  

    });
  }
  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
  }
  isUserAuthenticated(): boolean {
    let user = localStorage.getItem(SystemConstants.CURRENT_USER);
    if (user != null) {
      return true;
    }
    else
      return false;
  }
  getLoggedInUser(): LoggedInUser {
    let user: LoggedInUser;
    if (this.isUserAuthenticated()) {
      var userData = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
      user = new LoggedInUser(userData.token, userData.UserName,
        userData.FullName, userData.Email, userData.Avatar, userData.Permissions, userData.IsAdmin);
    }
    else
      user = null;
    return user;
  }
  checkAccess(functionId: string) {
    var user = this.getLoggedInUser();
    var result: boolean = false;
    var permission: any[] = JSON.parse(user.Permissions);
    var hasPermission: number = permission.findIndex(x => x.functionId == functionId && x.CanRead == true);
    if (hasPermission != -1 || user.IsAdmin) {
      return true;
    }
    else
      return false;
  }
  hasPermission(functionId: string, action: string): boolean {
    var user = this.getLoggedInUser(); 
    if (user.IsAdmin)
      return true;

    var result: boolean = false;
    var permission: any[] = [];
    if (user.Permissions) {
      permission = user.Permissions;
    }

    switch (action) {
      case 'create':
        var hasPermission: number = permission.findIndex(x => x.functionId == functionId && x.CanCreate == true);
        if (hasPermission != -1 || user.IsAdmin)
          result = true;
        break;
      case 'update':
        var hasPermission: number = permission.findIndex(x => x.functionId == functionId && x.CanUpdate == true);
        if (hasPermission != -1 || user.IsAdmin)
          result = true;
        break;
      case 'delete':
        var hasPermission: number = permission.findIndex(x => x.functionId == functionId && x.CanDelete == true);
        if (hasPermission != -1 || user.IsAdmin)
          result = true;
        break;
    }
    return result;
  }
}
