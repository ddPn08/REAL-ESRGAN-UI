import FormLabel from '@suid/material/FormLabel'
import Stack from '@suid/material/Stack'
import { Component, For, useContext } from 'solid-js'

import { ConfigContext } from '../app'
import { Select } from './ui/select'

export const ModelSelect: Component = () => {
  const { config, setConfig } = useContext(ConfigContext)
  return (
    <Stack spacing={2}>
      <FormLabel>Model</FormLabel>
      <Select value={config.model} onChange={(e) => setConfig((prev) => ({ ...prev, model: e.currentTarget.value as any }))}>
        <For each={['realesr-animevideov3', 'realesrgan-x4plus', 'realesrgan-x4plus-anime', 'realesrnet-x4plus'] as const}>
          {(item) => <option value={item}>{item}</option>}
        </For>
      </Select>
    </Stack>
  )
}
