use serde::{Deserialize, Serialize};
use reqwest::blocking::get;

#[derive(Deserialize, Serialize, Debug)]
struct Song {
    id: i64,
    name: String,
    artists: Vec<Artist>,
    album: Album,
}

#[derive(Deserialize, Serialize, Debug)]
struct Artist {
    name: String,
}

#[derive(Deserialize, Serialize, Debug)]
struct Album {
    #[serde(rename = "picUrl")]
    cover_url: Option<String>,
}

#[derive(Deserialize, Serialize, Debug)]
struct ResultData {
    songs: Vec<Song>,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct ApiResponse {
    result: ResultData,
}

impl Default for ApiResponse {
    fn default() -> Self {
        Self { result: ResultData { songs: vec![] }}
    }
}

pub(crate) fn search_by_keywords(keywords: &str) -> Result<ApiResponse, Box<dyn std::error::Error>> {
    let url = format!("https://re-wyy-api.sout.eu.org/search?keywords={}", keywords);
    let response = get(&url)?;
    let result: ApiResponse = response.json()?;
    Ok(result)
}