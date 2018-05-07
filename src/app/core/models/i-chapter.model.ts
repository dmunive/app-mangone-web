export interface IChapter {
    chapterId?: number;
    comicId?: number;
    name: string;
    number: number;
    image: String;
    createdDate?: Date;
    updatedDate?: Date;
    deletedDate?: Date;
    status: number;
}
