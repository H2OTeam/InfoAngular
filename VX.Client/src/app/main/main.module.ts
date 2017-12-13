import { DataService } from './../core/services/data.service';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { mainRoutes } from './main.routes';
import { RouterModule, Routes } from '@angular/router'
import { UtilityService } from '../core/services/utility.service';
import { AuthenService } from '../core/services/authen.service';
import { NotificationService } from 'app/core/services/notification.service';


import { PostNewsComponent } from 'app/post-news/post-news.component';
import { ServiceComponent } from 'app/service/service.component';
import { MenuComponent } from 'app/menu/menu.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(mainRoutes)
  ],
  declarations: [MainComponent,
    PostNewsComponent,
    ServiceComponent,
    MenuComponent
  ],
  providers: [UtilityService, AuthenService, NotificationService, DataService],
  exports: [  
    PostNewsComponent,
    ServiceComponent,
    MenuComponent
  ],
  entryComponents: [ ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MainModule { }
