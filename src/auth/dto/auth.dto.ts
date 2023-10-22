import { OmitType } from "@nestjs/mapped-types";
import { $Enums } from "@prisma/client";
import { MemberEntity } from "src/members/entities/member.entity";
import { UserEntity } from "src/users/entities/user.entity";


export class RegisterDto extends OmitType(UserEntity,[]){
    username: string;
    password: string;
}

export class LoginDto extends OmitType(UserEntity,[]){
    username: string;
    password: string;
}
export class roleDto extends OmitType(UserEntity,[]){
    id: string;
    roles: $Enums.Role;
}
