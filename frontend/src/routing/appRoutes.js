const ONBOARDING_PATHS = Object.freeze({
  roleSelect: '/',
  driverIntro: '/onboarding/driver-intro',
  welcome: '/onboarding/welcome',
  register: '/onboarding/register',
  verifyOtp: '/onboarding/verify-otp',
  aadhaarEkyc: '/onboarding/aadhaar',
  contactInfo: '/onboarding/contact',
  complete: '/onboarding/complete',
})

const ONBOARDING_ALIASES = Object.freeze({
  '/onboarding': 'welcome',
})

const AUTH_PATHS = Object.freeze({
  passengerLogin: '/passenger/login',
  passengerVerifyOtp: '/passenger/verify-otp',
  driverIntro: '/driver',
  driverLogin: '/driver/login',
  driverRegister: '/driver/register',
  driverVerifyOtp: '/driver/verify-otp',
  driverRegisterVerifyOtp: '/driver/register/verify-otp',
  driverAadhaar: '/driver/aadhaar',
  driverContact: '/driver/contact',
  driverComplete: '/driver/complete',
})

export const ADMIN_LOGIN_PATH = '/admin/login'

const ONBOARDING_PATH_TO_SCREEN = Object.freeze(
  Object.entries(ONBOARDING_PATHS).reduce((paths, [screen, path]) => ({
    ...paths,
    [path]: screen,
  }), {
    ...Object.entries(ONBOARDING_ALIASES).reduce((aliases, [path, screen]) => ({
      ...aliases,
      [path]: screen,
    }), {}),
  }),
)

const APP_MODES = Object.freeze(['passenger', 'driver'])
const APP_TABS = Object.freeze(['find', 'offer', 'live', 'profile'])
const MODE_TABS = Object.freeze({
  passenger: Object.freeze(['find', 'live', 'profile']),
  driver: Object.freeze(['offer', 'live', 'profile']),
})

export const ROUTE_CATEGORIES = Object.freeze({
  ONBOARDING: 'onboarding',
  APP: 'app',
  RIDE: 'ride',
  NOT_FOUND: 'notFound',
})

export function normalizePath(pathname = '/') {
  const path = pathname.split('?')[0].split('#')[0] || '/'
  if (path === '/') return path
  return `/${path.replace(/^\/+|\/+$/g, '')}`
}

export function formatOnboardingPath(screen) {
  return ONBOARDING_PATHS[screen] || ONBOARDING_PATHS.welcome
}

export function formatAuthPath(role, screen = 'login') {
  if (role === 'driver') {
    const driverScreens = {
      driverIntro: AUTH_PATHS.driverIntro,
      login: AUTH_PATHS.driverLogin,
      register: AUTH_PATHS.driverRegister,
      verifyOtp: AUTH_PATHS.driverVerifyOtp,
      registerVerifyOtp: AUTH_PATHS.driverRegisterVerifyOtp,
      aadhaarEkyc: AUTH_PATHS.driverAadhaar,
      contactInfo: AUTH_PATHS.driverContact,
      complete: AUTH_PATHS.driverComplete,
    }
    return driverScreens[screen] || AUTH_PATHS.driverLogin
  }

  return screen === 'verifyOtp' ? AUTH_PATHS.passengerVerifyOtp : AUTH_PATHS.passengerLogin
}

export function formatAdminLoginPath() {
  return ADMIN_LOGIN_PATH
}

export function formatMainAppPath(mode = 'passenger', tab = 'find') {
  if (tab === 'admin') return '/app/admin'

  const safeMode = APP_MODES.includes(mode) ? mode : 'passenger'
  const safeTab = APP_TABS.includes(tab) ? tab : safeMode === 'driver' ? 'offer' : 'find'
  return `/app/${safeMode}/${safeTab}`
}

export function formatRidePath(mode, tab, rideId) {
  return `${formatMainAppPath(mode, tab)}/ride/${encodeURIComponent(rideId)}`
}

function notFoundRoute(pathname) {
  return { kind: ROUTE_CATEGORIES.NOT_FOUND, pathname }
}

function decodeRideId(segment) {
  try {
    return decodeURIComponent(segment)
  } catch {
    return null
  }
}

export function parseAppPath(pathname = '/') {
  const normalizedPath = normalizePath(pathname)
  if (normalizedPath === ADMIN_LOGIN_PATH) {
    return { kind: ROUTE_CATEGORIES.ONBOARDING, screen: 'adminLogin', pathname: normalizedPath }
  }
  const authRoute = Object.entries(AUTH_PATHS).find(([, path]) => path === normalizedPath)
  if (authRoute) {
    const [name] = authRoute
    const isDriver = name.startsWith('driver')
    const screenByName = {
      passengerLogin: 'welcome',
      passengerVerifyOtp: 'verifyOtp',
      driverIntro: 'driverIntro',
      driverLogin: 'welcome',
      driverRegister: 'welcome',
      driverVerifyOtp: 'verifyOtp',
      driverRegisterVerifyOtp: 'verifyOtp',
      driverAadhaar: 'aadhaarEkyc',
      driverContact: 'contactInfo',
      driverComplete: 'complete',
    }
    return {
      kind: ROUTE_CATEGORIES.ONBOARDING,
      role: isDriver ? 'driver' : 'passenger',
      registrationMode: name === 'driverRegister' || name === 'driverRegisterVerifyOtp'
        ? 'register'
        : name === 'driverLogin'
          ? 'login'
          : null,
      screen: screenByName[name],
      pathname: normalizedPath,
    }
  }

  const onboardingScreen = ONBOARDING_PATH_TO_SCREEN[normalizedPath]

  // Onboarding routes are exact matches. They are resolved before app routes,
  // so an onboarding alias can never fall through into another route category.
  if (onboardingScreen) {
    return {
      kind: ROUTE_CATEGORIES.ONBOARDING,
      screen: onboardingScreen,
      pathname: normalizedPath,
    }
  }

  const segments = normalizedPath.split('/').filter(Boolean)
  if (segments[0] !== 'app') return notFoundRoute(normalizedPath)

  // Admin is a standalone app route, not an app mode or tab combination.
  if (segments.length === 2 && segments[1] === 'admin') {
    return {
      kind: ROUTE_CATEGORIES.APP,
      mode: 'passenger',
      tab: 'admin',
      pathname: normalizedPath,
    }
  }

  // Every standard app route must have exactly three segments:
  // /app/:mode/:tab. Ride details are handled separately below.
  if (segments.length !== 3 && segments.length !== 5) {
    return notFoundRoute(normalizedPath)
  }

  const mode = segments[1]
  const tab = segments[2]
  if (!APP_MODES.includes(mode) || !APP_TABS.includes(tab) || !MODE_TABS[mode].includes(tab)) {
    return notFoundRoute(normalizedPath)
  }

  if (segments.length === 3) {
    return {
      kind: ROUTE_CATEGORIES.APP,
      mode,
      tab,
      pathname: normalizedPath,
    }
  }

  if (segments[3] !== 'ride' || !segments[4]) {
    return notFoundRoute(normalizedPath)
  }

  const rideId = decodeRideId(segments[4])
  if (!rideId) return notFoundRoute(normalizedPath)

  return {
    kind: ROUTE_CATEGORIES.RIDE,
    mode,
    tab,
    rideId,
    pathname: normalizedPath,
  }
}
