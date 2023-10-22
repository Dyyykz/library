import { members as membersModel } from '@prisma/client';

export class MemberEntity implements membersModel {
  id: string;
  name: string;
  phoneNumber: string;
  alamat: string;
  nik: string;
  userId: string;
}
