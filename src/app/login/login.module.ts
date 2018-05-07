import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoginRouterModule } from './login-router.module';
import { FormLoginComponent } from './form/form-login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRouterModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [
    FormLoginComponent
  ],
  providers: [
  ],
  exports: [
    LoginRouterModule
  ]
})
export class LoginModule { }
