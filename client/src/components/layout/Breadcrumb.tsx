/*----------------------------------------------------------------------------
Imports
----------------------------------------------------------------------------*/
import type { FunctionComponent, HTMLAttributes } from 'react'
import React from 'react'

import { Breadcrumb as AntDBreadcrumb } from 'antd'

import styled from 'styled-components'

import useBreadcrumb from '@/hooks/use-breadcrumb'

/*----------------------------------------------------------------------------
Functions
----------------------------------------------------------------------------*/
const Breadcrumb: FunctionComponent<HTMLAttributes<HTMLElement>> = () => {
  const items = [] //useBreadcrumb()
  return <SCBreadcrumb items={items} />
}

export default Breadcrumb

/*----------------------------------------------------------------------------
Styles
----------------------------------------------------------------------------*/
const SCBreadcrumb = styled(AntDBreadcrumb)`
  margin: 16px 0;
`
