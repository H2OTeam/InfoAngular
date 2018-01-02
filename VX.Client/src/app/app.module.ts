import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AuthGuard } from './core/guards/auth.guard';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FooterComponent } from "app/footer/footer.component";
import { UtilityService } from "app/core/services/utility.service";
import { AuthenService } from "app/core/services/authen.service";
import { NotificationService } from "app/core/services/notification.service";
import { DataService } from "app/core/services/data.service";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    PaginationModule.forRoot()
  ],
  providers: [UtilityService, AuthenService, NotificationService, DataService],
  exports: [  
    FooterComponent
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
