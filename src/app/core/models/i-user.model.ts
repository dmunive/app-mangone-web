export interface IUser {
    userId?: number;
    name: string;
    lastName: string;
    email: string;
    password?: string;
    createdDate?: Date;
    updatedDate?: Date;
    deletedDate?: Date;
    status: number;
}
