import Box from '@suid/material/Box'
import Button from '@suid/material/Button'
import FormLabel from '@suid/material/FormLabel'
import Grid from '@suid/material/Grid'
import Input from '@suid/material/Input'
import { open } from '@tauri-apps/api/dialog'
import { useContext } from 'solid-js'

import { ConfigContext } from '../app'

export const ImageOutput = () => {
  const { config, setConfig } = useContext(ConfigContext)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <FormLabel>Output</FormLabel>
          <Input value={config.output} fullWidth readOnly />
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            onClick={async () => {
              const result = await open({
                multiple: false,
                directory: true,
              })
              if (typeof result !== 'string') return
              setConfig((prev) => ({ ...prev, output: result }))
            }}
          >
            Select directory
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
