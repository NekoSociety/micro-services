import type { AliasToken } from 'antd/es/theme/internal'
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends AliasToken {}
}
