import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/member.dto';
import { AuthGuard } from 'src/auth/Guard/auth.guard';
import { RolesGuard } from 'src/auth/Guard/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(AuthGuard,RolesGuard)
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get('')
  async findAll(){
    return await this.membersService.findAll();
  }

  @Roles(Role.ADMIN,Role.USER)
  @Get('find')
  async findOneMember(@Req() req) {
    const userId = req.user.sub;
    return await this.membersService.findOne(userId);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get('find/:userId')
  async findOne(@Param('userId') userId: string) {
    return await this.membersService.findOne(userId)
  }

  @Roles(Role.USER,Role.ADMIN)
  @Patch('update')
  async updateMember(@Req() req,@Body() memberDto: CreateMemberDto){
    const userId = req.user.sub;
    return await this.membersService.updateMember(userId,memberDto);
  }
  
}
