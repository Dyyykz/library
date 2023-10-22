import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto, roleDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { userInfo } from 'os';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username,  } = registerDto;

    const existingUser = await this.prisma.users.findUnique({
      where: { username: username },
    });

    if (existingUser) {
      throw new ConflictException(' username is already taken');
    }

    const hashPassword = await bcrypt.hash(registerDto.password, 12);

    const user = await this.prisma.users.create({
      data: {
        ...registerDto,
        password: hashPassword,
      },
    });

    const member = await this.prisma.members.create({
      data: {
        userId: user.id
      }
    })

    return {
      status: 201,
      message: 'Registration Success',
    };
  }

  //login
  async login(loginDto: LoginDto) {
    const userValid = await this.prisma.users.findFirst({
      where: {
        username: loginDto.username,
      },
    });

    if (!userValid) {
      throw new UnauthorizedException('user not found');
    }

    //merubah password menjadi bcrypt
    const passwordValid = await bcrypt.compare(
      loginDto.password,
      userValid.password,
    );

    if (!passwordValid) {
      return HttpStatus.UNAUTHORIZED;
    }

    const payload = {
      sub: userValid.id,
      username: userValid.username,
      role: userValid.roles,
    };

    // const customer = await this.prisma.customer.findFirst({
    //   where: {
    //     userId: userN.id,
    //   },
    // });

    // if (!customer) {
    //   throw new UnauthorizedException('Customer tidak di temukan untuk user');
    // }

    // const customerId = customer.id;

    return {
      access_token: await this.jwt.signAsync(payload),
      // status: 200,
      // message: 'Login berhasil',
      // // customerId: customerId,
    };
  }

  
  
}
