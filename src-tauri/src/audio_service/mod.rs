use std::{
    io::{BufReader, Cursor},
    sync::Arc,
    time::Duration,
};

use rodio::{OutputStream, Sink};
use serde::Serialize;
use tokio::{
    sync::{
        broadcast::{self, Sender},
        Mutex,
    },
    time::sleep,
};

pub struct AudioService {
    pub event_sender: Sender<AudioEvent>,
    _stream: OutputStream, // sink need the stream, ensuring that their lifecycles are the same
    pub sink: Arc<Mutex<Sink>>,
}

#[derive(Serialize, Debug)]
pub struct AudioFile {
    pub id: i32,
    pub file_name: String,
}

impl AudioService {
    pub fn new() -> Self {
        let (event_sender, mut event_receiver) = broadcast::channel(100);
        let (_stream, handle) = OutputStream::try_default().unwrap();
        let sink = Arc::new(Mutex::new(Sink::try_new(&handle).unwrap()));
        let sink_clone = Arc::clone(&sink);

        tokio::spawn(async move {
            while let Ok(event) = event_receiver.recv().await {
                let sink = sink_clone.lock().await;
                match event {
                    AudioEvent::PlayUrl(url) => {
                        let response = reqwest::get(url).await.unwrap();

                        if response.status().is_success() {
                            let bytes = response
                                .bytes()
                                .await
                                .expect("Failed to read response bytes");
                            let cursor = Cursor::new(bytes);
                            let source = rodio::Decoder::new(BufReader::new(cursor)).unwrap();

                            sink.clear();
                            if sink.is_paused() {
                                sink.append(source);
                                sink.play();
                            }

                            while !sink.empty() {
                                let _ = sleep(Duration::from_millis(100));
                            }
                        } else {
                            eprintln!("Failed to fetch the MP3 file: {}", response.status());
                        }
                    }
                    AudioEvent::Recovery => {
                        sink.play();
                    }
                    AudioEvent::Pause => {
                        sink.pause();
                    }
                    AudioEvent::Volume(volume) => {
                        sink.set_volume(volume / 50.0);
                    }
                }
            }
        });

        Self {
            event_sender,
            _stream,
            sink,
        }
    }
}

#[derive(Debug, Clone)]
pub enum AudioEvent {
    PlayUrl(String),
    Recovery,
    Pause,
    Volume(f32),
}
