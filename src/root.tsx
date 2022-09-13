import { createTheme, ThemeProvider } from '@suid/material'
import Box from '@suid/material/Box'
import Typography from '@suid/material/Typography'
import { Component, createSignal, JSX, Show } from 'solid-js'
import { createGlobalStyles } from 'solid-styled-components'

import { setup } from './setup'

const GlobalStyles = createGlobalStyles`
  *,
  ::before,
  ::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: inherit;
  }

  * {
    font-family: 'Inter', 'sans-serif';
  }

  html {
    word-break: break-word;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: none;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    font-size: 16px;
    line-height: 1.5;
    word-break: break-word;
    background-color: #444444;
    color: white;
  }

  input {
    color: white;
  }

  label {
    color: white;
  }

  ol,
  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  @media (hover: hover) and (pointer: fine) {
    a:hover {
      text-decoration: none;
    }
  }

  img {
    height: auto;
    max-width: 100%;
  }

  h3 {
    font-weight: normal;
  }
`

const theme = createTheme({
  palette: {
    primary: {
      main: '#333333',
      dark: '#222222',
      light: '#555555',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
    background: {
      default: '#444444',
    },
  },
})

const FallBack = () => (
  <Box sx={{ display: 'flex' }} height="100vh" alignItems="center" justifyContent="center">
    <Typography variant="h1">Loading ...</Typography>
  </Box>
)

const Providers: Component<{ children: JSX.Element }> = (props) => <ThemeProvider theme={theme}>{props.children}</ThemeProvider>

export const Root: Component<{ children: JSX.Element }> = (props) => {
  const [loaded, setLoaded] = createSignal(false)
  setup().then(() => setLoaded(true))
  return (
    <>
      <GlobalStyles />
      <Show when={loaded()} fallback={<FallBack />}>
        <Providers>{props.children}</Providers>
      </Show>
    </>
  )
}
