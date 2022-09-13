import FormLabel from '@suid/material/FormLabel'
import Stack from '@suid/material/Stack'
import { Component, For, useContext } from 'solid-js'

import { ConfigContext } from '../app'
import { Select } from './ui/select'

export const ScaleSelect: Component = () => {
  const { config, setConfig } = useContext(ConfigContext)
  return (
    <Stack spacing={2}>
      <FormLabel>Scale</FormLabel>
      <Select value={config.scale} onChange={(e) => setConfig((prev) => ({ ...prev, scale: e.currentTarget.value as any }))}>
        <For each={['2', '3', '4']}>{(item) => <option value={item}>x{item}</option>}</For>
      </Select>
    </Stack>
  )
}
