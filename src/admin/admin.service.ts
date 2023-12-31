import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminDto } from './dto/create-admin.dto';
import * as bcrypt from "bcrypt"

@Injectable()
export class AdminService {
  constructor(private readonly prisma:PrismaService){}
  async create(adminDto: AdminDto) {
    const existingUser = await this.prisma.users.findUnique({
      where: { username: adminDto.username}
    })

    if (existingUser){
      throw new BadRequestException('Username already in use')
    }

    const hashPassword = await bcrypt.hash(adminDto.password,10)

    return await this.prisma.users.create({
      data: {
        ...adminDto,
        password: adminDto.password,
        roles: 'ADMIN'
      }
    })
  }

  async findAll() {
    return await this.prisma.users.findMany({
      where: {roles: 'ADMIN'}
    });
  }

  async findOne(id: string) {
    return await this.prisma.users.findUnique({
      where:{id}
    });
  }

  async update(id: string,adminDto:AdminDto) {
    const existingUser = await this.prisma.users.findUnique({
      where: { username: adminDto.username }
  })

  if (existingUser) {
      throw new BadRequestException("username already in use")
  }

  const hashedPassword = await bcrypt.hash(adminDto.password, 10)

  return await this.prisma.users.update({
      where: { id },
      data: {
          ...adminDto,
          username: adminDto.username,
          password: hashedPassword
      }
  })
  }

  async delete(id: string) {
    return await this.prisma.users.delete({
      where: {id}
    });
  }
}
