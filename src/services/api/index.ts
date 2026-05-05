// Centralized API layer for NeoCloudz
// All API interactions should go through this module.

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
}

async function request<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<T> {
  const { params, ...rest } = config;
  const url = new URL(
    endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`,
    typeof window !== "undefined" ? window.location.origin : "http://localhost"
  );
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  try {
    const response = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
        ...rest.headers,
      },
      ...rest,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      console.error(`API Error Response [${response.status}]:`, errorBody);
      if (errorBody.error) {
        console.error("Strapi Error Message:", errorBody.error.message);
        console.error("Strapi Error Details:", errorBody.error.details);
      }
      throw new Error(errorBody.error?.message || `API error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    console.error(`API Request Failure [${rest.method || "GET"}] ${url.toString()}:`, error);
    throw error;
  }
}

export const api = {
  get: <T,>(endpoint: string, config?: RequestConfig) =>
    request<T>(endpoint, { ...config, method: "GET" }),
  post: <T,>(endpoint: string, body: unknown, config?: RequestConfig) =>
    request<T>(endpoint, {
      ...config,
      method: "POST",
      body: JSON.stringify(body),
    }),
  put: <T,>(endpoint: string, body: unknown, config?: RequestConfig) =>
    request<T>(endpoint, {
      ...config,
      method: "PUT",
      body: JSON.stringify(body),
    }),
  del: <T,>(endpoint: string, config?: RequestConfig) =>
    request<T>(endpoint, { ...config, method: "DELETE" }),
};
