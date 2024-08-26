import { ObjectType } from '@nestjs/graphql'
import { User } from '@prisma/client'
import { IsDate, IsString, IsInt, IsOptional } from 'class-validator'
import { RestrictProperties } from 'src/common/dtos/common.input'
@ObjectType()
export class UserEntity implements RestrictProperties<UserEntity, User> {
    uid: string
    createdAt: Date
    updatedAt: Date
    image: string
    @IsOptional()
    name: string

}

