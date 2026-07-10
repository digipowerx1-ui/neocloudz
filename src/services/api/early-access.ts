import { api } from "./index";

export interface EarlyAccessPayload {
  email: string;
}

export interface EarlyAccessResponse {
  data: {
    id: number;
    attributes: any;
  };
}

const EARLY_ACCESS_ENDPOINT = "https://lovely-power-898b5204db.strapiapp.com/api/early-accesses";

export function sendEarlyAccess(payload: EarlyAccessPayload) {
  return api.post<EarlyAccessResponse>(EARLY_ACCESS_ENDPOINT, {
    data: {
      email: payload.email,
    },
  });
}
