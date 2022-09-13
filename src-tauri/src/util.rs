use std::path::{Path, PathBuf};

use tauri::api::path::{data_dir};

pub fn app_dir() -> PathBuf {
    Path::new(&data_dir().unwrap()).join("realesrgan-ui")
}
