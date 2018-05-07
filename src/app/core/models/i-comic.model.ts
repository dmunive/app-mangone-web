import { ICategory } from "./i-category.model";

export interface IComic {
    comicId?: number;
    name: string;
    image: String;
    categories?: Array<ICategory>;
    createdDate?: Date;
    updatedDate?: Date;
    deletedDate?: Date;
    status: number;
}
