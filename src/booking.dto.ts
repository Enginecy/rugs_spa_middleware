import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateBookingDto {
  @IsNotEmpty()
  @Transform(
    ({ value }: { value: string | number | Date }) => {
      // Accepts ISO string, timestamp, or Date object
      if (value instanceof Date) return value;
      if (typeof value === 'number') return new Date(value);
      if (typeof value === 'string') {
        const parsed = Date.parse(value);
        if (!isNaN(parsed)) return new Date(parsed);
      }
      throw new Error('Invalid date format for startDate');
    },
    { toClassOnly: true },
  )
  startDate: Date;

  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsString()
  @IsNotEmpty()
  calendarId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  notes: string;
}
