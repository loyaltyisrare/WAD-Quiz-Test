export function verifyAdminPassword(password: string): boolean {
  return password === (process.env.ADMIN_PASSWORD || "wad-admin-2024");
}

export function setAdminAuthenticated() {
  if (typeof window !== "undefined") {
    localStorage.setItem("wad_admin_auth", "true");
  }
}

export function isAdminAuthenticated(): boolean {
  if (typeof window !== "undefined") {
    return localStorage.getItem("wad_admin_auth") === "true";
  }
  return false;
}

export function logoutAdmin() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("wad_admin_auth");
  }
}
