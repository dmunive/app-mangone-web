import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUserComponent } from './list-user/list-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { AuthenticationGuard } from '../core/guard/authentication.guard';

const routes: Routes = [
    { path: "users", component: ListUserComponent, canActivate: [AuthenticationGuard]},
    { path: "users/create", component: CreateUserComponent, canActivate: [AuthenticationGuard]},
    { path: "users/update/:id", component: EditUserComponent, canActivate: [AuthenticationGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  providers: [
    AuthenticationGuard
  ],
  exports: [
    RouterModule
  ]
})
export class UserRouterModule { }