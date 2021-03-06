import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataService } from "../../core/services/data.service";
import { NotificationService } from "../../core/services/notification.service";
import { UtilityService } from "../../core/services/utility.service";
import { MessageContstants } from "../../core/common/message.constants";
@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.css']
})
export class FunctionComponent implements OnInit {
  @ViewChild('addEditModal') public addEditModal: ModalDirective;
  @ViewChild('permissionModal') public permissionModal: ModalDirective;
  @ViewChild(TreeComponent)
  private treeFunction: TreeComponent;

  public _functionHierachy: any[];
  public _functions: any[];
  public entity: any;
  public editFlag: boolean;
  public filter: string = '';
  public functionId: string;
  public _permission: any[];
  public _funstiontypes: any[];

  constructor(private _dataService: DataService,
    private notificationService: NotificationService,
    private utilityService: UtilityService) { }

  ngOnInit() {
    this.search();
  }
  loadFuntionType() {
    this._dataService.getEnumAsList("FunctionType").subscribe((response: any[]) => {
      this._funstiontypes = response; 
    }, error => this._dataService.handleError(error));
  }
  public showPermission(id: any) {
    this._dataService.get('permission/' + id).subscribe((response: any[]) => {
      this.functionId = id;
      this._permission = response;
      this.permissionModal.show();
    }, error => this._dataService.handleError(error));

  }

  public savePermission(valid: boolean, _permission: any[]) {
    if (valid) { 
      this._dataService.post('permission/'+ this.functionId,  this._permission).subscribe((response: any) => {
        this.notificationService.printSuccessMessage(response);
        this.permissionModal.hide();
      }, error => this._dataService.handleError(error));
    }
  }
  //Show add form
  public showAddModal() {
    this.entity = {};
    this.entity.parent = {};
    this.loadFuntionType();
    this.addEditModal.show();
    this.editFlag = false;
  }
  //Load data
  public search() {
    this._dataService.get('functions?filter=' + this.filter)
      .subscribe((response: any[]) => {
        this._functions = response.filter(x => x.parent == null);
        this._functionHierachy = this.utilityService.Unflatten(response); 
      }, error => this._dataService.handleError(error));
  }

  //Save change for modal popup
  public saveChanges(valid: boolean) {
    if (valid) {
      if (this.editFlag == false) {
        this._dataService.post('functions', this.entity).subscribe((response: any) => {
          this.search();
          this.addEditModal.hide();
          this.notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        }, error => this._dataService.handleError(error));
      }
      else {
        this._dataService.put('functions/'+this.entity.id, this.entity).subscribe((response: any) => {
          this.search();
          this.addEditModal.hide();
          this.notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
        }, error => this._dataService.handleError(error));

      }
    }

  }
  //Show edit form
  public showEdit(id: string) { 
    this.loadFuntionType(); 
    this._dataService.get('functions/' + id).subscribe((response: any) => {
      this.entity = response;
      if(this.entity.parent===undefined||this.entity.parent===null)
       this.entity.parent={}
      this.editFlag = true;
      this.addEditModal.show();
    }, error => this._dataService.handleError(error));
  }

  //Action delete
  public deleteConfirm(id: string, children:any): void {
    let isParent:boolean = children!=null; 
    this._dataService.deleteBase('functions/'+ id+'/'+isParent).subscribe((response: any) => {
      this.notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.search();
    }, error => this._dataService.handleError(error));
  }
  //Click button delete turn on confirm
  public delete(id: string, children:any) {
    this.notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteConfirm(id,children));
  }
}
