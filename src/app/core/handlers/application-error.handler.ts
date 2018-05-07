import { ErrorHandler, Injectable, NgZone } from "@angular/core";

@Injectable()
export class AppicationErrorHandler implements ErrorHandler {

    constructor() { }

    handleError(error: any): void {
        console.log(error);
        throw error;
    }
}
