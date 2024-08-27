mod cloud_api;

#[tauri::command]
fn search(query: String) -> String {
    let result = cloud_api::search_by_keywords(&query).unwrap_or_default();
    serde_json::to_string(&result).unwrap()
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet, search])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
