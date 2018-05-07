import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationModule } from './navigation/navigation.module';
import { MaterialModule } from '../material/material.module';
import { UserService } from './services/user.service';
import { CatalogService } from './services/catalog.service';
import { CategoryService } from './services/category.service';
import { ComicService } from './services/comic.service';
import { ToastyModule } from 'ng2-toasty';
import { ChapterService } from './services/chapter.service';
import { PageService } from './services/page.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationGuard } from './guard/authentication.guard';

@NgModule({
  imports: [
    CommonModule,
    NavigationModule
  ],
  providers: [
    AuthenticationService,
    CatalogService,
    UserService,
    CategoryService,
    ComicService,
    ChapterService,
    PageService
  ],
  exports: [
    NavigationModule
  ]
})
export class CoreModule { }
