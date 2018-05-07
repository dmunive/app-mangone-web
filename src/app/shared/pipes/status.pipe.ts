import { Pipe, PipeTransform } from "@angular/core";
import { CatalogConstants } from "../../core/utils/catalog.constant";

@Pipe({
    name: "status"
})
export class StatusPipe implements PipeTransform {
    transform(status: number): string {
        let value: string = '';
        switch(status){
            case CatalogConstants.CATALOG_STATUS_ACTIVE:
                value = CatalogConstants.CATALOG_STATUS_DESCRIPTION_ACTIVE;
                break;
            case CatalogConstants.CATALOG_STATUS_INACTIVE:
                value = CatalogConstants.CATALOG_STATUS_DESCRIPTION_INACTIVE;
                break;
            default:
                break;
        }
        return value;
    }
}