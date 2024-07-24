export interface IDayOptions {
  open: Date;
  close: Date;
}

export interface IBussinessHour {
  monday: IDayOptions;
  tuesday: IDayOptions;
  wednesday: IDayOptions;
  thursday: IDayOptions;
  friday: IDayOptions;
  saturday: IDayOptions;
  sunday: IDayOptions;
  notes: string;
}
