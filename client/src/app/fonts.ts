/*----------------------------------------------------------------------------
Imports
----------------------------------------------------------------------------*/
import { Nunito_Sans, Space_Grotesk } from 'next/font/google'

/*----------------------------------------------------------------------------
Fonts
----------------------------------------------------------------------------*/
export const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  weight: ['400', '500'],
})

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: '600',
})

export const variables = `${nunitoSans.variable} ${spaceGrotesk.variable}`
