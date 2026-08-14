import { useEffect, useState } from 'react'
import MobileShell from './components/MobileShell'
import MainAppShell from './components/MainAppShell'
import { createInitialFormState, SCREEN_ORDER } from './data/onboardingData'
import { formatAdminLoginPath, formatAuthPath, formatMainAppPath, formatOnboardingPath } from './routing/appRoutes'
import useAppRouter from './routing/useAppRouter'
import { MOCK_RIDES, MOCK_USER_BOOKINGS } from './data/carpoolData'

import RoleSelectionScreen from './screens/RoleSelectionScreen'
import DriverIntroScreen from './screens/DriverIntroScreen'
import PassengerAuthScreen from './screens/PassengerAuthScreen'
import DriverAuthScreen from './screens/DriverAuthScreen'
import AdminLoginScreen from './screens/AdminLoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import VerifyOtpScreen from './screens/VerifyOtpScreen'
import PersonalDetailsScreen from './screens/PersonalDetailsScreen'
import ContactInfoScreen from './screens/ContactInfoScreen'
import CompletionScreen from './screens/CompletionScreen'
import RouteNotFoundScreen from './screens/RouteNotFoundScreen'

import FindRidesScreen from './screens/FindRidesScreen'
import OfferRideScreen from './screens/OfferRideScreen'
import LivePoolMapScreen from './screens/LivePoolMapScreen'
import PassengerLivePoolScreen from './screens/PassengerLivePoolScreen'
import DriverProfileScreen from './screens/DriverProfileScreen'
import PassengerProfileScreen from './screens/PassengerProfileScreen'
import AdminDashboard from './screens/AdminDashboard'

const screenComponents = {
  roleSelect: RoleSelectionScreen,
  driverIntro: DriverIntroScreen,
  register: RegisterScreen,
  verifyOtp: VerifyOtpScreen,
  aadhaarEkyc: PersonalDetailsScreen,
  contactInfo: ContactInfoScreen,
  complete: CompletionScreen,
  adminLogin: AdminLoginScreen,
}

