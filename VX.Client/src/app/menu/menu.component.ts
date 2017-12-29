import { DataService } from './../core/services/data.service';
import { Component, OnInit, Input } from '@angular/core';
import { UrlConstants } from '../core/common/url.constants';
import { UtilityService } from '../core/services/utility.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  // Variable
  @Input() listService: any[];

  constructor(private utilityService: UtilityService, private _dataService: DataService, private router: Router) { }

  ngOnInit() {
  }

}
