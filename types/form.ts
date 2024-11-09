export type FormState = { status: string; success: boolean; message: string };

export enum FormStatus {
  PENDING = "pending",
  COMPLETE = "complete",
}
