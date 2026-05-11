import { invoke } from "@tauri-apps/api/core";

export interface LicenseResponse {
  success: boolean;
  token?: string;
  expires_at?: number;
  error?: string;
}

export async function validateLicense(email: string, licenseKey: string): Promise<LicenseResponse> {
  return await invoke("validate_license", { email, licenseKey });
}

export async function storeSecureCredential(service: string, key: string, value: string): Promise<void> {
  return await invoke("store_secure_credential", { service, key, value });
}

export async function getSecureCredential(service: string, key: string): Promise<string> {
  return await invoke("get_secure_credential", { service, key });
}

export async function checkOllamaStatus(): Promise<boolean> {
  return await invoke("check_ollama_status");
}
