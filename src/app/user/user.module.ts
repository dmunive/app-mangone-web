import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserComponent } from './edit-user/edit-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { UserRouterModule } from './user-router.module';
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
    UserRouterModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [
    EditUserComponent, 
    CreateUserComponent, 
    ListUserComponent
  ],
  providers: [
  ],
  exports: [
    UserRouterModule
  ]
})
export class UserModule { }
