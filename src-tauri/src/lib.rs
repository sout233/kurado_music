use std::{io::{BufReader, Cursor}, sync::Mutex, thread::sleep, time::Duration};

use cloud_api::{search::SearchApiResponse, search_fixer};
use once_cell::sync::Lazy;
use rodio::{Decoder, OutputStream, Sink};

mod cloud_api;

#[tauri::command]
fn search(query: String) -> String {
    let result = cloud_api::search::search_by_keywords(&query).unwrap_or_default();
    serde_json::to_string(&result).unwrap()
}

#[tauri::command]
fn fix_cover_url(search_response: String) -> Result<String, String> {
    let mut search_response_json: SearchApiResponse = serde_json::from_str(&search_response)
        .map_err(|e| format!("Failed to parse JSON: {}", e))?;

    search_fixer::fix_cover_url(&mut search_response_json)
        .map_err(|e| format!("Failed to fix cover URL: {}", e))?;

    serde_json::to_string(&search_response_json)
        .map_err(|e| format!("Failed to serialize JSON: {}", e))
}

#[tauri::command]
async fn play_audio(url: String) -> Result<(), String> {
    let _ = tokio::task::spawn_blocking(move || {
        let (_stream, stream_handle) = OutputStream::try_default().unwrap();
        let sink = Sink::try_new(&stream_handle).unwrap();

        let response = reqwest::blocking::get(&url).unwrap();

        if response.status().is_success() {
            let bytes = response.bytes().unwrap();
            let cursor = Cursor::new(bytes);
            let source = rodio::Decoder::new(BufReader::new(cursor)).unwrap();

            sink.append(source);

            while !sink.empty() {
                std::thread::sleep(Duration::from_millis(100));
            }
        } else {
            eprintln!("Failed to fetch the MP3 file: {}", response.status());
        }
    })
    .await
    .map_err(|e| e.to_string());

    Ok(())
}


#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            search,
            fix_cover_url,
            play_audio
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
