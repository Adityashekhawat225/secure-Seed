const BASE_URL = "http://localhost:4000/api"; // backend base url

export const api = {
  register: async (data: { email: string; password: string }) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  login: async (data: { email: string; password: string }) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // --- Vault functions ---
  getVault: async (token: string) => {
    const res = await fetch(`${BASE_URL}/vault`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  addVault: async (item: any, token: string) => {
    const res = await fetch(`${BASE_URL}/vault`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    });
    return res.json();
  },

  updateVault: async (id: string, item: any, token: string) => {
    const res = await fetch(`${BASE_URL}/vault/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    });
    return res.json();
  },

  deleteVault: async (id: string, token: string) => {
    const res = await fetch(`${BASE_URL}/vault/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },
};

