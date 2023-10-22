import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoanModule } from './loan/loan.module';
import { BookModule } from './book/book.module';
import { UsersModule } from './users/users.module';
import { MembersModule } from './members/members.module';
import { AdminModule } from './admin/admin.module';


@Module({
  imports: [AuthModule, PrismaModule, LoanModule, BookModule, UsersModule, MembersModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
