import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SliderComponent } from "./slider/slider.component";
import { HomeServiceComponent } from './home-service/home-service.component';
import { HomeNewComponent } from './home-new/home-new.component';
import { PartnerModule } from "../shareds/partner/partner.module";
import { UtilityService } from "../core/services/utility.service";
import { DataService } from "../core/services/data.service";
import { ModalModule } from 'ngx-bootstrap';
import { HeaderComponent } from '../shareds/header/header.component';
import { FooterComponent } from '../shareds/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    PartnerModule,
    ModalModule.forRoot() 
  ], 
  providers: [DataService],
  declarations: [
    HomeComponent,
    SliderComponent,
     HomeServiceComponent, 
     HomeNewComponent,
     HeaderComponent,
     FooterComponent
  ], 
  exports: [  
    HomeComponent,
    SliderComponent,
     HomeServiceComponent, 
     HomeNewComponent,
     HeaderComponent,
     FooterComponent
  ],
  entryComponents: [ ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
