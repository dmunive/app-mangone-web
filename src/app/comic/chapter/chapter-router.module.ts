import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditChapterComponent } from './edit-chapter/edit-chapter.component';
import { CreateChapterComponent } from './create-chapter/create-chapter.component';
import { ListChapterComponent } from './list-chapter/list-chapter.component';

const routes: Routes = [
    { path: "comics/:comicId/chapters", component: ListChapterComponent},
    { path: "comics/:comicId/chapters/create", component: CreateChapterComponent},
    { path: "comics/:comicId/chapters/update/:id", component: EditChapterComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class ChapterRouterModule { }