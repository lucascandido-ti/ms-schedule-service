export enum ErrorCodes {
  SPECIALTIE_NOT_FOUND = 100,
}

export abstract class Response {
  public Success: boolean;
  public Message: string;
  public ErrorCodes: ErrorCodes;
}
