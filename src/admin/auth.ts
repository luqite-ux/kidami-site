const SESSION_KEY = "kidami_admin";
const HASH_KEY = "kidami_admin_pw_hash";
const SETTINGS_KEY = "admin_password_hash";
const FALLBACK_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "kidami2024";

export async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function isAdminSession(): boolean {
  return localStorage.getItem(SESSION_KEY) === "1";
}

export function setAdminSession(on: boolean) {
  if (on) localStorage.setItem(SESSION_KEY, "1");
  else localStorage.removeItem(SESSION_KEY);
}

export function getLocalPasswordHash(): string {
  return localStorage.getItem(HASH_KEY) || "";
}

export function setLocalPasswordHash(hash: string) {
  localStorage.setItem(HASH_KEY, hash);
}

export { SETTINGS_KEY };

export async function passwordMatches(input: string, storedHash?: string): Promise<boolean> {
  const hash = storedHash || getLocalPasswordHash();
  if (hash) return (await sha256(input)) === hash;
  return input === FALLBACK_PASSWORD;
}
