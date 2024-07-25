export interface IScheduleHour {
  startHour: Date;
  finishHour: Date;
}

export interface ISchedule {
  date: Date;
  hours: IScheduleHour[];
}

export class CreateScheduleDTO {
  doctorId: number;
  schedules: ISchedule[];
}
