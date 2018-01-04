import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
public listServices:any[];
  constructor(private _dataService: DataService) { }

  ngOnInit() { 
    this.loadData();
  }
  loadData() { 
    this._dataService.get('Businesses')
      .subscribe((response: any) => {
        this.listServices = response;  
      }, error => this._dataService.handleError(error));
  }
   
}
