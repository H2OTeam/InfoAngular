import { AuthenService } from './../core/services/authen.service';
import { UtilityService } from './../core/services/utility.service';
import { ServiceComponent } from './service.component';
import { serviceRoutes } from './service.routes';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(serviceRoutes)
  ],
  declarations: [ServiceComponent],
  providers: [UtilityService, AuthenService]
})
export class ServiceModule { }
