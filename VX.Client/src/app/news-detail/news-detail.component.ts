import { DataService } from './../core/services/data.service';
import { Component, OnInit } from '@angular/core';
import { SystemConstants } from '../core/common/system.constants';
import { UrlConstants } from '../core/common/url.constants';
import { UtilityService } from '../core/services/utility.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  constructor(private utilityService: UtilityService, private _dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) { }
  public item_news_detail: any;
  private sub: any;
  public baseFolder: string = SystemConstants.BASE_API;
  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((params: Params) => {

      let newsdetail_id = params['id'];
      this.Get_News_Detail(newsdetail_id);
    })

    //this.loadBusiness();
  }
  private Get_News_Detail(id) {
    this._dataService.getNotAuth('posts/'+id).subscribe((response: any[]) => {
      this.item_news_detail = response;
    }, error => this._dataService.handleError(error));
  }

}
