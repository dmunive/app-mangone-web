import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPageComponent, ShowImageDialog } from './list-page/list-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageRouterModule } from './page-router.module';
import { MaterialModule } from '../../../material/material.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PageRouterModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [
    ListPageComponent,
    ShowImageDialog
  ],
  providers: [
  ],
  exports: [
  ],
  entryComponents: [
    ShowImageDialog
  ]
})
export class PageModule { }
