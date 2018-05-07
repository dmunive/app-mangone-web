import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { IResponse } from '../models/i-response.response';
import { ICatalog } from '../models/i-catalog.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CatalogService {

  static parentEndpoint: string = "";
  static endpoint: string = '/catalogs';

  constructor(
    public httpClient: HttpClient) { }

  public readByCode(code: string): Observable<IResponse<ICatalog>> {
    var options = {
      params: {
        code: code
      }
    };
    return this.httpClient
      .get<IResponse<ICatalog>>(`${environment.apiAdminUrl}${CatalogService.endpoint}`, options);
  }

}
