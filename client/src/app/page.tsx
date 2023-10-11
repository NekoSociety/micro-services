/*----------------------------------------------------------------------------
Imports
----------------------------------------------------------------------------*/
import * as https from 'https'

import React from 'react'

import { Button, Col, Row, Space, Typography } from 'antd'

import axios from 'axios'
import type { NextPage } from 'next'
import { cookies, headers } from 'next/headers'

import Wrapper from '@/components/layout/Wrapper'
// import { decrement, getCount, increment, reset } from '@/redux/features/counter'
// import { useAppDispatch, useAppSelector } from '@/redux/hook'
// import { useGetCurrentUserQuery } from '@/redux/services/user-api'

/*----------------------------------------------------------------------------
Types
----------------------------------------------------------------------------*/
type TCurrentUserPayload = {
  currentUser: IUserPayload | null
}
interface IUserPayload {
  id: string
  email: string
}

/*----------------------------------------------------------------------------
Functions
----------------------------------------------------------------------------*/
const Home: NextPage = async () => {
  const { currentUser } = await getData()
  // const { isLoading, isFetching, data, error } = useGetCurrentUserQuery()

  // console.log(data)
  // const count = useAppSelector(getCount)
  // const dispatch = useAppDispatch()
  //
  // const handleIncrement = () => dispatch(increment())
  // const handleDecrement = () => dispatch(decrement())
  // const handleReset = () => dispatch(reset())

  const headersList = headers()
  const referer = headersList.get('referer')
  // we can get the current user
  // based on the authentication token stored in an HTTP-only cookie
  const nextCookies = cookies()

  return (
    <Wrapper>
      <Row>
        <Col>
          {currentUser && <Typography.Title level={2}>Welcome, {currentUser.email}</Typography.Title>}
          {/* <Typography.Title level={5}>{count}</Typography.Title> */}
        </Col>
      </Row>
      {/* <Row> */}
      {/*   <Col> */}
      {/*     <Space wrap> */}
      {/*       <Button type="primary" onClick={handleIncrement}> */}
      {/*         Increment */}
      {/*       </Button> */}
      {/*       <Button type="primary" onClick={handleDecrement}> */}
      {/*         Decrement */}
      {/*       </Button> */}
      {/*       <Button onClick={handleReset}>Reset</Button> */}
      {/*     </Space> */}
      {/*   </Col> */}
      {/* </Row> */}
    </Wrapper>
  )
}

const getData = async (): Promise<TCurrentUserPayload> => {
  const { data } = await axios.get(`${process.env.INGRESS_ADDRESS}/api/users/current`, {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  })
  return data
}
export default Home
