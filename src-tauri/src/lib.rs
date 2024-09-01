use audio_service::{AudioEvent, AudioService};
use cloud_api::{search::SearchApiResponse, search_fixer};
use tokio::sync::broadcast::Sender;

mod audio_service;
mod cloud_api;

#[tauri::command]
async fn search(query: String) -> String {
    let result = cloud_api::search::search_by_keywords(&query)
        .await
        .unwrap_or_default();
    serde_json::to_string(&result).unwrap()
}

#[tauri::command]
async fn fix_cover_url(search_response: String) -> Result<String, String> {
    let mut search_response_json: SearchApiResponse = serde_json::from_str(&search_response)
        .map_err(|e| format!("Failed to parse JSON: {}", e))?;

    search_fixer::fix_cover_url(&mut search_response_json)
        .await
        .map_err(|e| format!("Failed to fix cover URL: {}", e))?;

    serde_json::to_string(&search_response_json)
        .map_err(|e| format!("Failed to serialize JSON: {}", e))
}

#[tauri::command]
fn play_url(sender: tauri::State<Sender<AudioEvent>>, url: String) {
    let _ = sender.send(AudioEvent::PlayUrl(url.to_owned()));
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub async fn run() {
    let audio_service = AudioService::new();
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            search,
            fix_cover_url,
            play_url
        ])
        .manage(audio_service.event_sender)
        .manage(audio_service.sink)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
