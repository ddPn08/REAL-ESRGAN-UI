import FormLabel from '@suid/material/FormLabel'
import Stack from '@suid/material/Stack'
import { Component, For, useContext } from 'solid-js'

import { ConfigContext } from '../app'
import { Select } from './ui/select'

export const FormatSelect: Component = () => {
  const { config, setConfig } = useContext(ConfigContext)
  return (
    <Stack spacing={2}>
      <FormLabel>Format</FormLabel>
      <Select value={config.format} onChange={(e) => setConfig((prev) => ({ ...prev, format: e.currentTarget.value as any }))}>
        <For each={['jpg', 'png', 'webp'] as const}>{(item) => <option value={item}>{item}</option>}</For>
      </Select>
    </Stack>
  )
}
