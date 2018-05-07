import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { AuthenticationService } from "../services/authentication.service";
import { IToken } from "../models/i-token.model";

@Injectable()
export class ApplicationTokenInterceptor implements HttpInterceptor {
    
    constructor(
        private authenticationService: AuthenticationService
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {   
        let token: IToken = this.authenticationService.getToken();
        let authorizationToken = "";
        if(token){
            authorizationToken = `${token.tokenType} ${token.accessToken}`;
        }
        const requestClone = req.clone({headers: req.headers.append("Authorization", authorizationToken)});
        return next.handle(requestClone)
    }

}