import { $Enums,users as usersModel } from "@prisma/client";

export class UserEntity implements usersModel {
     id: string;
     username: string;
     password: string;
     roles: $Enums.Role;
}

//extend Omitypes to authDto
