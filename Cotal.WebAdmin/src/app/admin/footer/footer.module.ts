import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterRoutingModule } from './footer-routing.module';
import { FooterComponent } from './footer.component';
import { FormsModule } from '@angular/forms';
import { SimpleTinyModule } from '../../shared/simple-tiny/simple-tiny.module';
import { UtilityService } from '../../core/services/utility.service';
import { DataService } from '../../core/services/data.service';
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FooterRoutingModule,
    FormsModule,
    SimpleTinyModule,
    ModalModule.forRoot()
  ], providers: [DataService, UtilityService],
  declarations: [FooterComponent]
})
export class FooterModule { }
