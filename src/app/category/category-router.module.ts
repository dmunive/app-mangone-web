import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCategoryComponent } from './list-category/list-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { AuthenticationGuard } from '../core/guard/authentication.guard';

const routes: Routes = [
    { path: "categories", component: ListCategoryComponent, canActivate: [AuthenticationGuard]},
    { path: "categories/create", component: CreateCategoryComponent, canActivate: [AuthenticationGuard]},
    { path: "categories/update/:id", component: EditCategoryComponent, canActivate: [AuthenticationGuard]}
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
export class CategoryRouterModule { }