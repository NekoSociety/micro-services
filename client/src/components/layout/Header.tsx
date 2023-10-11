/*----------------------------------------------------------------------------
Imports
----------------------------------------------------------------------------*/
import type { FunctionComponent, HTMLAttributes } from 'react'
import React from 'react'

import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'

import { useRouter } from 'next/navigation'
import type { MenuInfo } from 'rc-menu/lib/interface'
import styled, { css } from 'styled-components'

/*----------------------------------------------------------------------------
Constants
----------------------------------------------------------------------------*/
const items: MenuProps['items'] = [
  { key: '/', label: 'Home' },
  { key: '/auth/signup', label: 'Sign Up' },
].map(({ key, label }) => {
  return {
    key,
    label,
  }
})

/*----------------------------------------------------------------------------
Functions
----------------------------------------------------------------------------*/
const Header: FunctionComponent<HTMLAttributes<HTMLElement>> = () => {
  const router = useRouter()
  const handleClick = ({ key }: MenuInfo) => router.push(key)

  return (
    <SCHeader>
      <Menu mode="horizontal" items={items} onClick={handleClick} />
    </SCHeader>
  )
}

export default Header

/*----------------------------------------------------------------------------
Styles
----------------------------------------------------------------------------*/
const SCHeader = styled(Layout.Header)`
  ${({ theme }) => css`
    align-items: center;
    display: flex;
    background: ${theme.colorBgContainer} !important;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1;
  `}
`
