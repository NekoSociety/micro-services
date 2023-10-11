/*----------------------------------------------------------------------------
Imports
----------------------------------------------------------------------------*/
'use client'
import type { FunctionComponent, HTMLAttributes } from 'react'
import React from 'react'

import { Col, Layout, Row } from 'antd'

import styled, { css } from 'styled-components'

import Breadcrumb from '@/components/layout/Breadcrumb'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Sider from '@/components/layout/Sider'

/*----------------------------------------------------------------------------
Functions
----------------------------------------------------------------------------*/
const Wrapper: FunctionComponent<HTMLAttributes<HTMLElement>> = ({ children }) => {
  return (
    <Container hasSider>
      <Sider />
      <Layout style={{ minHeight: '100%' }}>
        <Header />
        <Content>
          <Breadcrumb />
          <Section>
            <Row justify="center" align="middle">
              <Col xs={20} sm={16}>
                {children}
              </Col>
            </Row>
          </Section>
        </Content>
        <Footer />
      </Layout>
    </Container>
  )
}

export default Wrapper

/*----------------------------------------------------------------------------
Styles
----------------------------------------------------------------------------*/
const Container = styled(Layout)`
  height: 100vh;
  min-height: 100vh;
  overflow: hidden;
  overflow-y: auto;
`

const Content = styled(Layout.Content)`
  align-items: stretch;
  justify-content: center;
  padding: 0 50px;
  min-height: fit-content;
`

const Section = styled(Layout)`
  ${({ theme }) => css`
    background: ${theme.colorBgContainer} !important;
    padding: 24px 0;
  `}
`
