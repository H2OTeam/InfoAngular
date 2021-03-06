import { DataService } from './../core/services/data.service';
import { Component, OnInit, transition } from '@angular/core';
import { SystemConstants } from '../core/common/system.constants';
import { UrlConstants } from '../core/common/url.constants';
import { UtilityService } from '../core/services/utility.service';
import { AuthenService } from '../core/services/authen.service';
import { LoggedInUser } from '../core/domain/loggedin.user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(private utilityService: UtilityService, private _dataService: DataService, private router: Router) { }
  public listService: any[];

  ngOnInit() {
    this.loadBusiness();
  }
  private loadBusiness() {
    this._dataService.getNotAuth('Businesses').subscribe((response: any[]) => {
      this.listService = response;
    }, error => this._dataService.handleError(error));
  }
}
