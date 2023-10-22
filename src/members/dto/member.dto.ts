import { OmitType } from '@nestjs/mapped-types';
import { MemberEntity } from '../entities/member.entity';

export class CreateMemberDto extends OmitType(MemberEntity, []) {
  id: string;
  name: string;
  alamat: string;
  nik: string;
  phoneNumber: string;
  userId: string;
}
