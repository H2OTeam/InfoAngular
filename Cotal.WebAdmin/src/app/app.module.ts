import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from "./core/guards/auth.guard";
import { HttpModule, JsonpModule,Http, RequestOptions  } from "@angular/http";
import { FormsModule } from "@angular/forms";  
import { AuthHttp, AuthConfig } from 'angular2-jwt'; 

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
		tokenGetter: (() => sessionStorage.getItem('token')),
		globalHeaders: [{'Content-Type':'application/json'}],
	}), http, options);
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    HttpModule, 
    AppRoutingModule
  ],
  providers: [AuthGuard, AuthHttp,],
  bootstrap: [AppComponent]
})
export class AppModule { }
