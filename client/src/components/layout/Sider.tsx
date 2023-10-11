/*----------------------------------------------------------------------------
Imports
----------------------------------------------------------------------------*/
'use client'

import type { FunctionComponent, HTMLAttributes } from 'react'
import React, { useState } from 'react'

import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'

import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'

import styled from 'styled-components'

/*----------------------------------------------------------------------------
Constants
----------------------------------------------------------------------------*/
const items: MenuProps['items'] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}))

/*----------------------------------------------------------------------------
Functions
----------------------------------------------------------------------------*/
const Sider: FunctionComponent<HTMLAttributes<HTMLElement>> = () => {
  const [collapsed, setCollapsed] = useState(true)
  const handleCollapse = (value: boolean) => setCollapsed(value)
  return (
    <SCSider collapsible collapsed={collapsed} onCollapse={handleCollapse}>
      <Menu theme="dark" mode="inline" items={items} />
    </SCSider>
  )
}

export default Sider

/*----------------------------------------------------------------------------
Styles
----------------------------------------------------------------------------*/
const SCSider = styled(Layout.Sider)`
  height: 100%;
  position: sticky !important;
  top: 0;
  left: 0;
  bottom: 0;
`