function App() {
  const { route, navigate } = useAppRouter()
  const [formData, setFormData] = useState(() => {
    const initialState = createInitialFormState()
    try {
      const savedRole = window.sessionStorage.getItem('carpe:selected-role')
      return savedRole === 'passenger' || savedRole === 'driver'
        ? { ...initialState, selectedRole: savedRole }
        : initialState
    } catch {
      return initialState
    }
  })
  const [flowError, setFlowError] = useState('')
  const [authenticatedRole, setAuthenticatedRole] = useState(() => {
    try {
      const savedRole = window.sessionStorage.getItem('carpe:authenticated-role')
      return savedRole === 'passenger' || savedRole === 'driver' ? savedRole : null
    } catch {
      return null
    }
  })
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try { return window.sessionStorage.getItem('carpe:admin-authenticated') === 'true' } catch { return false }
  })

  useEffect(() => {
    try {
      if (formData.selectedRole) {
        window.sessionStorage.setItem('carpe:selected-role', formData.selectedRole)
      } else {
        window.sessionStorage.removeItem('carpe:selected-role')
      }
    } catch {
      // Session storage is optional in private browsing and test environments.
    }
  }, [formData.selectedRole])

  useEffect(() => {
    if (route.kind !== 'onboarding' || !route.role) return
    setFormData((previous) => ({
      ...previous,
      selectedRole: route.role,
      registrationMode: route.registrationMode || previous.registrationMode,
    }))
  }, [route.kind, route.role, route.registrationMode])

  useEffect(() => {
    if ((route.kind !== 'app' && route.kind !== 'ride')) return
    if (route.tab === 'admin') {
      if (!isAdminAuthenticated) navigate(formatAdminLoginPath(), { replace: true })
      return
    }
    if (!authenticatedRole) {
      navigate(formatAuthPath(route.mode, 'login'), { replace: true })
      return
    }
    if (route.mode !== authenticatedRole) {
      navigate(formatMainAppPath(authenticatedRole, authenticatedRole === 'driver' ? 'offer' : 'find'), { replace: true })
    }
  }, [authenticatedRole, isAdminAuthenticated, navigate, route.kind, route.mode, route.tab])

  const [rides, setRides] = useState(MOCK_RIDES)
  const [bookings, setBookings] = useState(MOCK_USER_BOOKINGS)

  const currentScreen = route.kind === 'onboarding' ? route.screen : route.kind === 'notFound' ? 'notFound' : 'mainApp'
  const appMode = route.mode || 'passenger'
  const activeTab = route.tab || (appMode === 'driver' ? 'offer' : 'find')
  const currentIndex = SCREEN_ORDER.indexOf(currentScreen)

  const handleRoleSelect = (role) => {
    if (role !== 'passenger' && role !== 'driver') return
    setFlowError('')
    setFormData((previous) => ({ ...previous, selectedRole: role }))
    navigate(formatAuthPath(role, 'login'))
  }

  const handleDriverIntroContinue = () => {
    setFlowError('')
    setFormData((previous) => ({ ...previous, selectedRole: 'driver', registrationMode: 'register' }))
    navigate(formatAuthPath('driver', 'register'))
  }

  const goNext = () => {
    const phoneDigits = formData.phone.replace(/\D/g, '')
    const isDriver = formData.selectedRole === 'driver'
    const otpComplete = formData.otp.every(Boolean)
    const aadhaarDigits = formData.aadhaarNumber.replace(/\D/g, '')
    const emailIsValid = !formData.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    const isEmailAuth = formData.authMethod === 'email' && !(isDriver && formData.registrationMode === 'register')

    if (currentScreen === 'roleSelect') {
      handleRoleSelect(formData.selectedRole || 'passenger')
      return
    }

    if (currentScreen === 'driverIntro') {
      handleDriverIntroContinue()
      return
    }

    if (currentScreen === 'welcome') {
      if (isEmailAuth ? !formData.email || !emailIsValid : phoneDigits.length !== 10) {
        setFlowError(isEmailAuth ? 'Enter a valid email address to continue.' : 'Enter a valid 10-digit mobile number to continue.')
        return
      }

      setFlowError('')
      // Login and Register share one OTP verification screen, but use
      // distinct paths so the registration mode is preserved for drivers.
      const otpScreen = isDriver && formData.registrationMode === 'register' ? 'registerVerifyOtp' : 'verifyOtp'
      navigate(formatAuthPath(formData.selectedRole, otpScreen))
      return
    }

    if (currentScreen === 'register' && phoneDigits.length !== 10) {
      setFlowError('Enter a valid 10-digit mobile number to continue.')
      return
    }

    if (currentScreen === 'verifyOtp' && !otpComplete) {
      setFlowError('Enter all 6 digits from the OTP sent to your mobile number.')
      return
    }

    if (currentScreen === 'verifyOtp' && !isDriver) {
      setFlowError('')
      setAuthenticatedRole('passenger')
      try { window.sessionStorage.setItem('carpe:authenticated-role', 'passenger') } catch {}
      navigate(formatMainAppPath('passenger', 'find'))
      return
    }

    if (currentScreen === 'verifyOtp' && isDriver && formData.registrationMode !== 'register') {
      setFlowError('')
      setAuthenticatedRole('driver')
      try { window.sessionStorage.setItem('carpe:authenticated-role', 'driver') } catch {}
      navigate(formatMainAppPath('driver', 'offer'))
      return
    }

    if (currentScreen === 'aadhaarEkyc' && aadhaarDigits.length !== 12) {
      setFlowError('Enter a valid 12-digit Aadhaar number to continue.')
      return
    }

    if (currentScreen === 'contactInfo' && !emailIsValid) {
      setFlowError('Enter a valid email address or leave this field blank.')
      return
    }

    setFlowError('')

    if (currentScreen === 'contactInfo') {
      if (!isDriver) {
        navigate(formatMainAppPath('passenger', 'find'))
        return
      }
      setFormData((previous) => ({
        ...previous,
        verificationStatus: 'verified',
        completionViewed: false,
      }))
      navigate(formatAuthPath('driver', 'complete'))
      return
    }

    if (currentScreen === 'complete') {
      const completedMode = formData.selectedRole === 'driver' ? 'driver' : 'passenger'
      setFormData((previous) => ({ ...previous, completionViewed: true }))
      setAuthenticatedRole(completedMode)
      try { window.sessionStorage.setItem('carpe:authenticated-role', completedMode) } catch {}
      navigate(formatMainAppPath(completedMode, completedMode === 'driver' ? 'offer' : 'find'))
      return
    }

    const nextScreen = SCREEN_ORDER[Math.min(currentIndex + 1, SCREEN_ORDER.length - 1)]
    navigate(formData.selectedRole ? formatAuthPath(formData.selectedRole, nextScreen) : formatOnboardingPath(nextScreen))
  }

  const goBack = () => {
    if (currentScreen === 'mainApp') {
      navigate('/')
      return
    }

    if (currentScreen === 'notFound') {
      navigate('/')
      return
    }

    if (currentScreen === 'driverIntro') {
      navigate(formatAuthPath('driver', 'login'))
      return
    }

    if (currentScreen === 'welcome') {
      navigate(formData.selectedRole === 'driver' && formData.registrationMode === 'register' ? formatAuthPath('driver', 'driverIntro') : '/')
      return
    }

    if (currentScreen === 'verifyOtp' && formData.selectedRole === 'passenger') {
      navigate(formatAuthPath('passenger', 'login'))
      return
    }

    if (currentScreen === 'verifyOtp' && formData.selectedRole === 'driver') {
      navigate(formatAuthPath('driver', formData.registrationMode === 'register' ? 'register' : 'login'))
      return
    }

    const previousScreen = SCREEN_ORDER[Math.max(currentIndex - 1, 0)]
    navigate(formData.selectedRole ? formatAuthPath(formData.selectedRole, previousScreen) : formatOnboardingPath(previousScreen))
  }

  const setActiveTab = (tab) => {
    navigate(formatMainAppPath(appMode, tab))
  }

  const exploreMainApp = () => {
    navigate(formatMainAppPath(appMode, appMode === 'driver' ? 'offer' : 'find'))
  }

  const updateField = (field, value) => {
    setFlowError('')
    setFormData((previous) => ({ ...previous, [field]: value }))
  }

  const setRegistrationMode = (registrationMode) => {
    setFormData((previous) => ({ ...previous, registrationMode, authMethod: 'phone' }))
    setFlowError('')
    if (formData.selectedRole === 'driver') {
      navigate(formatAuthPath('driver', registrationMode === 'register' ? 'driverIntro' : 'login'))
    }
  }

  const useEmailAuthentication = () => {
    setFlowError('')
    setFormData((previous) => ({ ...previous, authMethod: 'email', otp: ['', '', '', '', '', ''] }))
  }

  const handleSocialSignIn = (provider) => {
    const role = formData.selectedRole === 'driver' ? 'driver' : 'passenger'
    setFlowError('')
    setFormData((previous) => ({ ...previous, socialProvider: provider }))
    setAuthenticatedRole(role)
    try {
      window.sessionStorage.setItem('carpe:authenticated-role', role)
      window.sessionStorage.setItem('carpe:social-provider', provider)
    } catch {}
    navigate(formatMainAppPath(role, role === 'driver' ? 'offer' : 'find'))
  }

  const updateOtp = (index, value) => {
    setFlowError('')
    setFormData((previous) => {
      const otp = [...previous.otp]
      otp[index] = value
      return { ...previous, otp }
    })
  }

  const handlePublishRide = (newRide) => {
    setRides((previous) => [newRide, ...previous])
    setActiveTab('live')
  }

  const handleBookRide = (newBooking) => {
    setBookings((previous) => [newBooking, ...previous])
    if (newBooking.seatId) {
      setRides((previous) => previous.map((ride) => {
        if (ride.id !== newBooking.rideId) return ride
        const seatsOccupied = [...(ride.seatsOccupied || []), newBooking.seatId]
        const seatsAvailable = Math.max(0, (ride.seatsTotal || ride.seatsAvailable || 0) - seatsOccupied.length)
        return { ...ride, seatsOccupied, seatsAvailable }
      }))
    } else {
      setRides((previous) => previous.map((ride) => (
        ride.id === newBooking.rideId
          ? { ...ride, seatsAvailable: Math.max(0, (ride.seatsAvailable || 0) - (newBooking.seatsBooked || 1)) }
          : ride
      )))
    }
  }

  const chooseRole = (role) => {
    handleRoleSelect(role)
  }

  const handleAdminLogin = (username, password) => {
    if (username !== 'admin' || password !== 'admin123') return false
    setIsAdminAuthenticated(true)
    try { window.sessionStorage.setItem('carpe:admin-authenticated', 'true') } catch {}
    navigate('/app/admin')
    return true
  }

  if (route.kind === 'notFound') {
    return (
      <MobileShell>
        <RouteNotFoundScreen pathname={route.pathname} onGoHome={() => navigate('/')} />
      </MobileShell>
    )
  }

  if (currentScreen === 'mainApp') {
    return (
      <MobileShell>
        <MainAppShell
          activeTab={activeTab}
          onTabChange={setActiveTab}
          mode={appMode}
          onEmergencySos={() => setActiveTab('profile')}
          onAdminBack={() => navigate('/')}
          hideChrome={activeTab === 'admin'}
        >
          {activeTab === 'find' && (
            <FindRidesScreen
              rides={rides}
              onBookRide={handleBookRide}
              initialRideId={route.kind === 'ride' ? route.rideId : undefined}
            />
          )}
          {activeTab === 'offer' && <OfferRideScreen formData={formData} onPublishRide={handlePublishRide} />}
          {activeTab === 'live' && (
            appMode === 'driver' ? (
              <LivePoolMapScreen bookings={bookings} />
            ) : (
              <PassengerLivePoolScreen bookings={bookings} rides={rides} />
            )
          )}
          {activeTab === 'admin' && <AdminDashboard />}
          {activeTab === 'profile' && (
            appMode === 'driver' ? (
            <DriverProfileScreen
              formData={formData}
              onGoToOnboarding={() => navigate(formatAuthPath(appMode, 'login'))}
              onEmergencySos={() => {}}
            />
            ) : (
            <PassengerProfileScreen
              formData={formData}
              onGoToOnboarding={() => navigate(formatAuthPath(appMode, 'login'))}
              onEmergencySos={() => {}}
            />
            )
          )}
        </MainAppShell>
      </MobileShell>
    )
  }

  const ScreenComponent = currentScreen === 'welcome'
    ? (formData.selectedRole === 'driver' ? DriverAuthScreen : PassengerAuthScreen)
    : screenComponents[currentScreen]

  return (
    <MobileShell>
      <ScreenComponent
        formData={formData}
        onBack={goBack}
        onNext={goNext}
        onExploreApp={exploreMainApp}
        onChooseRole={chooseRole}
        onSelectRole={handleRoleSelect}
        onFieldChange={updateField}
        onRegistrationModeChange={setRegistrationMode}
        onSocialSignIn={handleSocialSignIn}
        onUseEmail={useEmailAuthentication}
        onOtpChange={updateOtp}
        error={flowError}
        onComplete={goNext}
        onOpenAdmin={() => navigate(formatAdminLoginPath())}
        onAdminLogin={handleAdminLogin}
      />
    </MobileShell>
  )
}

export default App
