/*----------------------------------------------------------------------------
Imports
----------------------------------------------------------------------------*/
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import { useRouter } from 'next/navigation'

import { toPascalCase } from '@/utils'

/*----------------------------------------------------------------------------
Functions
----------------------------------------------------------------------------*/
const generatePathParts = (string: string) => {
  const pathWithoutQuery = string.split('?')[0]
  return pathWithoutQuery.split('/').filter((v) => v.length > 0)
}

//   const getDefaultTextGenerator = React.useCallback((subpath) => {
//     return {
//       "post": "Posts",
//       "settings": "User Settings",
//     }[subpath] || titleize(subpath);
//   }, [])

//  const getTextGenerator = React.useCallback((param, query) => {
//     return {
//       "post_id": () => await fetchAPI(`/posts/${query.post_id}/`).title,
//     }[param];
//   }, []);

/*----------------------------------------------------------------------------
Hooks
----------------------------------------------------------------------------*/
const useBreadcrumb = () => {
  const router = useRouter()
  const asPathNestedRoutes = generatePathParts(router.asPath)
  const pathnameNestedRoutes = generatePathParts(router.pathname)

  const crumblist = asPathNestedRoutes.map((subpath, idx) => {
    const param = pathnameNestedRoutes[idx].replace('[', '').replace(']', '')
    const href = '/' + asPathNestedRoutes.slice(0, idx + 1).join('/')
    // The title will just be the route string for now
    const title = toPascalCase(subpath)
    return { href, title }
  })

  return [{ href: '/', title: 'Home' }, ...crumblist] as ItemType[]
}

export default useBreadcrumb
