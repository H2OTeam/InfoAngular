import { AuthenService } from './../core/services/authen.service';
import { UtilityService } from './../core/services/utility.service';
import { ContactComponent } from './contact.component';
import { contactRoutes } from './contact.routes';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(contactRoutes)
  ],
  declarations: [ContactComponent],
  providers: [UtilityService, AuthenService]
})
export class ContactModule { }
