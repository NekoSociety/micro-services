/*----------------------------------------------------------------------------
Imports
----------------------------------------------------------------------------*/
'use client'

import { useMemo } from 'react'
import type { PropsWithChildren } from 'react'

import { ConfigProvider, theme } from 'antd'

import { ThemeProvider } from 'styled-components'

import StyledComponentsRegistry from '@/app/lib/registry'
import ReduxProvider from '@/redux/redux-provider'
import themes from '@/styles/theme'

/*----------------------------------------------------------------------------
Providers
----------------------------------------------------------------------------*/
export function Providers({ children }: PropsWithChildren) {
  const themeSelected = useMemo(() => themes.default, [])
  const { getDesignToken } = theme
  const token = getDesignToken(themeSelected)

  return (
    <ReduxProvider>
      <StyledComponentsRegistry>
        <ConfigProvider theme={themeSelected}>
          <ThemeProvider theme={token}>{children}</ThemeProvider>
        </ConfigProvider>
      </StyledComponentsRegistry>
    </ReduxProvider>
  )
}
