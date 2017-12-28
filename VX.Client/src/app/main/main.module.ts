import { DataService } from './../core/services/data.service';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { mainRoutes } from './main.routes';
import { RouterModule, Routes } from '@angular/router'
import { UtilityService } from '../core/services/utility.service';
import { AuthenService } from '../core/services/authen.service';
import { NotificationService } from 'app/core/services/notification.service';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';

import { PostNewsComponent } from 'app/post-news/post-news.component';
import { ServiceComponent } from 'app/service/service.component';
import { MenuComponent } from 'app/menu/menu.component';
import { SlideComponent } from 'app/slide-show/slide-show.component';
import { FooterComponent } from 'app/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(mainRoutes),
    Ng2CarouselamosModule
  ],
  declarations: [MainComponent,
    PostNewsComponent,
    ServiceComponent,
    MenuComponent,
    SlideComponent,
    FooterComponent
  ],
  providers: [UtilityService, AuthenService, NotificationService, DataService],
  exports: [  
    PostNewsComponent,
    ServiceComponent,
    MenuComponent,
    SlideComponent,
    FooterComponent
  ],
  entryComponents: [ ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MainModule { }
