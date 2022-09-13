import { invoke } from '@tauri-apps/api'

export const setup = async () => {
    await invoke('download_release')
}
