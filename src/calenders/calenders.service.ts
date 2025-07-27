import { Injectable } from '@nestjs/common';
import { CreateCalenderDto } from './dto/create-calender.dto';
import { UpdateCalenderDto } from './dto/update-calender.dto';

@Injectable()
export class CalendersService {
  create(createCalenderDto: CreateCalenderDto) {
    return 'This action adds a new calender';
  }

  async findAll() {
    const ghlToken = process.env.GHL_BEARER_TOKEN;
    if (!ghlToken) {
      throw new Error('GHL_BEARER_TOKEN is not set');
    }
    const response = await fetch(
      'https://services.leadconnectorhq.com/calendars?locationId=2U58e0avwqmV1ZPgu51f',
      {
        method: 'GET',
        headers: {
          Authorization: `${ghlToken}`,
          'Content-Type': 'application/json',
          Version: '2021-04-15',
        },
      },
    );

    console.log('Response status:', response.status );
    if (!response.ok) {
      const errorMessage = await response.text();

      throw new Error(`Failed to fetch calendars: ${errorMessage}`);
    }
    const data = await response.json();
    return data.calendars || []; 
  }

  findOne(id: number) {
    return `This action returns a #${id} calender`;
  }

  update(id: number, updateCalenderDto: UpdateCalenderDto) {
    return `This action updates a #${id} calender`;
  }

  remove(id: number) {
    return `This action removes a #${id} calender`;
  }
}
