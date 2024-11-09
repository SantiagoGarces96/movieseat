import { FormState, FormStatus } from "@/types/form";

export const initialState: FormState = {
  status: FormStatus.PENDING,
  success: false,
  message: "",
};
