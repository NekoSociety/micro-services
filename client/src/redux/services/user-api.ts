/*----------------------------------------------------------------------------
Imports
----------------------------------------------------------------------------*/
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

/*----------------------------------------------------------------------------
Types
----------------------------------------------------------------------------*/
export interface IUser {
  id: string
  email: string
}

export interface IUserPayload {
  email: string
  password: string
  confirm: string
  agreement: string
}

/*----------------------------------------------------------------------------
Headers
----------------------------------------------------------------------------*/
interface IHeader {
  Host: string
}

const Header: IHeader = {
  Host: process.env.HOST as string,
}

/*----------------------------------------------------------------------------
APIs
----------------------------------------------------------------------------*/
export const userApi = createApi({
  reducerPath: 'userApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.INGRESS_ADDRESS || process.env.NEXT_PUBLIC_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Host', Header['Host'])

      return headers
    },
  }),

  endpoints: (builder) => ({
    getCurrentUser: builder.query<IUser, void>({
      query: () => '/api/users/current',
    }),
    signUp: builder.mutation<IUser, IUserPayload>({
      query: (body) => ({
        url: '/api/users/signup',
        method: 'POST',
        body,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      // invalidatesTags: ['Post'],
    }),
  }),
})

export const { useGetCurrentUserQuery, useSignUpMutation } = userApi
