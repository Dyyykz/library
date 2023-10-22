import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class LoanService {
  constructor(private readonly prisma:PrismaService){}
  async create(createLoanDto: CreateLoanDto) {
    

    
  }

  findAll() {
    return `This action returns all loan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loan`;
  }


}
