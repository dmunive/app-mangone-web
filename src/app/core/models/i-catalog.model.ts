import { ICatalogDetail } from "./i-catalog-detail.model";

export interface ICatalog{
    catalogId: number;
    code: string;
    description: string;
    catalogDetails: Array<ICatalogDetail>;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    status: number;
}