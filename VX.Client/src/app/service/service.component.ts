import { DataService } from './../core/services/data.service';
import { Component, OnInit } from '@angular/core';
//import { SystemConstants } from '../core/common/system.constants';
import { UrlConstants } from '../core/common/url.constants';
import { UtilityService } from '../core/services/utility.service';
//import { AuthenService } from '../core/services/authen.service';
//import { LoggedInUser } from '../core/domain/loggedin.user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-businesses-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  // Variable
  public listService: any[];

  constructor(private utilityService: UtilityService, private _dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.loadBusiness();
  }

  // implement
  private loadBusiness() {
    this._dataService.getNotAuth('Businesses').subscribe((response: any[]) => {
      this.listService = response;
      console.log(response);
    }, error => this._dataService.handleError(error));
  }
}
