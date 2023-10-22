import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMemberDto } from './dto/member.dto';


@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService){}
  async findAll(){
    return await this.prisma.members.findMany();
  }

  async findOne(userId:string){
    return await this.prisma.members.findFirst({
      where:{userId}
    });
  }

  async updateMember(userId: string, memberDto: CreateMemberDto){
    const member = await this.prisma.members.findFirst({
      where: {userId}
    })

    if(!member){
      throw new NotFoundException('Member Not Found')
    }

    return await this.prisma.members.update({
      where:{ id: member.id},
      data : memberDto
    });
  }
}
