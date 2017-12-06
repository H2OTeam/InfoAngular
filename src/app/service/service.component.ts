import { AuthenService } from './../core/services/authen.service';
import { UtilityService } from './../core/services/utility.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  constructor(private utilityService: UtilityService, private authenService: AuthenService,
    private router: Router) { }

  ngOnInit() {
  }

}
