export const SCREEN_ORDER = Object.freeze([
  'welcome',
  'register',
  'verifyOtp',
  'personalDetails',
  'trustedContacts',
  'becomeDriver',
  'drivingLicence',
  'vehicleDetails',
  'vehiclePhotos',
])

export const SCREEN_META = Object.freeze({
  welcome: { title: null },
  register: { title: 'Register' },
  verifyOtp: { title: 'Verify OTP' },
  personalDetails: { title: 'Personal Details' },
  trustedContacts: { title: 'Trusted Emergency Contacts' },
  becomeDriver: { title: 'Become a Driver?' },
  drivingLicence: { title: 'Driving Licence' },
  vehicleDetails: { title: 'Vehicle Details' },
  vehiclePhotos: { title: 'Vehicle Photos' },
})

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

export const VEHICLE_FIELDS = Object.freeze([
  { name: 'vehicleModel', label: 'Vehicle Model', placeholder: 'Select model', options: ['Select model', 'Maruti Swift', 'Hyundai i20', 'Tata Nexon'] },
  { name: 'vehicleColor', label: 'Vehicle Color', placeholder: 'Select color', options: ['Select color', 'Purple', 'White', 'Black'] },
  { name: 'seatingCapacity', label: 'Seating Capacity', placeholder: '4 Seats', options: ['4 Seats', '5 Seats', '7 Seats'] },
  { name: 'luggageCapacity', label: 'Luggage Capacity (Approx.)', placeholder: '2 Bags', options: ['2 Bags', '3 Bags', '4 Bags'] },
])

export const PHOTO_SLOTS = Object.freeze([
  { key: 'front', label: 'Front View' },
  { key: 'back', label: 'Back View' },
  { key: 'left', label: 'Left Side View' },
  { key: 'right', label: 'Right Side View' },
])

export const CONTACT_PHONE_NUMBERS = Object.freeze([
  '+91 98765 43210',
  '+91 98765 43211',
  '+91 98765 43212',
])

export const createInitialFormState = () => ({
  phone: '',
  otp: ['', '', '', '', '', ''],
  fullName: '',
  email: '',
  dateOfBirth: '',
  gender: '',
  driverIntent: 'yes',
  vehicleNumber: 'KA 01 AB 1234',
  vehicleModel: '',
  vehicleColor: '',
  seatingCapacity: '4 Seats',
  luggageCapacity: '2 Bags',
  contacts: CONTACT_PHONE_NUMBERS.map((phone) => ({ name: 'Contact Name', phone })),
  uploads: {
    licenceFront: null,
    licenceBack: null,
    front: null,
    back: null,
    left: null,
    right: null,
  },
})
