import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IResponse } from '../models/i-response.response';
import { IPaginator } from '../models/i-paginator.model';
import { IPaginatorParams } from '../models/i-paginator-params.model';
import { JSONUtils } from '../utils/json.util';
import { catchError } from 'rxjs/operators/catchError';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { AppModule } from '../../app.module';
import { forEach } from '@angular/router/src/utils/collection';
import { StatusResponseConstants } from '../utils/status-response.constant';
import { HandleErrorUtils } from '../utils/handle-error.util';

@Injectable()
export class CrudService<T, ID> {

  protected httpClient: HttpClient;
  protected url: string;
  protected parentEndpoint: string;
  protected endpoint: string;

  constructor(
    httpClient: HttpClient,
    url: string,
    parentEndpoint: string,
    endpoint: string
    ) {
    this.httpClient = httpClient;
    this.url = url;
    this.parentEndpoint = parentEndpoint;
    this.endpoint = endpoint;
  }
  
  public create(data: T, parentId?: Array<ID>): Observable<IResponse<T>> {
    this.configParentEnpoint(parentId);
    return this.httpClient
      .post<IResponse<T>>(`${this.url}${this.parentEndpoint}${this.endpoint}`, data)
        .pipe(catchError(HandleErrorUtils.handleError));
  }

  public read(id: ID, parentId?: Array<ID>): Observable<IResponse<T>> {
    this.configParentEnpoint(parentId);
    return this.httpClient
      .get<IResponse<T>>(`${this.url}${this.parentEndpoint}${this.endpoint}/${id}`)
        .pipe(catchError(HandleErrorUtils.handleError));
  }

  public update(id: ID, data: T, parentId?: Array<ID>): Observable<IResponse<T>> {
    this.configParentEnpoint(parentId);
    return this.httpClient
      .put<IResponse<T>>(`${this.url}${this.parentEndpoint}${this.endpoint}/${id}`, data)
        .pipe(catchError(HandleErrorUtils.handleError));
  }

  public delete(id: ID, parentId?: Array<ID>): Observable<IResponse<T>> {
    this.configParentEnpoint(parentId);
    return this.httpClient
      .delete<IResponse<T>>(`${this.url}${this.parentEndpoint}${this.endpoint}/${id}`)
        .pipe(catchError(HandleErrorUtils.handleError));
  }

  public search(params: any, pagination: IPaginatorParams, parentId?: Array<ID>): Observable<IResponse<IPaginator<T>>> {
    this.configParentEnpoint(parentId);
    var options = {
      params: JSONUtils.mergeJSON(params, pagination)
    };
    return this.httpClient
      .get<IResponse<IPaginator<T>>>(`${this.url}${this.parentEndpoint}${this.endpoint}`, options)
        .pipe(catchError(HandleErrorUtils.handleError));
  }

  public list(parentId?: Array<ID>): Observable<IResponse<IPaginator<T>>> {
    this.configParentEnpoint(parentId);
    return this.httpClient
      .get<IResponse<IPaginator<T>>>(`${this.url}${this.parentEndpoint}`)
        .pipe(catchError(HandleErrorUtils.handleError));
  }

  private configParentEnpoint(parentId: Array<ID>): void{
    if(parentId && this.parentEndpoint){
      parentId.forEach((id: ID)=>{
        let pos : number = this.parentEndpoint.indexOf(":id");
        if(pos>0) {
          this.parentEndpoint = this.parentEndpoint.replace(this.parentEndpoint.substring(pos, pos+3), id.toString());
        }
      })
    }
  }
  
}