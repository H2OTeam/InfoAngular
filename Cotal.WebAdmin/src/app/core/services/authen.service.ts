import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';  
import { Observable } from 'rxjs/Observable';
import { SystemConstants } from "../common/system.constants";
import { LoggedInUser } from "../models/LoggedInUser";

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
    let body ={
      "username":userName,
      "password":password
    } ;

    return this._http.post(url, body, options).map((response: Response) => {
      
      var userData = response.json().dataItem;
      let user=new LoggedInUser(userData.token, userData.UserName,
        userData.FullName, userData.Email, userData.Avatar, userData.Permissions);

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
        userData.FullName, userData.Email, userData.Avatar, userData.Permissions);
    }
    else
      user = null;
    return user;
  }
  checkAccess(functionId: string) {
    var user = this.getLoggedInUser();
    var result: boolean = false;
    var permission: any[] = JSON.parse(user.Permissions); 
    var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanRead == true);
    if (hasPermission != -1 || user.IsAdmin) {
      return true;
    }
    else
      return false;
  }
  hasPermission(functionId: string, action: string): boolean {
    var user = this.getLoggedInUser();
    var result: boolean = false;
    var permission: any[] = [];
    if (user.Permissions) {
      user.Permissions = JSON.parse(user.Permissions);
    } 
    switch (action) {
      case 'create':
        var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanCreate == true);
        if (hasPermission != -1 || user.IsAdmin)
          result = true;
        break;
      case 'update':
        var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanUpdate == true);
        if (hasPermission != -1 || user.IsAdmin)
          result = true;
        break;
      case 'delete':
        var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanDelete == true);
        if (hasPermission != -1 || user.IsAdmin)
          result = true;
        break;
    }
    return result;
  }
}
