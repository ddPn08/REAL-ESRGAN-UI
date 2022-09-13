use std::{
    env::consts::OS,
    fs::{self, File},
    io::{Cursor, Write},
};

use tauri::api::process::Command;
use zip::ZipArchive;

use crate::util::app_dir;

fn update_available(latest: &String) -> bool {
    let meta_path = &app_dir().join("release.meta");

    if meta_path.exists() {
        let meta_content = &fs::read_to_string(meta_path).expect("Failed to read release meta");
        if meta_content == latest {
            return false;
        }
    } else {
        File::create(meta_path).expect("Failed to create meta file");
    }

    let mut meta = fs::OpenOptions::new()
        .write(true)
        .open(meta_path)
        .expect("Failed to open meta file");
    meta.write_all(latest.as_bytes())
        .expect("Failed to write meta file");
    true
}

pub async fn download_latest_bin() {
    let octocrab = octocrab::instance();
    let page = octocrab
        .repos("xinntao", "Real-ESRGAN")
        .releases()
        .list()
        .send()
        .await;
    match page {
        Ok(page) => {
            let latest = &page.items[0];
            if !update_available(&latest.tag_name) {
                return;
            }

            let assets = &latest.assets;
            let target = assets
                .into_iter()
                .find(|asset| asset.name.contains(&OS.replace("linux", "ubuntu")))
                .expect("Failed to find release");
            let download_url = &target.browser_download_url;

            let response = reqwest::get(download_url.as_str())
                .await
                .expect("Failed to download release");
            let bytes = response.bytes().await.expect("");
            let mut zip = ZipArchive::new(Cursor::new(bytes)).expect("Failed to read zip file");

            zip.extract(app_dir().join("realesrgan"))
                .expect("Failed to extract release");
        }
        Err(e) => {
            println!("Failed to get release: {:?}", e);
        }
    }
}

pub fn upscale(input: &str, output: &str, model: &str, scale: &str, format: &str) {
    let binary_dir = app_dir().join("realesrgan");
    let cmd = if cfg!(target_os = "windows") {
        Command::new(
            binary_dir
                .join("realesrgan-ncnn-vulkan.exe")
                .to_str()
                .unwrap(),
        )
    } else {
        Command::new(binary_dir.join("realesrgan-ncnn-valkan").to_str().unwrap())
    };
    cmd.current_dir(binary_dir)
        .args([
            "-i", input, "-o", output, "-n", model, "-s", scale, "-f", format,
        ])
        .output()
        .expect("Failed to run realesrgan");
}
