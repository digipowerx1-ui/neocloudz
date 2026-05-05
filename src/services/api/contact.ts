import { api } from "./index";

export interface ContactPayload {
  interestType: string;
  fullName: string;
  workEmail: string;
  company: string;
  budgetRange: string;
  message: string;
  source: string;
  progress?: string;
}

export interface ContactResponse {
  data: {
    id: number;
    attributes: any;
  };
}

const CONTACT_ENDPOINT = "https://lovely-power-898b5204db.strapiapp.com/api/contact-requests";

export function sendContactMessage(payload: ContactPayload) {
  return api.post<ContactResponse>(CONTACT_ENDPOINT, {
    data: payload
  });
}
