import { Routes } from '@angular/router';
export const appRoutes: Routes = [
   //localhost:4200
   { path: '', redirectTo: 'home', pathMatch: 'full' },

   //localhost:4200/main
   { path: 'home', loadChildren: './main/main.module#MainModule'}, 
   
   { path: 'content/:id', loadChildren: './news-detail/news-detail.module#NewsDetailModule'}, 
   { path: 'services/:id', loadChildren: './services-detail/services-detail.module#ServicesDetailModule'}, 
];