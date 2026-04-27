import { api } from "./index";

export interface ContactPayload {
  interest: string;
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
}

export interface ContactResponse {
  ticketId: string;
  receivedAt: string;
}

const CONTACT_ENDPOINT = "/contact";

export function sendContactMessage(payload: ContactPayload) {
  return api.post<ContactResponse>(CONTACT_ENDPOINT, payload);
}
