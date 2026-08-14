export const SCREEN_ORDER = Object.freeze([
  'roleSelect',
  'driverIntro',
  'welcome',
  'register',
  'verifyOtp',
  'aadhaarEkyc',
  'contactInfo',
  'complete',
])

export const SCREEN_META = Object.freeze({
  roleSelect: { title: null, progressStep: null },
  driverIntro: { title: 'For Drivers', progressStep: null },
  welcome: { title: null, progressStep: null },
  register: { title: 'C2C Personal Registration', progressStep: 'mobileOtp' },
  verifyOtp: { title: 'Verify OTP', progressStep: 'mobileOtp' },
  aadhaarEkyc: { title: 'Aadhaar eKYC', progressStep: 'aadhaarEkyc' },
  contactInfo: { title: 'Contact Information', progressStep: 'contactInfo' },
  complete: { title: 'Person Verified!', progressStep: 'complete' },
})

export const ROLE_OPTIONS = Object.freeze([
  Object.freeze({ id: 'passenger', label: 'I need a ride', description: 'Find a trusted carpool', accent: 'passenger' }),
  Object.freeze({ id: 'driver', label: 'I am driving', description: 'Share your empty seats', accent: 'driver' }),
])

export const PAYMENT_SUMMARY = Object.freeze({
  profileVerification: Object.freeze({ amount: 0, label: 'Free Verification' }),
  agreementCreation: Object.freeze({ amount: 99, label: 'Per Agreement', note: 'Pay ₹99 only when you create an agreement.' }),
})

export const REGISTRATION_STEPS = Object.freeze([
  { id: 'mobileOtp', label: 'Mobile OTP' },
  { id: 'aadhaarEkyc', label: 'Aadhaar eKYC' },
  { id: 'contactInfo', label: 'Contact Info' },
  { id: 'complete', label: 'Complete' },
])

export const DRIVER_OPTIONS = Object.freeze([
  {
    id: 'yes',
    title: 'Yes, I want to become a driver',
    description: ['Upload driving license and', 'vehicle details'],
  },
  {
    id: 'no',
    title: 'Not now',
    description: ['You can add this information', 'later from your profile'],
  },
])

export const VEHICLE_TYPE_OPTIONS = Object.freeze([
  { value: '', label: 'Select vehicle type' },
  { value: 'sedan', label: 'Sedan' },
  { value: 'hatchback', label: 'Hatchback' },
  { value: 'suv', label: 'Compact SUV' },
  { value: 'mpv', label: 'MPV / Large SUV (Innova / Ertiga)' },
])

export const FUEL_TYPE_OPTIONS = Object.freeze([
  { value: '', label: 'Select fuel type' },
  { value: 'petrol', label: 'Petrol' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'cng', label: 'CNG' },
  { value: 'electric', label: 'Electric' },
])

export const VEHICLE_FIELDS = Object.freeze([
  { name: 'vehicleModel', label: 'Vehicle Model', placeholder: 'e.g. Tata Nexon', type: 'text' },
  { name: 'vehicleColor', label: 'Vehicle Color', placeholder: 'e.g. White', type: 'text' },
])

export const PHOTO_SLOTS = Object.freeze([
  { key: 'front', label: 'Front View' },
  { key: 'back', label: 'Back View' },
  { key: 'left', label: 'Left Side View' },
  { key: 'right', label: 'Right Side View' },
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'frontSeats', label: 'Front Seats' },
  { key: 'rearSeats', label: 'Rear Seats' },
  { key: 'boot', label: 'Boot Space' },
])

export const CONTACT_PHONE_NUMBERS = Object.freeze([
  '+91 98765 43210',
  '+91 98765 43211',
  '+91 98765 43212',
])

export const DRIVER_VERIFICATION_STATUS = Object.freeze({
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED',
})

export const PASSENGER_CONDUCT_RULES = Object.freeze([
  'No loud music or videos without earphones.',
  'Use earphones for personal audio at all times.',
  'Respect fellow passengers and the driver.',
  'Follow driver safety instructions.',
  'No smoking or eating without driver\'s permission.',
  'Keep the vehicle clean. Carry your waste.',
])

export const createInitialFormState = () => ({
  selectedRole: null,
  registrationMode: 'login',
  authMethod: 'phone',
  phone: '',
  otp: ['', '', '', '', '', ''],
  aadhaarNumber: '',
  registrationConsent: true,
  verificationStatus: 'pending',
  paymentStatus: 'pay-on-agreement',
  profileVerificationFee: PAYMENT_SUMMARY.profileVerification.amount,
  agreementCreationFee: PAYMENT_SUMMARY.agreementCreation.amount,
  completionViewed: false,
  fullName: '',
  email: '',
  dateOfBirth: '',
  gender: '',
  driverIntent: 'yes',
  // Vehicle registration
  vehicleNumber: 'KA 01 AB 1234',
  vehicleModel: '',
  vehicleColor: '',
  vehicleType: '',
  fuelType: '',
  rcDetails: '',
  seatingCapacity: '4 Seater',
  luggageCapacity: '2 Bags',
  // Driver verification status
  driverVerificationStatus: 'PENDING',
  contacts: CONTACT_PHONE_NUMBERS.map((phone) => ({ name: 'Contact Name', phone })),
  uploads: {
    licenceFront: null,
    licenceBack: null,
    front: null,
    back: null,
    left: null,
    right: null,
    dashboard: null,
    frontSeats: null,
    rearSeats: null,
    boot: null,
  },
})
