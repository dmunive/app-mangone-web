import { HttpErrorResponse } from "@angular/common/http";
import { StatusResponseConstants } from "./status-response.constant";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

export class HandleErrorUtils {
    
    public static handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(`Backend returned code ${error.status}, ` + `body was: ${JSON.stringify(error.error)}`);
    
          if(error.error.status === StatusResponseConstants.STATUS_RESPONSE_FAIL){
            var fields = Object.keys(error.error.data)
            var message: string = "";
            fields.forEach((field)=>{
              message += error.error.data[field] + "\n";
            });
            error.error['message'] = message;
          }
        }
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable(error.error);
      };

}