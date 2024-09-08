import { Injectable, NotFoundException } from '@nestjs/common'
import { FindManyBookingArgs, FindUniqueBookingArgs } from './dtos/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateBookingInput } from './dtos/create-booking.input'
import { UpdateBookingInput } from './dtos/update-booking.input'
import { generateSixDigitNumber } from 'src/common/util'
import { SlotType } from '@prisma/client'

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}
  async create({
    customerId,
    endTime,
    garageId,
    startTime,
    type,
    vehicleNumber,
    phoneNumber,
    pricePerHour,
    totalPrice,
    valetAssignment,
  }: CreateBookingInput) {
    // Create customer
    const customer = await this.prisma.customer.findUnique({
      where: { uid: customerId },
    })
    if (!customer?.uid) {
      await this.prisma.customer.create({
        data: { uid: customerId },
      })
    }

    //passcode

    const passcode = generateSixDigitNumber().toString()

    //startdate, enddate

    let startDate: Date
    let endDate: Date
    if (typeof startTime === 'string') {
      startDate = new Date(startDate)
    }
    if (typeof endTime === 'string') {
      endDate = new Date(endDate)
    }
    //create slot
    const slot = await this.getFreeSlot({
      endTime: endDate,
      startTime: startDate,
      garageId,
      type,
    })

    if (!slot) {
      throw new NotFoundException('No slots found.')
    }
    //craete booking
    return this.prisma.$transaction(async (tx) => {
      const booking = await tx.booking.create({
        data: {
          endTime: endDate.toISOString(),
          startTime: startDate.toISOString(),
          customerId,
          passcode,
          slotId: slot.id,
          vehicleNumber,
          phoneNumber,
          pricePerHour,
          totalPrice,
          ...(valetAssignment ? { create: { valetAssignment } } : null),
        },
      })
      await tx.bookingTimeline.create({
        data: {
          bookingId: booking.id,
          status: 'BOOKED',
        },
      })
    })
  }

  findAll(args: FindManyBookingArgs) {
    return this.prisma.booking.findMany(args)
  }

  findOne(args: FindUniqueBookingArgs) {
    return this.prisma.booking.findUnique(args)
  }

  update(updateBookingInput: UpdateBookingInput) {
    const { id, ...data } = updateBookingInput
    return this.prisma.booking.update({
      where: { id },
      data: data,
    })
  }

  remove(args: FindUniqueBookingArgs) {
    return this.prisma.booking.delete(args)
  }

  async getFreeSlot({
    endTime,
    startTime,
    garageId,
    type,
  }: {
    endTime: string | Date
    startTime: string | Date
    garageId: number
    type: SlotType
  }) {
    return this.prisma.slot.findFirst({
      where: {
        garageId: garageId,
        type: type,
        Bookings: {
          none: {
            OR: [
              { startTime: { lt: endTime }, endTime: { gt: startTime } },
              { startTime: { gt: startTime }, endTime: { lt: endTime } },
            ],
          },
        },
      },
    })
  }
}
