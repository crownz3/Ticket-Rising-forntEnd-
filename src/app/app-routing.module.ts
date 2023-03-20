import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'admin', component:AdminComponent ,loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  {path:'user', component:UserComponent ,loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  {path:'',component:AppComponent},
  {path:'dashboard',component:DashboardComponent},

  {path:'**',component:AppComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
