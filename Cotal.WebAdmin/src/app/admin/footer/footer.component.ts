import { Component, OnInit,ViewChild  } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { MessageContstants } from '../../core/common/message.constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private _dataService: DataService, private _notificationService: NotificationService) { }
  public entity: any;
  ngOnInit() {
    this.loadData();
  } 
  public keyupHandlerContentFunction(e: any) {
    this.entity.Content = e;
  }
  loadData(){
    this.entity = { aboutUs: '' };
    this._dataService.get('contacts/1').subscribe((response: any) => {
      this.entity = response; 
    }, error => this._dataService.handleError(error));
  }
  saveChanges(valid: boolean){
    if (valid) { 
      this._dataService.put('contacts/1', this.entity)
      .subscribe((response: any) => { 
        this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
      }, error => this._dataService.handleError(error));
    }

  }
}
