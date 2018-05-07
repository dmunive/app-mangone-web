import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CrudService } from './crud.service';
import { IUser } from '../models/i-user.model';

@Injectable()
export class UserService extends CrudService<IUser, number>{

  static parentEndpoint: string = "";
  static endpoint: string = '/users';

  constructor(
    public httpClient: HttpClient){
    super(httpClient, environment.apiAdminUrl, UserService.parentEndpoint, UserService.endpoint);
  }
  
}
