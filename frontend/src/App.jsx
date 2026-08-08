import { useState } from 'react'
import MobileShell from './components/MobileShell'
import MainAppShell from './components/MainAppShell'
import { createInitialFormState, SCREEN_ORDER } from './data/onboardingData'
import { MOCK_RIDES, MOCK_USER_BOOKINGS } from './data/carpoolData'

import WelcomeScreen from './screens/WelcomeScreen'
import RegisterScreen from './screens/RegisterScreen'
import VerifyOtpScreen from './screens/VerifyOtpScreen'
import PersonalDetailsScreen from './screens/PersonalDetailsScreen'
import TrustedContactsScreen from './screens/TrustedContactsScreen'
import BecomeDriverScreen from './screens/BecomeDriverScreen'
import DrivingLicenceScreen from './screens/DrivingLicenceScreen'
import VehicleDetailsScreen from './screens/VehicleDetailsScreen'
import VehiclePhotosScreen from './screens/VehiclePhotosScreen'

import FindRidesScreen from './screens/FindRidesScreen'
import OfferRideScreen from './screens/OfferRideScreen'
import LivePoolMapScreen from './screens/LivePoolMapScreen'
import ProfileScreen from './screens/ProfileScreen'

const screenComponents = {
  welcome: WelcomeScreen,
  register: RegisterScreen,
  verifyOtp: VerifyOtpScreen,
  personalDetails: PersonalDetailsScreen,
  trustedContacts: TrustedContactsScreen,
  becomeDriver: BecomeDriverScreen,
  drivingLicence: DrivingLicenceScreen,
  vehicleDetails: VehicleDetailsScreen,
  vehiclePhotos: VehiclePhotosScreen,
}

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome')
  const [formData, setFormData] = useState(createInitialFormState)

  // Main Carpool App State
  const [appMode, setAppMode] = useState('passenger') // 'passenger' | 'driver'
  const [activeTab, setActiveTab] = useState('find') // 'find' | 'offer' | 'live' | 'profile'
  const [rides, setRides] = useState(MOCK_RIDES)
  const [bookings, setBookings] = useState(MOCK_USER_BOOKINGS)

  const currentIndex = SCREEN_ORDER.indexOf(currentScreen)

  const goNext = () => {
    if (currentIndex === SCREEN_ORDER.length - 1 || (currentScreen === 'becomeDriver' && formData.driverIntent === 'no')) {
      setCurrentScreen('mainApp')
    } else {
      setCurrentScreen(SCREEN_ORDER[Math.min(currentIndex + 1, SCREEN_ORDER.length - 1)])
    }
  }

  const goBack = () => {
    if (currentScreen === 'mainApp') {
      setCurrentScreen('welcome')
    } else {
      setCurrentScreen(SCREEN_ORDER[Math.max(currentIndex - 1, 0)])
    }
  }

  const exploreMainApp = () => {
    setCurrentScreen('mainApp')
  }

  const updateField = (field, value) => {
    setFormData((previous) => ({ ...previous, [field]: value }))
  }

  const updateOtp = (index, value) => {
    setFormData((previous) => {
      const otp = [...previous.otp]
      otp[index] = value
      return { ...previous, otp }
    })
  }

  const addContact = () => {
    setFormData((previous) => ({
      ...previous,
      contacts: [...previous.contacts, { name: 'New Contact', phone: '+91 98765 43213' }],
    }))
  }

  const updateContact = (index, field, value) => {
    setFormData((previous) => ({
      ...previous,
      contacts: previous.contacts.map((contact, contactIndex) => (
        contactIndex === index ? { ...contact, [field]: value } : contact
      )),
    }))
  }

  const handleUpload = (slot, file) => {
    setFormData((previous) => ({
      ...previous,
      uploads: { ...previous.uploads, [slot]: file },
    }))
  }

  const handlePublishRide = (newRide) => {
    setRides((prev) => [newRide, ...prev])
    setActiveTab('live')
  }

  const handleBookRide = (newBooking) => {
    setBookings((prev) => [newBooking, ...prev])
  }

  const toggleMode = () => {
    setAppMode((prev) => (prev === 'passenger' ? 'driver' : 'passenger'))
  }

  // Render Main Carpool App when onboarding is complete or exploring prototype
  if (currentScreen === 'mainApp') {
    return (
      <MobileShell>
        <MainAppShell
          activeTab={activeTab}
          onTabChange={setActiveTab}
          mode={appMode}
          onModeToggle={toggleMode}
          onEmergencySos={() => setActiveTab('profile')}
        >
          {activeTab === 'find' && (
            <FindRidesScreen rides={rides} onBookRide={handleBookRide} />
          )}

          {activeTab === 'offer' && (
            <OfferRideScreen formData={formData} onPublishRide={handlePublishRide} />
          )}

          {activeTab === 'live' && (
            <LivePoolMapScreen bookings={bookings} />
          )}

          {activeTab === 'profile' && (
            <ProfileScreen
              formData={formData}
              onGoToOnboarding={() => setCurrentScreen('welcome')}
              onEmergencySos={() => {}}
            />
          )}
        </MainAppShell>
      </MobileShell>
    )
  }

  // Render Onboarding Flow
  const ScreenComponent = screenComponents[currentScreen]

  return (
    <MobileShell>
      <ScreenComponent
        formData={formData}
        onBack={goBack}
        onNext={goNext}
        onExploreApp={exploreMainApp}
        onFieldChange={updateField}
        onOtpChange={updateOtp}
        onContactAdd={addContact}
        onContactChange={updateContact}
        onUpload={handleUpload}
      />
    </MobileShell>
  )
}

export default App
