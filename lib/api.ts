// Reads NEXT_PUBLIC_API_BASE_URL, defaults to localhost Java API.
// Provides: apiGet, apiPost, apiPatch, apiDelete, swrFetcher, setAuth, clearAuth, getAuthToken, getAuthRole.

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api"

// Token helpers (stored client-side). Safe-guard SSR.
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  try {
    return localStorage.getItem("auth_token")
  } catch {
    return null
  }
}

export function getAuthRole(): string | null {
  if (typeof window === "undefined") return null
  try {
    return localStorage.getItem("auth_role")
  } catch {
    return null
  }
}

export function setAuth(token: string, role: string) {
  if (typeof window === "undefined") return
  localStorage.setItem("auth_token", token)
  localStorage.setItem("auth_role", role)
}

export function clearAuth() {
  if (typeof window === "undefined") return
  localStorage.removeItem("auth_token")
  localStorage.removeItem("auth_role")
}

// Internal request wrapper
async function request<T = any>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  path: string,
  body?: unknown,
  opts?: { withAuth?: boolean; headers?: Record<string, string> },
): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts?.headers || {}),
  }

  // attach token if needed
  if (opts?.withAuth) {
    const token = getAuthToken()
    if (token) headers["Authorization"] = `Bearer ${token}`
  }

  const res = await fetch(url, {
    method,
    headers,
    credentials: "include",
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  // Try to parse JSON. Guard for empty body.
  const text = await res.text()
  const data = text ? safeJsonParse(text) : null

  if (!res.ok) {
    const message = (data && (data.error || data.message)) || `Request failed: ${res.status} ${res.statusText}`
    throw new Error(message)
  }

  return data as T
}

function safeJsonParse(text: string) {
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

// Public helpers
export function apiGet<T = any>(path: string, opts?: { withAuth?: boolean }) {
  return request<T>("GET", path, undefined, opts)
}

export function apiPost<T = any>(path: string, body?: unknown, opts?: { withAuth?: boolean }) {
  return request<T>("POST", path, body, opts)
}

export function apiPatch<T = any>(path: string, body?: unknown, opts?: { withAuth?: boolean }) {
  return request<T>("PATCH", path, body, opts)
}

export function apiDelete<T = any>(path: string, opts?: { withAuth?: boolean }) {
  return request<T>("DELETE", path, undefined, opts)
}

// SWR fetcher: useSWR("/hostels", swrFetcher)
export const swrFetcher = (path: string) => apiGet(path)
