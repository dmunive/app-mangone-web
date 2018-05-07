import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, Injector } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { AppicationErrorHandler } from './core/handlers/application-error.handler';
import { CategoryModule } from './category/category.module';
import { ComicModule } from './comic/comic.module';
import { MaterialModule } from './material/material.module';
import { ToastyModule } from 'ng2-toasty';
import { LoginModule } from './login/login.module';
import { ApplicationTokenInterceptor } from './core/interceptor/application-token.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    CoreModule,
    LoginModule,
    UserModule,
    CategoryModule,
    ComicModule,
    SharedModule,
    ToastyModule.forRoot()
  ],
  providers: [
    {
      provide: ErrorHandler, 
      useClass: AppicationErrorHandler
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: ApplicationTokenInterceptor, 
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
