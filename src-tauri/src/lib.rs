use cloud_api::{
    search::{self, SearchApiResponse},
    search_fixer,
};

mod cloud_api;

#[tauri::command]
fn search(query: String) -> String {
    let result = cloud_api::search::search_by_keywords(&query).unwrap_or_default();
    serde_json::to_string(&result).unwrap()
}

#[tauri::command]
fn fix_cover_url(search_response: String) -> Result<String, String> {
    let mut search_response_json: SearchApiResponse =
        serde_json::from_str(&search_response)
            .map_err(|e| format!("Failed to parse JSON: {}", e))?;

    search_fixer::fix_cover_url(&mut search_response_json)
        .map_err(|e| format!("Failed to fix cover URL: {}", e))?;

    serde_json::to_string(&search_response_json)
        .map_err(|e| format!("Failed to serialize JSON: {}", e))
}


#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet, search,fix_cover_url])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
