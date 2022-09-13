import Box from '@suid/material/Box'
import Button from '@suid/material/Button'
import FormLabel from '@suid/material/FormLabel'
import Grid from '@suid/material/Grid'
import Input from '@suid/material/Input'
import { open } from '@tauri-apps/api/dialog'
import { Component, useContext } from 'solid-js'

import { ConfigContext } from '../app'

export const ImageInput: Component<{
  onChange?: (url: string) => void
}> = (props) => {
  const { config, setConfig } = useContext(ConfigContext)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <FormLabel>Input</FormLabel>
          <Input value={config.input} fullWidth readOnly />
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            onClick={async () => {
              const result = await open({
                multiple: false,
                filters: [
                  {
                    name: 'Image',
                    extensions: ['png', 'jpeg'],
                  },
                  {
                    name: 'All files',
                    extensions: ['*'],
                  },
                ],
              })
              if (typeof result !== 'string') return
              setConfig({
                ...config,
                input: result,
              })
              props.onChange?.(result)
            }}
          >
            Select file
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
