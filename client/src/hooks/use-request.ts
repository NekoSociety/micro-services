/*----------------------------------------------------------------------------
Imports
----------------------------------------------------------------------------*/
import { useState } from 'react'

import axios from 'axios'
import type { Method } from 'axios'

type TRequestParams = {
  method: Method
  url: string
  body: never
}
/*----------------------------------------------------------------------------
Hook
----------------------------------------------------------------------------*/
const useRequest = () => {
  const [errors, setErrors] = useState([])

  const doRequest: (params: TRequestParams) => Promise<never> = async ({ method, url, body }) => {
    try {
      setErrors([])
      const response = await axios[method](url, body)
      return response.data
    } catch (e) {
      console.error(e.response.data)
      setErrors(e.response.data.errors)
    }
  }

  return { doRequest, errors }
}

export default useRequest
