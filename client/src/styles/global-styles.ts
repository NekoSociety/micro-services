'use client'
import { createGlobalStyle, css } from 'styled-components'

import { reset } from './reset'

// workaround for formatting of global styles
// https://github.com/prettier/prettier/pull/9025#issuecomment-678655928
const styles = css``

const GlobalStyles = createGlobalStyle`
  ${reset}
  ${styles}
`

export default GlobalStyles
