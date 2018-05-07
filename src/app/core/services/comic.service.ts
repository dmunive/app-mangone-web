import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CrudService } from './crud.service';
import { IComic } from '../models/i-comic.model';

@Injectable()
export class ComicService extends CrudService<IComic, number>{

  static parentEndpoint: string = "";
  static endpoint: string = '/comics';

  constructor(
    public httpClient: HttpClient){
    super(httpClient, environment.apiAdminUrl, ComicService.parentEndpoint, ComicService.endpoint);
  }
  
}
