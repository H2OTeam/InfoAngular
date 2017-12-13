import { DataService } from './../core/services/data.service';
import { Component, OnInit } from '@angular/core';
//import { SystemConstants } from '../core/common/system.constants';
import { UrlConstants } from '../core/common/url.constants';
import { UtilityService } from '../core/services/utility.service';
//import { AuthenService } from '../core/services/authen.service';
//import { LoggedInUser } from '../core/domain/loggedin.user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post-news',
  templateUrl: './post-news.component.html',
  styleUrls: ['./post-news.component.css']
})
export class PostNewsComponent implements OnInit {
  // Variable
  public posts: any[];

  constructor(private utilityService: UtilityService, private _dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.loadTopPosts();
  }

  // implement
  private loadTopPosts() {
    this._dataService.getNotAuth('Posts/GetTop/6').subscribe((response: any[]) => {
      this.posts = response;
    }, error => this._dataService.handleError(error));
  }
}
