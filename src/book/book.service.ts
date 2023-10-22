import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class BookService {
  constructor(private readonly prisma:PrismaService){}
  async create(createBookDto: CreateBookDto) {
    return await this.prisma.book.create({
      data:createBookDto
    });
  }

  async getAll(createBookDto:CreateBookDto){
    return await this.prisma.book.findMany;
  }
  
  async findOne(id: string){
    return await this.prisma.book.findUnique({
      where:{
        id
      }
    });
  }

  async update(id:string,createBookDto:CreateBookDto){
    return await this.prisma.book.update({
      where:{id},
      data: createBookDto
    })
  }

  async delete(id:string){
    return await this.prisma.book.delete({
      where: {
        id
      }
    })
  }

}
