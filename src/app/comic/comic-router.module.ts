import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComicComponent } from './list-comic/list-comic.component';
import { EditComicComponent } from './edit-comic/edit-comic.component';
import { CreateComicComponent } from './create-comic/create-comic.component';
import { AuthenticationGuard } from '../core/guard/authentication.guard';

const routes: Routes = [
    { path: "comics", component: ListComicComponent, canActivate: [AuthenticationGuard]},
    { path: "comics/create", component: CreateComicComponent, canActivate: [AuthenticationGuard]},
    { path: "comics/update/:id", component: EditComicComponent, canActivate: [AuthenticationGuard]}
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
export class ComicRouterModule { }