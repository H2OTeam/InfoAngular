import { DataService } from './../core/services/data.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesDetailComponent } from './services-detail.component';
import { ServicesDetailRoutes } from './services-detail.routes';
import { RouterModule, Routes } from '@angular/router'
import { UtilityService } from '../core/services/utility.service';
import { AuthenService } from '../core/services/authen.service';
import { NotificationService } from 'app/core/services/notification.service';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';

//import { FooterComponent } from 'app/footer/footer.component';

@NgModule({
  imports: [
   // FooterComponent,
    CommonModule,
    RouterModule.forChild(ServicesDetailRoutes),
    Ng2CarouselamosModule
  ],
  declarations: [ServicesDetailComponent,
  // FooterComponent,  
  ],
  providers: [UtilityService, AuthenService, NotificationService, DataService],
  exports: [
  // FooterComponent,
  ],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServicesDetailModule { }
