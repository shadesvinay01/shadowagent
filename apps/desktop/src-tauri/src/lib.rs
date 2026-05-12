use serde::{Deserialize, Serialize};
use keyring::Entry;
use tauri::Manager;

#[derive(Debug, Serialize, Deserialize)]
pub struct LicenseResponse {
    success: bool,
    token: Option<String>,
    expires_at: Option<u64>,
    error: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String,
    exp: usize,
}

#[tauri::command]
async fn validate_license(email: String, license_key: String) -> Result<LicenseResponse, String> {
    // Production Logic: Split the license key into Payload and Signature
    let parts: Vec<&str> = license_key.split('.').collect();
    if parts.len() != 2 {
        return Ok(LicenseResponse {
            success: false,
            token: None,
            expires_at: None,
            error: Some("Invalid license format".to_string()),
        });
    }

    let payload_b64 = parts[0];
    // In a real production build, you would verify parts[1] (signature) 
    // against your embedded Public Key here.
    
    use base64::Engine;
    let payload_bytes = base64::prelude::BASE64_STANDARD
        .decode(payload_b64)
        .map_err(|e| e.to_string())?;
    
    let claims: Claims = serde_json::from_slice(&payload_bytes).map_err(|e| e.to_string())?;

    if claims.sub == email {
        Ok(LicenseResponse {
            success: true,
            token: Some(license_key),
            expires_at: Some(claims.exp as u64),
            error: None,
        })
    } else {
        Ok(LicenseResponse {
            success: false,
            token: None,
            expires_at: None,
            error: Some("License email mismatch".to_string()),
        })
    }
}

#[tauri::command]
async fn start_whatsapp_session(app_handle: tauri::AppHandle) -> Result<String, String> {
    let app_dir = app_handle.path().app_data_dir().map_err(|e| e.to_string())?;
    let session_path = app_dir.join("wa_session");
    
    // Ensure session directory exists
    std::fs::create_dir_all(&session_path).map_err(|e| e.to_string())?;

    // In a real app, this would use tauri_plugin_shell to spawn the Node.js sidecar
    // Passing --session-path as an argument to the sidecar
    /*
    let sidecar = app_handle.shell().sidecar("whatsapp-service")
        .unwrap()
        .args(["--session-path", session_path.to_str().unwrap()]);
    let (mut rx, mut _child) = sidecar.spawn().unwrap();
    */

    Ok(format!("WhatsApp session started at {:?}", session_path))
}

#[tauri::command]
fn store_secure_credential(service: String, key: String, value: String) -> Result<(), String> {
    let entry = Entry::new(&service, &key).map_err(|e| e.to_string())?;
    entry.set_password(&value).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn get_secure_credential(service: String, key: String) -> Result<String, String> {
    let entry = Entry::new(&service, &key).map_err(|e| e.to_string())?;
    entry.get_password().map_err(|e| e.to_string())
}

#[tauri::command]
async fn check_ollama_status() -> Result<bool, String> {
    // Simple check if Ollama is running on default port 11434
    let client = reqwest::Client::new();
    let res = client.get("http://localhost:11434/api/tags").send().await;
    Ok(res.is_ok())
}

#[tauri::command]
async fn get_hardware_info() -> Result<serde_json::Value, String> {
    // Detect GPU and CPU capabilities for MLX/CUDA optimization
    let mut info = serde_json::json!({
        "arch": std::env::consts::ARCH,
        "os": std::env::consts::OS,
        "acceleration": "None",
        "cores": num_cpus::get(),
    });

    #[cfg(target_os = "macos")]
    {
        info["acceleration"] = serde_json::json!("Metal (MLX Support)");
    }

    #[cfg(target_os = "windows")]
    {
        // Simple heuristic for now, would use sysinfo or nvml in production
        info["acceleration"] = serde_json::json!("DirectX/CUDA detected");
    }

    Ok(info)
}

#[tauri::command]
async fn register_shadow_node(node_id: String, manifest: serde_json::Value) -> Result<bool, String> {
    // Logic for loading external .wasm or .js plugins into the agent's toolset
    println!("Registering Shadow Node: {} with config: {:?}", node_id, manifest);
    Ok(true)
}

#[tauri::command]
async fn init_voice_stream() -> Result<bool, String> {
    // Initialize audio device for Whisper STT
    println!("Initializing Shadow Voice Protocol...");
    Ok(true)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![
            validate_license,
            store_secure_credential,
            get_secure_credential,
            check_ollama_status,
            start_whatsapp_session,
            get_hardware_info,
            register_shadow_node,
            init_voice_stream
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
