import { environment } from "../../../environments/environment";
import { ICatalog } from "../models/i-catalog.model";
import { IResponse } from "../models/i-response.response";
import { CatalogService } from "./catalog.service";
import { Observable } from "rxjs/Observable";
import { ISignIn } from "../models/i-signin.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IToken } from "../models/i-token.model";
import { CrudService } from "./crud.service";
import { catchError } from "rxjs/operators/catchError";
import { HandleErrorUtils } from "../utils/handle-error.util";

@Injectable()
export class AuthenticationService{

    static endpoint: string = '/auth/signin';

    constructor(
        public httpClient: HttpClient) { 
    }

    public signIn(request: ISignIn): Observable<IResponse<IToken>> {
        return this.httpClient
            .post<IResponse<IToken>>(`${environment.apiUrl}${AuthenticationService.endpoint}`, request)
                .pipe(catchError(HandleErrorUtils.handleError));
    }

    public signOut(){
        localStorage.clear();
    }

    public isAuthenticated(): boolean {
        return localStorage.getItem("token") ? true : false;
    }

    public getToken(): IToken {
        let token: IToken = JSON.parse(localStorage.getItem("token"));
        return token;
    }

    public setToken(token: IToken){
        localStorage.setItem("token", JSON.stringify(token));
    }
}