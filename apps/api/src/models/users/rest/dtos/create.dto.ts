import { OmitType } from '@nestjs/swagger'
import { UserEntity } from '../entity/user.entity'
import { PickType } from '@nestjs/graphql'

export class CreateUser extends PickType(UserEntity, [
  'uid',
  'name',
] as const) {}
