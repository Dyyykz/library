import { OmitType } from "@nestjs/mapped-types";
import { BookEntitiy } from "../entities/book.entity";


export class CreateBookDto extends OmitType(BookEntitiy,['id']){
    title: string;
    publicationYear: string;
    author: string;
    isbn: string;
    synopsis: string;
    isAkctive: number;
    stok: number;
    publisher: string;
    
}
