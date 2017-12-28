import { Component, OnInit } from '@angular/core';
import { SystemConstants } from "../../core/common/system.constants";
import { DataService } from "../../core/services/data.service";

@Component({
  selector: 'app-home-new',
  templateUrl: './home-new.component.html',
  styleUrls: ['./home-new.component.css']
})
export class HomeNewComponent implements OnInit {


  public postLeft: any;
  public postTop: any[];
  public postRight: any[];
  public baseFolder: string = SystemConstants.BASE_API;
  public imageLeft :string;
  public nameLeft :string;
  public createdByLeft :string;
  public createdDateLeft : any;

  constructor(private _dataService: DataService) { }
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this._dataService.get('posts/GetTop/6')
      .subscribe((response: any) => {
        this.postTop = response;
        this.postLeft = this.postTop[0];
        this.postRight = this.postTop.filter(p => p.Id != this.postLeft.Id);
        this.imageLeft = this.baseFolder + this.postLeft.imageUrl;
        this.createdDateLeft =   this.postLeft.createdDate;
        this.createdByLeft =   this.postLeft.createdBy;
        this.nameLeft =   this.postLeft.name; 
      }, error => this._dataService.handleError(error));
  }
   
} 
