use serde::{Deserialize, Serialize};

use crate::cloud_api::search::SearchApiResponse;

#[derive(Serialize, Deserialize, Debug)]
struct Artist {
    id: u64,
    name: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct Album {
    id: u64,
    name: String,
    #[serde(rename = "picUrl")]
    pic_url: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct Song {
    name: String,
    id: u64,
    ar: Vec<Artist>,
    al: Album,
}

#[derive(Serialize, Deserialize, Debug)]
struct SongDetailResponse {
    songs: Vec<Song>,
}

pub(crate) async fn fix_cover_url(
    predata: &mut SearchApiResponse,
) -> Result<(), Box<dyn std::error::Error>> {
    let ids = predata
        .result
        .songs
        .iter()
        .map(|s| s.id.to_string())
        .collect::<Vec<String>>();

    let ids = format!("{}", ids.join(","));

    println!("ids: {:#?}", ids);
    let url = format!("https://re-wyy-api.sout.eu.org/song/detail?ids={}", ids);

    let response = reqwest::get(&url).await?;
    let result: SongDetailResponse = response.json().await?;

    for song in result.songs {
        predata
            .result
            .songs
            .iter_mut()
            .find(|s| s.id == song.id)
            .unwrap()
            .album
            .cover_url = Some(song.al.pic_url.clone());
    }

    Ok(())
}