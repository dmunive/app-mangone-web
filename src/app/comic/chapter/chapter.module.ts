import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateChapterComponent } from './create-chapter/create-chapter.component';
import { EditChapterComponent } from './edit-chapter/edit-chapter.component';
import { ListChapterComponent } from './list-chapter/list-chapter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { PageModule } from './page/page.module';
import { ChapterRouterModule } from './chapter-router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChapterRouterModule,
    MaterialModule,
    SharedModule,
    PageModule
  ],
  declarations: [
    EditChapterComponent, 
    CreateChapterComponent, 
    ListChapterComponent
  ],
  providers: [
  ],
  exports: [
  ]
})
export class ChapterModule { }
