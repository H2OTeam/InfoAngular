import { Routes } from '@angular/router';
export const appRoutes: Routes = [
   //localhost:4200
   { path: '', redirectTo: 'home', pathMatch: 'full' },

   //localhost:4200/main
   { path: 'home', loadChildren: './main/main.module#MainModule'}, 
];