import { DataService } from './../core/services/data.service';
import { Component, OnInit } from '@angular/core';
import { UrlConstants } from '../core/common/url.constants';
import { UtilityService } from '../core/services/utility.service';
import { Router } from '@angular/router';
import { SystemConstants } from 'app/core/common/system.constants';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideComponent implements OnInit {
  // Variable
  public items: any[]; 
  public baseFolder: string = SystemConstants.BASE_API;

  
    constructor(private utilityService: UtilityService, private _dataService: DataService, private router: Router) { }
  
    ngOnInit() {
      this.loadSlider(); 
    }
  
    // implement
    private loadSlider() {
      this._dataService.getNotAuth('slider/GetTop/10').subscribe((response: any[]) => {
         this.items = response; 
      }, error => this._dataService.handleError(error));
    }
    prev() {
      let owl = $('#owl-main-slider');
      owl.trigger('prev.owl.carousel');
    }
    next() {
      let owl = $('#owl-main-slider');
      owl.trigger('next.owl.carousel');
    }
  }
  