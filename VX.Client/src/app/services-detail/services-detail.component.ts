import { DataService } from './../core/services/data.service';
import { Component, OnInit } from '@angular/core';
import { SystemConstants } from '../core/common/system.constants';
import { UrlConstants } from '../core/common/url.constants';
import { UtilityService } from '../core/services/utility.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-services-detail',
  templateUrl: './services-detail.component.html',
  styleUrls: ['./services-detail.component.css']
})
export class ServicesDetailComponent implements OnInit {
  constructor(private utilityService: UtilityService, private _dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) { }
  public item_services_detail: any;
  private sub: any;
  public baseFolder: string = SystemConstants.BASE_API;
  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((params: Params) => {

      let servicesdetail_id = params['id'];
      this.Get_services_Detail(servicesdetail_id);
    })

    //this.loadBusiness();
  }
  private Get_services_Detail(id) {
    this._dataService.getNotAuth('Businesses/'+id).subscribe((response: any[]) => {
      this.item_services_detail = response;
    }, error => this._dataService.handleError(error));
  }

}
