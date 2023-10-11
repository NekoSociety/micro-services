/*----------------------------------------------------------------------------
Imports
----------------------------------------------------------------------------*/
import type { FunctionComponent, HTMLAttributes } from 'react'
import React from 'react'

import { Layout } from 'antd'

import styled from 'styled-components'

/*----------------------------------------------------------------------------
Functions
----------------------------------------------------------------------------*/
const Footer: FunctionComponent<HTMLAttributes<HTMLElement>> = () => {
  return <SCFooter>Ant Design ©2023 Created by Ant UED</SCFooter>
}

export default Footer

/*----------------------------------------------------------------------------
Styles
----------------------------------------------------------------------------*/
const SCFooter = styled(Layout.Footer)`
  text-align: center;
`
