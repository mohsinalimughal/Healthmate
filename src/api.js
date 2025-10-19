const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export const api = {
  async request(path, { method = "GET", body, token, isForm } = {}) {
    const headers = {};
    if (!isForm) headers["Content-Type"] = "application/json";
    if (token && typeof token === "string") headers["Authorization"] = `Bearer ${token}`;

    let res;
    try {
      res = await fetch(`${API_BASE}${path}`, {
        method,
        headers,
        body: isForm ? body : body ? JSON.stringify(body) : undefined,
      });
    } catch (e) {
      // This is where "Failed to fetch" comes from (CORS/network)
      throw new Error(`Network error: ${e.message}`);
    }

    const ct = res.headers.get("content-type") || "";
    const isJson = ct.includes("application/json");

    if (!res.ok) {
      let msg = `HTTP ${res.status}`;
      if (isJson) { try { msg = (await res.json()).message || msg; } catch {} }
      else { try { msg = await res.text(); } catch {} }
      throw new Error(msg);
    }
    return isJson ? res.json() : null;
  }
};
