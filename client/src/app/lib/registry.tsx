/*----------------------------------------------------------------------------
Imports
----------------------------------------------------------------------------*/
'use client'

import type { PropsWithChildren } from 'react'
import React, { useMemo, useState } from 'react'

import { StyleProvider, createCache, extractStyle, px2remTransformer } from '@ant-design/cssinjs'
import type Entity from '@ant-design/cssinjs/es/Cache'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

const px2rem = px2remTransformer()
/*----------------------------------------------------------------------------
Library
----------------------------------------------------------------------------*/
const StyledComponentsRegistry = ({ children }: PropsWithChildren) => {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  const cache = useMemo<Entity>(() => createCache(), [])

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return (
      <>
        {styles}
        <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />
      </>
    )
  })

  return (
    <StyleProvider cache={cache} transformers={[px2rem]}>
      <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>{children}</StyleSheetManager>
    </StyleProvider>
  )
}

export default StyledComponentsRegistry
