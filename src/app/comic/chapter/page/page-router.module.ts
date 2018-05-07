import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPageComponent } from './list-page/list-page.component';

const routes: Routes = [
    { path: "comics/:comicId/chapters/:chapterId/pages", component: ListPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class PageRouterModule { }