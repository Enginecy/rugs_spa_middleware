import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateBookingDto } from './booking.dto';

type Calendar = {
  id: string;
  name: string;
};
@Injectable()
export class AppService {
  private readonly ghlToken: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.ghlToken = this.configService.get<string>('GHL_BEARER_TOKEN') ?? '';
  }

  async fetchCalendars() {
    type Response = {
      calendars: Array<{
        id: string;
        name: string;
        isActive: boolean;
      }>;
    };
    const response = await this.httpService.axiosRef.get<Response>(
      'https://services.leadconnectorhq.com/calendars/?locationId=2U58e0avwqmV1ZPgu51f',
      {
        headers: {
          Authorization: `Bearer ${this.ghlToken}`,
          Version: '2021-04-15',
        },
      },
    );

    const calendars = response.data.calendars;
    const result: Calendar[] = [];

    for (const calendar of calendars) {
      if (calendar.isActive == false) continue;
      result.push({
        id: calendar.id,
        name: calendar.name,
      });
    }
    return result;
  }

  async fetchAvailability(calendarId: string, startDate: Date, endDate?: Date) {
    const query = new URLSearchParams();
    query.set('startDate', startDate.getTime().toString());
    if (endDate) {
      query.set('endDate', endDate.getTime().toString());
    } else {
      const sevenDaysLater = new Date(startDate);
      sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);
      query.set('endDate', sevenDaysLater.getTime().toString());
    }
    query.set('timezone', 'America/New_York');
    query.set('ignoreDateRange', 'true');

    const url = new URL(
      `https://services.leadconnectorhq.com/calendars/${calendarId}/free-slots`,
    );
    url.search = query.toString();

    const response = await this.httpService.axiosRef.get(url.toString(), {
      headers: {
        Authorization: `Bearer ${this.ghlToken}`,
        Version: '2021-04-15',
      },
    });

    return response.data as unknown;
  }

  async createBooking({
    startDate,
    customerId,
    calendarId,
    title,
    notes,
  }: CreateBookingDto) {
    const response = await this.httpService.axiosRef.post(
      'https://services.leadconnectorhq.com/calendars/events/appointments',
      {
        calendarId,
        ignoreFreeSlotValidation: false,
        locationId: '2U58e0avwqmV1ZPgu51f',
        contactId: customerId,
        title,
        internalNote: notes,
        startTime: startDate.toISOString(),
        selectedTimezone: 'America/New_York',
        appointmentStatus: 'confirmed',
        ignoreDateRange: true,
        toNotify: false,
        userId: 'bEWnXDetU4orRhvhL1d6',
        assignedUserId: 'bEWnXDetU4orRhvhL1d6',
        overrideLocationConfig: false,
        isCustomRecurring: false,
      },
      {
        headers: {
          Authorization: `Bearer ${this.ghlToken}`,
          Version: '2021-04-15',
        },
      },
    );
    return response.data as unknown;
  }
}
