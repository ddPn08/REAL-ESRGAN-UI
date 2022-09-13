/* @refresh reload */
import { render } from 'solid-js/web'

import { App } from './app'
import { Root } from './root'

render(
  () => (
    <Root>
      <App />
    </Root>
  ),
  document.getElementById('root') as HTMLElement,
)
