import { DataService } from './../core/services/data.service';
import { Component, OnInit } from '@angular/core';
import { UrlConstants } from '../core/common/url.constants';
import { UtilityService } from '../core/services/utility.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideComponent implements OnInit {
  // Variable
  public listSlide: any[];
  
    constructor(private utilityService: UtilityService, private _dataService: DataService, private router: Router) { }
  
    ngOnInit() {
      this.loadBusiness();
    }
  
    // implement
    private loadBusiness() {
      // this._dataService.getNotAuth('slider/GetTop/4').subscribe((response: any[]) => {
      //   this.listSlide = response;
      //   console.log(response);
      // }, error => this._dataService.handleError(error));
    }
  }
  