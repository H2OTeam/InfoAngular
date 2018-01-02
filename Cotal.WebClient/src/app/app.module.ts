import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from "./core/guards/auth.guard";
import { HttpModule } from "@angular/http"; 
import { FormsModule } from "@angular/forms"; 
import { UtilityService } from "./core/services/utility.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [UtilityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
