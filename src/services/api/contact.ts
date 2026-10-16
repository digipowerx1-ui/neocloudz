import { api } from "./index";

export type RequestType = "early_access" | "general_contact";
export type ProductInterest = "token_factory";
export type EndpointPreference = "api_inference" | "dedicated_endpoint" | "undecided";
export type InterestType =
  | "on_demand_gpus"
  | "enterprise_bare_metal"
  | "weka_storage"
  | "technical_support"
  | "partnership"
  | "other";
export type BudgetRange =
  | "under_5k"
  | "range_5k_20k"
  | "range_20k_100k"
  | "range_100k_500k"
  | "range_500k_plus";

export interface ContactPayload {
  fullName: string;
  workEmail: string;
  company: string;
  message: string;
  requestType?: RequestType;
  productInterest?: ProductInterest;
  interestType?: InterestType;
  budgetRange?: BudgetRange;
  modelsOfInterest?: string;
  endpointPreference?: EndpointPreference;
  expectedUsage?: string;
  targetStartDate?: string | null;
  interestedInGtcBerlin?: boolean;
  marketingOptIn?: boolean;
  phoneNumber?: string;
  source?: string;
  progress?: string;
  originatingPage?: string;
  originatingCta?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

export interface ContactResponse {
  data: {
    id: number;
    attributes: Record<string, unknown>;
  };
}

const CONTACT_ENDPOINT = "https://lovely-power-898b5204db.strapiapp.com/api/contact-requests";

/**
 * Sanitizes the payload for Strapi v5:
 * - Omits undefined and null values.
 * - Omits empty string values to avoid schema validation errors (e.g. invalid date strings).
 * - Strictly preserves boolean false values (e.g. marketingOptIn, interestedInGtcBerlin).
 */
export function sanitizeContactPayload(payload: ContactPayload): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === "boolean") {
      sanitized[key] = value;
      continue;
    }
    if (value === undefined || value === null) {
      continue;
    }
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed !== "") {
        sanitized[key] = trimmed;
      }
      continue;
    }
    sanitized[key] = value;
  }

  return sanitized;
}

export function sendContactMessage(payload: ContactPayload) {
  const sanitized = sanitizeContactPayload(payload);
  return api.post<ContactResponse>(CONTACT_ENDPOINT, {
    data: sanitized,
  });
}

