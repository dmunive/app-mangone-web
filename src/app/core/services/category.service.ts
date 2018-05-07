import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CrudService } from './crud.service';
import { ICategory } from '../models/i-category.model';

@Injectable()
export class CategoryService extends CrudService<ICategory, number>{

  static parentEndpoint: string = "";
  static endpoint: string = '/categories';

  constructor(
    public httpClient: HttpClient){
    super(httpClient, environment.apiAdminUrl, CategoryService.parentEndpoint, CategoryService.endpoint);
  }
  
}
