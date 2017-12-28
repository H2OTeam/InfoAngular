import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
//import { ModalDirective } from 'ngx-bootstrap/modal';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgForm } from "@angular/forms";
import { SystemConstants } from '../../core/common/system.constants';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { AuthenService } from '../../core/services/authen.service';
import { UploadService } from '../../core/services/upload.service';
import { MessageContstants } from '../../core/common/message.constants';
import { LowerCasePipe } from '@angular/common/src/pipes';
import { NGSP_UNICODE } from '@angular/compiler';
import { Console } from '@angular/core/src/console';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;
  @ViewChild('avatar') avatar;
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public users: any[];
  public entity: any;
  public baseFolder: string = SystemConstants.BASE_API;
  public showDatepicker: boolean = false;
  @Output() dateModelChange: EventEmitter<string> = new EventEmitter();
  public dateOptions: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    singleDatePicker: true
  };
  constructor(private _dataService: DataService,
    private _notificationService: NotificationService,
    private _utilityService: UtilityService,
    public _authenService: AuthenService,
    private _uploadService: UploadService
  ) {

    // if (_authenService.checkAccess('USER') == false) {
    //   _utilityService.navigateToLogin();
    // }
  }
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this._dataService.get('users/' + this.pageIndex + '/' + this.pageSize + '?filter=' + this.filter)
      .subscribe((response: any) => {
        this.users = response.data;
        this.pageIndex = response.pageNumber;
        this.totalRow = response.totalEntityCount;
      });
  }

  public pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }
  showAddModal() {
    this.entity = {};
    this.modalAddEdit.show();
  }
  showEditModal(id: any) {
    this.loadUserDetail(id);
    this.modalAddEdit.show();
  }
  loadUserDetail(id: any) {
    this._dataService.get('users/' + id)
      .subscribe((response: any) => {
        this.entity = response;
        // for (let role of this.entity.Roles) {
        //   this.myRoles.push(role);
        // }
        this.entity.birthDay = moment(new Date(this.entity.birthDay)).format('DD/MM/YYYY');
      });
  }
  saveChange(form: NgForm) {
    if (form.valid) {
      //  this.entity.Roles = this.myRoles;
      if (this.entity.birthDay)
        this.entity.birthDay = new Date(this.entity.birthDay)
      let fi = this.avatar.nativeElement;
      if (fi.files.length > 0) {
        this._uploadService.postWithFile('avatar', null, fi.files)
          .then((imageUrl: string) => {
            this.entity.avatar = imageUrl;
          }).then(() => {
            this.saveData(form);
          });
      }
      else {
        this.saveData(form);
      }
    }
  }
  private saveData(form: NgForm) {
    if (this.entity.id == undefined) {
      this.entity.isActive = true;
      console.log(JSON.stringify(this.entity));
      this._dataService.post('users', this.entity)
        .subscribe((response: any) => {
          this.loadData();
          this.modalAddEdit.hide();
          form.resetForm();
          this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        }, error => this._dataService.handleError(error));
    }
    else {
      this._dataService.put('users/' + this.entity.id, this.entity)
        .subscribe((response: any) => {
          this.loadData();
          this.modalAddEdit.hide();
          form.resetForm();
          this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
        }, error => this._dataService.handleError(error));
    }
  }
  deleteItem(id: any) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteItemConfirm(id));
  }
  deleteItemConfirm(id: any) {
    this._dataService.deleteBase('users/' + id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.loadData();
    });
  }
  public selectGender(event) {
    this.entity.gender = event.target.value
  }

  public selectedDate(value: any) {
    this.entity.birthDay = moment(value.end._d).format('DD/MM/YYYY');
  }
}
