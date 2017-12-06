import { Routes } from '@angular/router';
export const appRoutes: Routes = [
   //localhost:4200
   { path: '', redirectTo: 'home', pathMatch: 'full' },

   //localhost:4200/main
   { path: 'home', loadChildren: './main/main.module#MainModule'},

   //localhost:4200/contact
   { path: 'contact', loadChildren: './contact/contact.module#ContactModule'},

   //localhost:4200/service
   { path: 'service', loadChildren: './service/service.module#ServiceModule'}
];