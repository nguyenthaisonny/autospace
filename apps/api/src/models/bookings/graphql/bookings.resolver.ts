import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { BookingsService } from './bookings.service'
import { Booking } from './entity/booking.entity'
import { FindManyBookingArgs, FindUniqueBookingArgs } from './dtos/find.args'
import { CreateBookingInput } from './dtos/create-booking.input'
import { UpdateBookingInput } from './dtos/update-booking.input'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { GetUserType } from 'src/common/types'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Resolver(() => Booking)
export class BookingsResolver {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly prisma: PrismaService,
    private readonly bookingService: BookingsService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Booking)
  createBooking(
    @Args('createBookingInput') args: CreateBookingInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.customerId)
    return this.bookingsService.create(args)
  }
  @AllowAuthenticated('admin')
  @Query(() => [Booking], { name: 'bookings' })
  findAll(@Args() args: FindManyBookingArgs) {
    return this.bookingsService.findAll(args)
  }

  @AllowAuthenticated('valet')
  @Query(() => [Booking], { name: 'bookingsForValet' })
  async bookingsForValet(
    @Args() args: FindManyBookingArgs,
    @GetUser() user: GetUserType,
  ) {
    const company = await this.prisma.company.findFirst({
      where: { Valets: { some: { uid: user.uid } } },
    })
    return this.bookingsService.findAll({
      ...args,
      where: {
        ...args.where,
        Slot: { is: { Garage: { is: { companyId: { equals: company.id } } } } },
      },
    })
  }

  @AllowAuthenticated('manager', 'admin')
  @Query(() => Booking, { name: 'booking' })
  findOne(@Args() args: FindUniqueBookingArgs) {
    return this.bookingsService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Booking)
  async updateBooking(
    @Args('updateBookingInput') args: UpdateBookingInput,
    @GetUser() user: GetUserType,
  ) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: args.id },
    })
    checkRowLevelPermission(user, booking.customerId)
    return this.bookingsService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Booking)
  async removeBooking(
    @Args() args: FindUniqueBookingArgs,
    @GetUser() user: GetUserType,
  ) {
    const booking = await this.prisma.booking.findUnique(args)
    checkRowLevelPermission(user, booking.customerId)
    return this.bookingsService.remove(args)
  }
}
