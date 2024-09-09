import { Resolver, Query, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql'
import { ValetsService } from './valets.service'
import { Valet } from './entity/valet.entity'
import { FindManyValetArgs, FindUniqueValetArgs } from './dtos/find.args'
import { CreateValetInput } from './dtos/create-valet.input'
import { UpdateValetInput } from './dtos/update-valet.input'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { GetUserType } from 'src/common/types'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { BadGatewayException } from '@nestjs/common'
import { BookingStatus, Customer } from '@prisma/client'
import { User } from 'src/models/users/graphql/entity/user.entity'

@Resolver(() => Valet)
export class ValetsResolver {
  constructor(
    private readonly valetsService: ValetsService,
    private readonly prisma: PrismaService,
    private readonly valetService: ValetsService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Valet)
  async createValet(
    @Args('createValetInput') args: CreateValetInput,
    @GetUser() user: GetUserType,
  ) {
    const company = await this.prisma.company.findFirst({
      where: { Managers: { some: { uid: user.uid } } },
    })

    if (!company) {
      throw new BadGatewayException('You do not have a company.')
    }
    return this.valetsService.create({ ...args, companyId: company.id })
  }

  @AllowAuthenticated()
  @Mutation(() => Valet)
  async assignValet(
    @Args('bookingId') bookingId: number,
    @Args('bookingStatus') bookingStatus: BookingStatus,
    @GetUser() user: GetUserType,
  ) {}

  @Query(() => [Valet], { name: 'valets' })
  findAll(@Args() args: FindManyValetArgs) {
    return this.valetsService.findAll(args)
  }

  @Query(() => Valet, { name: 'valet' })
  findOne(@Args() args: FindUniqueValetArgs) {
    return this.valetsService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Valet)
  async updateValet(
    @Args('updateValetInput') args: UpdateValetInput,
    @GetUser() user: GetUserType,
  ) {
    const valet = await this.prisma.valet.findUnique({
      where: { uid: args.uid },
    })
    checkRowLevelPermission(user, valet.uid)
    return this.valetsService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Valet)
  async removeValet(
    @Args() args: FindUniqueValetArgs,
    @GetUser() user: GetUserType,
  ) {
    const valet = await this.prisma.valet.findUnique(args)
    checkRowLevelPermission(user, valet.uid)
    return this.valetsService.remove(args)
  }

  @ResolveField(() => User, { nullable: true })
  user(@Parent() valet: Valet) {
    return this.prisma.user.findUnique({ where: { uid: valet.uid } })
  }
}
