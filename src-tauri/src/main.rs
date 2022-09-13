#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]


mod realesrgan;
mod util;

use std::fs;

use realesrgan::{download_latest_bin, upscale};
use util::app_dir;

#[tauri::command]
fn realesrgan_upscale(input: &str, output: &str, model: &str, scale: &str, format: &str) {
    upscale(input, output, model, scale, format);
}

#[tauri::command]
async fn download_release() -> Result<(), ()> {
    download_latest_bin().await;
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            if !app_dir().exists() {
                fs::create_dir(app_dir()).expect("Failed to make app_dir");
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            download_release,
            realesrgan_upscale
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
