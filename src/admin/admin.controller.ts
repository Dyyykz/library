import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/create-admin.dto';


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create')
   async create(@Body() AdminDto: AdminDto) {
    return await this.adminService.create(AdminDto);
  }

  @Get()
  async findAll() {
    return await this.adminService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.adminService.findOne(id);
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() AdminDto: AdminDto) {
    return await this.adminService.update(id, AdminDto);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.adminService.delete(id);
  }
}
