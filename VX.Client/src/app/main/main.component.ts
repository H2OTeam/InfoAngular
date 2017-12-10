import { DataService } from './../core/services/data.service';
import { Component, OnInit } from '@angular/core';
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
  // Variable
  public posts: any[];
  public listService: any[];
  public contact: object;

  constructor(private utilityService: UtilityService, private _dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.loadTopPosts();
    this.loadBusiness();
    this.loadContact();
  }

  // implement
  private loadTopPosts() {
    this._dataService.getNotAuth('/Posts/GetTop/6').subscribe((response: any[]) => {
      this.posts = response;
    }, error => this._dataService.handleError(error));
  }
  private loadBusiness() {
    this._dataService.getNotAuth('/Business').subscribe((response: any[]) => {
      this.listService = response;
    }, error => this._dataService.handleError(error));
  }
  private loadContact() {
    this._dataService.getNotAuth('/Contacts').subscribe((response: object) => {
      this.contact = response;
    }, error => this._dataService.handleError(error));
  }
  clickMenu() {
    $("#menu").toggleClass("active");
  }
}
