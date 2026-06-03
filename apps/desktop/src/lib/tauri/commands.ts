import { invoke } from "@tauri-apps/api/core";

export interface LicenseResponse {
  success: boolean;
  token?: string;
  expires_at?: number;
  error?: string;
}

// FIX: typed hardware info instead of `any`
export interface HardwareInfo {
  acceleration: string;
  cores: number;
  arch: string;
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

export async function startWhatsappSession(): Promise<string> {
  return await invoke("start_whatsapp_session");
}

export async function getWhatsappMessages(): Promise<any[]> {
  return await invoke("get_whatsapp_messages");
}

export async function getHardwareInfo(): Promise<HardwareInfo> {
  return await invoke("get_hardware_info");
}

export async function registerShadowNode(nodeId: string, manifest: any): Promise<boolean> {
  return await invoke("register_shadow_node", { nodeId, manifest });
}

export async function initVoiceStream(): Promise<boolean> {
  return await invoke("init_voice_stream");
}

export async function readLocalFile(path: string): Promise<string> {
  return await invoke("read_local_file", { path });
}
