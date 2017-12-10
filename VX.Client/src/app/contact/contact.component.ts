import { Router } from '@angular/router';
import { AuthenService } from './../core/services/authen.service';
import { UtilityService } from './../core/services/utility.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private utilityService: UtilityService, private authenService: AuthenService,
    private router: Router) { }

  ngOnInit() {
  }

}
