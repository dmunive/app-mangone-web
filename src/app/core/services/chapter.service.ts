import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CrudService } from './crud.service';
import { IChapter } from '../models/i-chapter.model';

@Injectable()
export class ChapterService extends CrudService<IChapter, number>{

  static parentEndpoint: string = "/comics/:id";
  static endpoint: string = '/chapters';

  constructor(
    public httpClient: HttpClient){
    super(httpClient, environment.apiAdminUrl, ChapterService.parentEndpoint, ChapterService.endpoint);
  }
  
}
