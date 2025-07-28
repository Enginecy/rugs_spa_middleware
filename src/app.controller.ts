import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { tryCatch } from './utils/utils';
import { AxiosError } from 'axios';
import { CreateBookingDto } from './booking.dto';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('calendars')
  async getCalendars() {
    const [calendars, error] = await tryCatch(async () => {
      return await this.appService.fetchCalendars();
    });
    if (error && error instanceof AxiosError) {
      return {
        status: 'error',
        message: error.message,
        response: error.response?.data as unknown,
      };
    }
    return calendars;
  }

  @Get('availability')
  async getAvailability(
    @Query('calendarId') calendarId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate?: string,
  ) {
    const [availability, error] = await tryCatch(async () => {
      return await this.appService.fetchAvailability(
        calendarId,
        new Date(startDate),
        endDate ? new Date(endDate) : undefined,
      );
    });
    if (error && error instanceof AxiosError) {
      return {
        status: 'error',
        message: error.message,
        response: error.response?.data as unknown,
      };
    }
    return availability;
  }

  @Post('bookings')
  async createBooking(@Body() bookingDto: CreateBookingDto) {
    const [booking, error] = await tryCatch(async () => {
      return await this.appService.createBooking(bookingDto);
    });
    if (error && error instanceof AxiosError) {
      return {
        status: 'error',
        message: error.message,
        response: error.response?.data as unknown,
      };
    }
    return booking;
  }
}
