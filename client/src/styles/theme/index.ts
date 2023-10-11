import { colors, fonts, spacing } from '../tokens'

import darkTheme from './darkTheme'
import lightTheme from './lightTheme'

const themes = {
  default: {
    ...lightTheme,
  },
  darkTheme: {
    ...darkTheme,
  },
  colors,
  fonts,
  spacing,
}

export default themes
