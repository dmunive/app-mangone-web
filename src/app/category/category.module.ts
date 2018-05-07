import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { CategoryRouterModule } from './category-router.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CrudService } from '../core/services/crud.service';
import { ToastyModule } from 'ng2-toasty';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoryRouterModule,
    MaterialModule,
    SharedModule,
    ToastyModule.forRoot()
  ],
  declarations: [
    EditCategoryComponent, 
    CreateCategoryComponent, 
    ListCategoryComponent
  ],
  providers: [
  ],
  exports: [
    CategoryRouterModule
  ]
})
export class CategoryModule { }
