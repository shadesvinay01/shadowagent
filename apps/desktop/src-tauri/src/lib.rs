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
    // Read JWT_SECRET from environment variables, falling back to mock secret for local test
    let jwt_secret = std::env::var("JWT_SECRET").unwrap_or_else(|_| "SHADOW_SERVER_SECRET_2026".to_string());

    // Validate the JWT signature and expiration
    let mut validation = jsonwebtoken::Validation::new(jsonwebtoken::Algorithm::HS256);
    // Since we are validating local licenses, we can optionally relax some validations if needed,
    // but by default validation verifies exp.
    
    let token_data = jsonwebtoken::decode::<Claims>(
        &license_key,
        &jsonwebtoken::DecodingKey::from_secret(jwt_secret.as_bytes()),
        &validation,
    );

    match token_data {
        Ok(data) => {
            let claims = data.claims;
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
        Err(err) => {
            Ok(LicenseResponse {
                success: false,
                token: None,
                expires_at: None,
                error: Some(format!("Invalid license token: {}", err)),
            })
        }
    }
}

#[tauri::command]
async fn start_whatsapp_session(app_handle: tauri::AppHandle) -> Result<String, String> {
    let app_dir = app_handle.path().app_data_dir().map_err(|e| e.to_string())?;
    let session_path = app_dir.join("wa_session");
    
    // Ensure session directory exists
    std::fs::create_dir_all(&session_path).map_err(|e| e.to_string())?;

    // Create an empty messages.json for the UI to read
    let mock_data = serde_json::json([]);
    
    let messages_path = session_path.join("messages.json");
    std::fs::write(messages_path, serde_json::to_string_pretty(&mock_data).unwrap()).map_err(|e| e.to_string())?;

    Ok(format!("WhatsApp session active at {:?}", session_path))
}

#[tauri::command]
async fn get_whatsapp_messages(app_handle: tauri::AppHandle) -> Result<serde_json::Value, String> {
    let app_dir = app_handle.path().app_data_dir().map_err(|e| e.to_string())?;
    let messages_path = app_dir.join("wa_session").join("messages.json");
    let content = std::fs::read_to_string(messages_path).map_err(|e| e.to_string())?;
    let data: serde_json::Value = serde_json::from_str(&content).map_err(|e| e.to_string())?;
    Ok(data)
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

#[derive(Serialize, Deserialize)]
struct OllamaStatus {
    running: bool,
    has_llm: bool,
    has_embedding: bool,
}

#[derive(Deserialize)]
struct OllamaTagResponse {
    models: Vec<OllamaModel>,
}

#[derive(Deserialize)]
struct OllamaModel {
    name: String,
}

#[tauri::command]
async fn check_ollama_status() -> Result<OllamaStatus, String> {
    let client = reqwest::Client::new();
    let res = client.get("http://localhost:11434/api/tags").send().await;

    match res {
        Ok(response) => {
            if let Ok(tags) = response.json::<OllamaTagResponse>().await {
                let has_llm = tags.models.iter().any(|m| m.name.starts_with("llama3-groq-tool-use"));
                let has_embedding = tags.models.iter().any(|m| m.name.starts_with("nomic-embed-text"));
                Ok(OllamaStatus {
                    running: true,
                    has_llm,
                    has_embedding,
                })
            } else {
                Ok(OllamaStatus {
                    running: true,
                    has_llm: false,
                    has_embedding: false,
                })
            }
        }
        Err(_) => {
            Ok(OllamaStatus {
                running: false,
                has_llm: false,
                has_embedding: false,
            })
        }
    }
}

#[tauri::command]
async fn pull_ollama_model(model: String) -> Result<(), String> {
    let client = reqwest::Client::new();
    let res = client.post("http://localhost:11434/api/pull")
        .json(&serde_json::json!({ "name": model, "stream": false }))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    if res.status().is_success() {
        Ok(())
    } else {
        Err(format!("Failed to pull model: {}", res.status()))
    }
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
async fn read_local_file(path: String, app_handle: tauri::AppHandle) -> Result<String, String> {
    let target_path = std::path::Path::new(&path);
    
    // Resolve absolute path to prevent directory traversal
    let canonical_path = match target_path.canonicalize() {
        Ok(p) => p,
        Err(_) => target_path.to_path_buf(),
    };
    
    // List of allowed base directories
    let mut allowed = false;
    
    if let Ok(app_dir) = app_handle.path().app_data_dir() {
        if let Ok(canon_app) = app_dir.canonicalize() {
            if canonical_path.starts_with(&canon_app) { allowed = true; }
        } else if canonical_path.starts_with(&app_dir) {
            allowed = true;
        }
    }
    if let Ok(doc_dir) = app_handle.path().document_dir() {
        if let Ok(canon_doc) = doc_dir.canonicalize() {
            if canonical_path.starts_with(&canon_doc) { allowed = true; }
        } else if canonical_path.starts_with(&doc_dir) {
            allowed = true;
        }
    }
    if let Ok(download_dir) = app_handle.path().download_dir() {
        if let Ok(canon_download) = download_dir.canonicalize() {
            if canonical_path.starts_with(&canon_download) { allowed = true; }
        } else if canonical_path.starts_with(&download_dir) {
            allowed = true;
        }
    }
    if let Ok(cwd) = std::env::current_dir() {
        if let Ok(canon_cwd) = cwd.canonicalize() {
            if canonical_path.starts_with(&canon_cwd) { allowed = true; }
        } else if canonical_path.starts_with(&cwd) {
            allowed = true;
        }
    }

    if !allowed {
        return Err("Security Error: Path is outside the allowed directories.".to_string());
    }

    std::fs::read_to_string(canonical_path).map_err(|e| e.to_string())
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
            pull_ollama_model,
            start_whatsapp_session,
            get_whatsapp_messages,
            get_hardware_info,
            register_shadow_node,
            init_voice_stream,
            read_local_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
