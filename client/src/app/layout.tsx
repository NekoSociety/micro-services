/*----------------------------------------------------------------------------
Imports
----------------------------------------------------------------------------*/
import type React from 'react'

import { variables } from '@/app/fonts'
import { Providers } from '@/app/providers'
import GlobalStyles from '@/styles/global-styles'

/*----------------------------------------------------------------------------
Head
----------------------------------------------------------------------------*/
export const metadata = {
  title: 'Bicholango Store Dev',
  description: 'Bicholango Fashion Oasis',
}

/*----------------------------------------------------------------------------
Page
----------------------------------------------------------------------------*/
const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={variables}>
      <Providers>
        <GlobalStyles />
        {children}
      </Providers>
    </body>
  </html>
)

export default RootLayout
