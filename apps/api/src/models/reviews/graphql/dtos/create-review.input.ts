import { InputType, OmitType, PickType } from '@nestjs/graphql'
import { Review } from '../entity/review.entity'

@InputType()
export class CreateReviewInput extends OmitType(Review,[
   'id',
   'createdAt',
   'updatedAt'
],InputType) {}

