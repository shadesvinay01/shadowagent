use serde::{Deserialize, Serialize};
use keyring::Entry;
use tauri_plugin_shell::ShellExt;

#[derive(Debug, Serialize, Deserialize)]
pub struct LicenseResponse {
    success: bool,
    token: Option<String>,
    expires_at: Option<u64>,
    error: Option<String>,
}

use jsonwebtoken::{decode, DecodingKey, Validation, Algorithm};

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String,
    exp: usize,
    license_key: String,
}

#[tauri::command]
async fn validate_license(email: String, license_key: String) -> Result<LicenseResponse, String> {
    // In a production app, you would fetch this JWT from your server
    // For local validation, we check the token signature and expiration
    
    let secret = "SHADOW_SERVER_SECRET_2026"; // In a real app, this would be a public key or handled via HTTPS
    
    // Simulate getting a token from a previous successful activation
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIiwiZXhwIjoxNzc4NDU3NjAwLCJsaWNlbnNlX2tleSI6IlNIQURPVy0xMjM0LTU2NzgifQ...";

    let mut validation = Validation::new(Algorithm::HS256);
    validation.set_required_spec_claims(&["exp", "sub"]);

    match decode::<Claims>(
        &token,
        &DecodingKey::from_secret(secret.as_ref()),
        &validation,
    ) {
        Ok(token_data) => {
            if token_data.claims.sub == email && token_data.claims.license_key == license_key {
                Ok(LicenseResponse {
                    success: true,
                    token: Some(token.to_string()),
                    expires_at: Some(token_data.claims.exp as u64),
                    error: None,
                })
            } else {
                Ok(LicenseResponse {
                    success: false,
                    token: None,
                    expires_at: None,
                    error: Some("Identity mismatch".to_string()),
                })
            }
        },
        Err(_) => Ok(LicenseResponse {
            success: false,
            token: None,
            expires_at: None,
            error: Some("Invalid or expired license token".to_string()),
        }),
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
async fn check_ollama_status(app_handle: tauri::AppHandle) -> Result<bool, String> {
    // Simple check if Ollama is running on default port 11434
    let client = reqwest::Client::new();
    let res = client.get("http://localhost:11434/api/tags").send().await;
    Ok(res.is_ok())
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
            start_whatsapp_session
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
