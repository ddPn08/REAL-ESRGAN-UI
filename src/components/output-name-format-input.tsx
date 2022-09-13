import TextField from '@suid/material/TextField'
import { Component, useContext } from 'solid-js'

import { ConfigContext } from '../app'

export const OutputNameFormatInput: Component = () => {
  const { config, setConfig } = useContext(ConfigContext)

  return (
    <TextField
      label="output flename"
      variant="standard"
      value={config.output_format}
      onChange={(e) => setConfig((prev) => ({ ...prev, output_format: e.currentTarget.value }))}
    />
  )
}
