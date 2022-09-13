import Button from '@suid/material/Button'
import Stack from '@suid/material/Stack'
import Typography from '@suid/material/Typography'
import { path } from '@tauri-apps/api'
import { dirname } from '@tauri-apps/api/path'
import { invoke } from '@tauri-apps/api/tauri'
import { createContext, createSignal, Setter } from 'solid-js'
import { createStore } from 'solid-js/store'

import { FormatSelect } from './components/format-select'
import { ImageInput } from './components/image-input'
import { ImageOutput } from './components/image-output'
import { ModelSelect } from './components/model-select'
import { OutputNameFormatInput } from './components/output-name-format-input'
import { ScaleSelect } from './components/scale-select'

type Config = {
  input: string
  output: string
  model: 'realesr-animevideov3' | 'realesrgan-x4plus' | 'realesrgan-x4plus-anime' | 'realesrnet-x4plus'
  scale: '2' | '3' | '4'
  format: 'jpg' | 'png' | 'webp'
  output_format: string
}
type ConfigContextType = {
  config: Config
  setConfig: Setter<Config>
}

export const ConfigContext = createContext<ConfigContextType>({} as ConfigContextType)

export const App = () => {
  const [config, setConfig] = createStore<Config>({
    input: '',
    output: '',
    model: 'realesr-animevideov3',
    scale: '4',
    format: 'png',
    output_format: '{input}-{model}-x{scale}',
  })
  const [loading, setLoading] = createSignal(false)

  return (
    <ConfigContext.Provider
      value={{
        config: config,
        setConfig: setConfig,
      }}
    >
      <Stack spacing={2} sx={{ padding: '1rem' }}>
        <Typography variant="h2">REAL-ESRGAN-UI</Typography>
        <ImageInput
          onChange={async (url) => {
            const output = await dirname(url)
            console.log(output)
            setConfig((prev) => ({ ...prev, output }))
          }}
        />
        <ImageOutput />
        <OutputNameFormatInput />
        <ModelSelect />
        <ScaleSelect />
        <FormatSelect />
        <Button
          variant="contained"
          disabled={loading()}
          onClick={async () => {
            // eslint-disable-next-line solid/reactivity
            const { output_format, ...args } = config
            args.output = await path.join(
              args.output,
              output_format
                .replace(/{input}/g, await path.basename(args.input))
                .replace(/{model}/g, args.model)
                .replace(/{scale}/g, args.scale) + `.${args.format}`,
            )
            setLoading(true)
            await invoke('realesrgan_upscale', { ...args })
            setLoading(false)
          }}
        >
          Process
        </Button>
      </Stack>
    </ConfigContext.Provider>
  )
}
