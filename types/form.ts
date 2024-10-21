export type FormState = { status: string; success: boolean };

export type FormHandle = (
  prevState: FormState,
  formData: FormData,
) => Promise<FormState>;

export type HandleEdit = (
  id: string,
  prevState: FormState,
  formData: FormData,
) => Promise<FormState>;

export type HandleDelete = (_id: string) => Promise<FormState>;
