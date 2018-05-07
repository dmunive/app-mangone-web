import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComicComponent } from './edit-comic/edit-comic.component';
import { CreateComicComponent } from './create-comic/create-comic.component';
import { ListComicComponent } from './list-comic/list-comic.component';
import { ComicRouterModule } from './comic-router.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CrudService } from '../core/services/crud.service';
import { ChapterModule } from './chapter/chapter.module';
import { PageModule } from './chapter/page/page.module';
import { ChapterRouterModule } from './chapter/chapter-router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComicRouterModule,
    MaterialModule,
    SharedModule,
    ChapterModule
  ],
  declarations: [
    EditComicComponent, 
    CreateComicComponent, 
    ListComicComponent
  ],
  providers: [
  ],
  exports: [
  ]
})
export class ComicModule { }
