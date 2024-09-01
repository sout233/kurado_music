use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug)]
pub struct Song {
    pub id: u64,
    pub name: String,
    pub artists: Vec<Artist>,
    pub album: Album,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Artist {
    name: String,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Album {
    #[serde(rename = "picUrl")]
    pub cover_url: Option<String>,
}

#[derive(Deserialize, Serialize, Debug)]
pub(crate) struct ResultData {
    pub songs: Vec<Song>,
}

#[derive(Deserialize, Serialize, Debug)]
pub(crate) struct SearchApiResponse {
    pub result: ResultData,
}

impl Default for SearchApiResponse {
    fn default() -> Self {
        Self {
            result: ResultData { songs: vec![] },
        }
    }
}

pub(crate) async fn search_by_keywords(
    keywords: &str,
) -> Result<SearchApiResponse, Box<dyn std::error::Error>> {
    let url = format!(
        "https://re-wyy-api.sout.eu.org/search?keywords={}",
        keywords
    );
    let response = reqwest::get(&url).await?;
    let result: SearchApiResponse = response.json().await?;
    Ok(result)
}
