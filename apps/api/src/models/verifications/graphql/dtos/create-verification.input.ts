import { InputType, OmitType, PickType } from '@nestjs/graphql'
import { Verification } from '../entity/verification.entity'

@InputType()
export class CreateVerificationInput extends OmitType(Verification,[
    'adminId',
    'createdAt',
    'updatedAt'

],InputType) {}

