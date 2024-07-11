import { ReactNode } from "react";
import * as z from "zod";

export const loginByPinSchema = z.object({
  phone: z
    .string()
    .min(1, { message: "Phone Number is required" })
    .max(15, { message: "Phone Number minimum 10 character" }),
  pin: z.string().min(6, { message: "Pin must 6 character" }),
});

export const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Not a valid email"),
  phone_number: z.string().min(10, { message: "Phone Number is required" }),
  pin: z.string().min(6, { message: "PIN must 6 character" }),
  confirm_pin: z.string().min(6, { message: "Confirm PIN must 6 character" }),
});

export interface LoginTypes {
  id: number;
  name: string;
  role: string;
  token: string;
}

export interface ModelLogoutProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export type LoginByPinType = z.infer<typeof loginByPinSchema>;
export type RegisterType = z.infer<typeof registerSchema>;
