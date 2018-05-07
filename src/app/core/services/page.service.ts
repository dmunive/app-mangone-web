import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CrudService } from './crud.service';
import { IPage } from '../models/i-page.model';

@Injectable()
export class PageService extends CrudService<IPage, number>{

  static parentEndpoint: string = "/comics/:id/chapters/:id";
  static endpoint: string = '/pages';

  constructor(
    public httpClient: HttpClient){
    super(httpClient, environment.apiAdminUrl, PageService.parentEndpoint, PageService.endpoint);
  }
  
}
