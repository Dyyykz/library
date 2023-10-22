import { book as bookModel } from "@prisma/client";

export class BookEntitiy implements bookModel{
    id: string;
    title: string;
    publisher: string;
    publicationYear: string;
    author: string;
    isbn: string;
    synopsis: string;
    isAkctive: number;
    stok: number;

}
