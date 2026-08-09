import { useCallback, useEffect, useState } from 'react'
import { normalizePath, parseAppPath } from './appRoutes'

function getCurrentRoute() {
  return parseAppPath(window.location.pathname)
}

export default function useAppRouter() {
  const [route, setRoute] = useState(getCurrentRoute)

  const syncFromUrl = useCallback(() => {
    setRoute(getCurrentRoute())
  }, [])

  useEffect(() => {
    window.addEventListener('popstate', syncFromUrl)
    return () => window.removeEventListener('popstate', syncFromUrl)
  }, [syncFromUrl])

  const navigate = useCallback((path, { replace = false } = {}) => {
    const nextPath = normalizePath(path)
    const currentPath = normalizePath(window.location.pathname)
    const historyMethod = replace ? 'replaceState' : 'pushState'

    if (nextPath !== currentPath) {
      window.history[historyMethod]({}, '', nextPath)
    }

    setRoute(parseAppPath(nextPath))
  }, [])

  return { route, navigate, syncFromUrl }
}
