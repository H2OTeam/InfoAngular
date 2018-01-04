import { Component, OnInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { SystemConstants } from "../../core/common/system.constants";
import { DataService } from "../../core/services/data.service";
import { ModalDirective } from "ngx-bootstrap";

@Component({
  selector: 'app-home-service',
  templateUrl: './home-service.component.html',
  styleUrls: ['./home-service.component.css']
})
export class HomeServiceComponent implements OnInit {
  @ViewChild('detailShownModal') public detailShownModal: ModalDirective;
  public isModalShown: boolean = false; 
  public entity: any = {};
  public baseFolder: string = SystemConstants.BASE_API;

  @Input() listServices: any[];
  constructor(private _dataService: DataService) { }
  ngOnInit() {
      
  } 
  public showModal(id: any): void {
    this.entity = this.listServices.filter(s => s.id == id)[0]; 
    this.detailShownModal.show();
  }

  public hideModal(): void {
    this.detailShownModal.hide();
  }
}
