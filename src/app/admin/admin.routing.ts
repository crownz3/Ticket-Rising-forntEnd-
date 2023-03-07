import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const AdminRoutes: Routes = [
    // {path:'',component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(AdminRoutes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
