// ─── Pricing ───────────────────────────────────────────────────────────────
export const PRICING_RULES = {
  petrol: 2.8,   // ₹ per km
  diesel: 2.5,
  cng: 1.8,
  electric: 1.2,
}

export const CARPE_COMMISSION = 10        // ₹ per passenger (normal)
export const CARPE_COMMISSION_PENALTY = 20 // ₹ after low rating
export const PASSENGER_ADVANCE = 50       // ₹ advance per booking
export const DRIVER_DEPOSIT = 100         // ₹ per ride posting
export const PICKUP_WINDOW_MINUTES = 40   // 40-min pickup flexibility

/** Calculate fare for a passenger segment (static prototype logic) */
export function calculateFare(distanceKm, fuelType = 'petrol') {
  const rate = PRICING_RULES[fuelType] ?? PRICING_RULES.petrol
  return Math.round(distanceKm * rate)
}

// ─── Seat Layouts ──────────────────────────────────────────────────────────
export const SEAT_LAYOUTS = {
  sedan: [
    { id: 'front', label: 'Front Passenger', row: 1, bookable: true },
    { id: 'rear-left', label: 'Rear Left', row: 2, bookable: true },
    { id: 'rear-mid', label: 'Rear Middle', row: 2, bookable: false },
    { id: 'rear-right', label: 'Rear Right', row: 2, bookable: true },
  ],
  hatchback: [
    { id: 'front', label: 'Front Passenger', row: 1, bookable: true },
    { id: 'rear-left', label: 'Rear Left', row: 2, bookable: true },
    { id: 'rear-mid', label: 'Rear Middle', row: 2, bookable: false },
    { id: 'rear-right', label: 'Rear Right', row: 2, bookable: true },
  ],
  suv: [
    { id: 'front', label: 'Front Passenger', row: 1, bookable: true },
    { id: 'rear-left', label: 'Rear Left', row: 2, bookable: true },
    { id: 'rear-mid', label: 'Rear Middle', row: 2, bookable: false },
    { id: 'rear-right', label: 'Rear Right', row: 2, bookable: true },
  ],
  mpv: [
    { id: 'front', label: 'Front Passenger', row: 1, bookable: true },
    { id: 'r2-left', label: '2nd Row Left', row: 2, bookable: true },
    { id: 'r2-mid', label: '2nd Row Middle', row: 2, bookable: false },
    { id: 'r2-right', label: '2nd Row Right', row: 2, bookable: true },
    { id: 'r3-left', label: '3rd Row Left', row: 3, bookable: true },
    { id: 'r3-mid', label: '3rd Row Middle', row: 3, bookable: false },
    { id: 'r3-right', label: '3rd Row Right', row: 3, bookable: true },
  ],
}

/** Women seat auto-allocation rule */
export function getAllocatedSeatsForWomen(count, vehicleType) {
  const layout = vehicleType === 'mpv' ? 'mpv' : 'sedan'
  if (layout === 'sedan') {
    if (count === 1) return ['front']
    if (count >= 2) return ['rear-left', 'rear-right']
  }
  if (layout === 'mpv') {
    if (count === 1) return ['front']
    if (count >= 2) return ['r2-left', 'r2-right']
  }
  return []
}

// ─── Popular Locations ─────────────────────────────────────────────────────
export const POPULAR_LOCATIONS = [
  'Bengaluru', 'Electronic City', 'HSR Layout', 'Whitefield', 'Indiranagar',
  'Mysuru', 'Ramanagara', 'Mandya', 'Puducherry', 'Chennai',
  'Hyderabad', 'Secunderabad', 'Vijayawada', 'Kochi', 'Mangaluru',
]

// ─── Mock Rides ────────────────────────────────────────────────────────────
export const MOCK_RIDES = [
  {
    id: 'ride-1',
    driverName: 'Demo Driver',
    driverRating: 4.9,
    driverRides: 42,
    driverPhone: '+91 98765 43210',
    driverVerified: true,
    avatarBg: '#5b16a6',
    vehicleModel: 'Tata Nexon',
    vehicleType: 'suv',
    vehicleColor: 'Purple',
    vehicleNumber: 'KA 01 AB 1234',
    fuelType: 'petrol',
    origin: 'Electronic City',
    destination: 'Mysuru',
    pickupPoints: ['Electronic City', 'Kengeri Bus Station', 'Ramanagara Bypass', 'Mandya Circle'],
    dropPoints: ['Mandya Circle', 'Mysuru Suburban Bus Stand'],
    date: '2026-08-09',
    time: '08:30 AM',
    seatsAvailable: 3,
    seatsTotal: 3,
    seatsOccupied: [],
    pricePerSeat: 350,
    distanceKm: 140,
    luggage: '2 Bags per rider',
    routeDescription: 'Via Bengaluru–Mysuru Expressway. AC on all the time, no smoking.',
    instantBooking: true,
    depositPaid: true,
    status: 'upcoming',
    acPolicy: 'AC on by default. Exceptions in winter or by mutual agreement.',
    vehiclePhotos: {
      front: null, back: null, left: null, right: null,
      dashboard: null, frontSeats: null, rearSeats: null, boot: null,
    },
  },
  {
    id: 'ride-4seater',
    driverName: 'Meena K.',
    driverRating: 4.7,
    driverRides: 12,
    driverPhone: '+91 98765 44444',
    driverVerified: true,
    avatarBg: '#ff7a59',
    vehicleModel: 'Honda City',
    vehicleType: 'sedan',
    vehicleColor: 'Blue',
    vehicleNumber: 'KA 07 CD 4444',
    fuelType: 'petrol',
    origin: 'Koramangala',
    destination: 'Electronic City',
    pickupPoints: ['Koramangala', 'Hoodi Circle'],
    dropPoints: ['Hoodi Circle', 'Electronic City'],
    date: '2026-08-09',
    time: '07:00 AM',
    seatsAvailable: 3,
    seatsTotal: 3,
    seatsOccupied: [],
    pricePerSeat: 120,
    distanceKm: 18,
    luggage: '1 Small bag',
    routeDescription: 'Morning commuter run.',
    instantBooking: true,
    depositPaid: false,
    status: 'upcoming',
  },
  {
    id: 'ride-5seater',
    driverName: 'Arjun P.',
    driverRating: 4.8,
    driverRides: 30,
    driverPhone: '+91 98765 55555',
    driverVerified: true,
    avatarBg: '#1e90ff',
    vehicleModel: 'Hyundai Creta',
    vehicleType: 'suv',
    vehicleColor: 'White',
    vehicleNumber: 'KA 02 EF 5555',
    fuelType: 'diesel',
    origin: 'HSR Layout',
    destination: 'Whitefield',
    pickupPoints: ['HSR Layout', 'Agara Junction', 'Bellandur'],
    dropPoints: ['Bellandur', 'Whitefield'],
    date: '2026-08-09',
    time: '09:00 AM',
    seatsAvailable: 4,
    seatsTotal: 4,
    seatsOccupied: [],
    pricePerSeat: 150,
    distanceKm: 22,
    luggage: '2 Bags per rider',
    routeDescription: 'Comfortable drive with AC.',
    instantBooking: true,
    depositPaid: true,
    status: 'upcoming',
  },
  {
    id: 'ride-6seater',
    driverName: 'Swapnil R.',
    driverRating: 4.6,
    driverRides: 18,
    driverPhone: '+91 98765 66666',
    driverVerified: true,
    avatarBg: '#8b5cf6',
    vehicleModel: 'Maruti Ertiga',
    vehicleType: 'mpv',
    vehicleColor: 'Silver',
    vehicleNumber: 'KA 03 GH 6666',
    fuelType: 'petrol',
    origin: 'Indiranagar',
    destination: 'Kolar',
    pickupPoints: ['Indiranagar', 'Hosur Road', 'Kolar Bypass'],
    dropPoints: ['Kolar Bypass', 'Kolar'],
    date: '2026-08-10',
    time: '06:30 AM',
    seatsAvailable: 5,
    seatsTotal: 5,
    seatsOccupied: [],
    pricePerSeat: 420,
    distanceKm: 120,
    luggage: '3 Bags allowed',
    routeDescription: 'Early morning intercity.',
    instantBooking: false,
    depositPaid: true,
    status: 'upcoming',
  },
  {
    id: 'ride-7seater',
    driverName: 'Neha S.',
    driverRating: 4.9,
    driverRides: 40,
    driverPhone: '+91 98765 77777',
    driverVerified: true,
    avatarBg: '#00b894',
    vehicleModel: 'Toyota Innova',
    vehicleType: 'mpv',
    vehicleColor: 'Black',
    vehicleNumber: 'KA 04 IJ 7777',
    fuelType: 'diesel',
    origin: 'Majestic',
    destination: 'Mysuru',
    pickupPoints: ['Majestic', 'Mandya Circle'],
    dropPoints: ['Mandya Circle', 'Mysuru Bus Stand'],
    date: '2026-08-12',
    time: '05:00 AM',
    seatsAvailable: 6,
    seatsTotal: 6,
    seatsOccupied: [],
    pricePerSeat: 600,
    distanceKm: 135,
    luggage: '3 Bags allowed',
    routeDescription: 'Long distance with comfortable seats.',
    instantBooking: false,
    depositPaid: true,
    status: 'upcoming',
  },
  {
    id: 'ride-8seater',
    driverName: 'Ravi K.',
    driverRating: 4.5,
    driverRides: 22,
    driverPhone: '+91 98765 88888',
    driverVerified: true,
    avatarBg: '#ffb86b',
    vehicleModel: 'Ashok Leyland Mini',
    vehicleType: 'mpv',
    vehicleColor: 'White',
    vehicleNumber: 'KA 05 KL 8888',
    fuelType: 'diesel',
    origin: 'Bengaluru',
    destination: 'Tiptur',
    pickupPoints: ['Bengaluru', 'Nelamangala'],
    dropPoints: ['Nelamangala', 'Tiptur'],
    date: '2026-08-15',
    time: '04:00 AM',
    seatsAvailable: 8,
    seatsTotal: 8,
    seatsOccupied: [],
    pricePerSeat: 250,
    distanceKm: 150,
    luggage: 'Large boot space',
    routeDescription: 'Group travel friendly.',
    instantBooking: false,
    depositPaid: false,
    status: 'upcoming',
  },
  {
    id: 'ride-2',
    driverName: 'Priya Sharma',
    driverRating: 4.8,
    driverRides: 28,
    driverPhone: '+91 98765 88990',
    driverVerified: true,
    avatarBg: '#00b936',
    vehicleModel: 'Hyundai i20',
    vehicleType: 'hatchback',
    vehicleColor: 'White',
    vehicleNumber: 'KA 05 MN 5678',
    fuelType: 'petrol',
    origin: 'HSR Layout',
    destination: 'Whitefield',
    pickupPoints: ['HSR Layout', 'Agara Junction', 'Bellandur EcoSpace', 'Marathahalli Bridge'],
    dropPoints: ['Marathahalli Bridge', 'ITPL Main Gate', 'Whitefield Hope Farm'],
    date: '2026-08-09',
    time: '09:15 AM',
    seatsAvailable: 2,
    seatsTotal: 3,
    seatsOccupied: ['rear-right'],
    pricePerSeat: 120,
    distanceKm: 22,
    luggage: '1 Small bag',
    routeDescription: 'Daily commute to ITPL. Comfortable ride with music.',
    instantBooking: true,
    depositPaid: true,
    status: 'upcoming',
    acPolicy: 'AC on by default.',
    vehiclePhotos: {
      front: null, back: null, left: null, right: null,
      dashboard: null, frontSeats: null, rearSeats: null, boot: null,
    },
  },
  {
    id: 'ride-3',
    driverName: 'Rahul Verma',
    driverRating: 4.9,
    driverRides: 64,
    driverPhone: '+91 98765 11223',
    driverVerified: true,
    avatarBg: '#2563eb',
    vehicleModel: 'Maruti Ertiga',
    vehicleType: 'mpv',
    vehicleColor: 'Silver',
    vehicleNumber: 'KA 03 EV 9900',
    fuelType: 'diesel',
    origin: 'Indiranagar',
    destination: 'Chennai',
    pickupPoints: ['Indiranagar 100ft Rd', 'Hosakote Toll', 'Kolar Bypass', 'Chittoor'],
    dropPoints: ['Chittoor', 'Vellore Bypass', 'Kanchipuram', 'Koyambedu Bus Stand'],
    date: '2026-08-10',
    time: '06:00 AM',
    seatsAvailable: 5,
    seatsTotal: 5,
    seatsOccupied: [],
    pricePerSeat: 650,
    distanceKm: 346,
    luggage: '3 Bags allowed',
    routeDescription: 'Early morning smooth highway ride. Breakfast stop at Kolar.',
    instantBooking: false,
    depositPaid: true,
    status: 'upcoming',
    acPolicy: 'AC on by default.',
    vehiclePhotos: {
      front: null, back: null, left: null, right: null,
      dashboard: null, frontSeats: null, rearSeats: null, boot: null,
    },
  },
]

const CITY_ROUTE_STOP_COUNT = 5

const fallbackStopsForCity = (city, type) => (
  Array.from({ length: CITY_ROUTE_STOP_COUNT }, (_, index) => `${city} ${type} Stop ${index + 1}`)
)

const normalizeStopList = (stops = [], city, type) => {
  const uniqueStops = [...new Set(stops.filter(Boolean))]
  const withoutCityEndpoint = uniqueStops.filter((stop) => stop !== city)
  const fallbackStops = fallbackStopsForCity(city, type)
  return [city, ...withoutCityEndpoint, ...fallbackStops].slice(0, CITY_ROUTE_STOP_COUNT + 1)
}

export function getCityRouteStops(ride) {
  const pickupPoints = normalizeStopList(ride?.pickupPoints, ride?.origin || 'Departure City', 'Departure')
  const dropPoints = normalizeStopList(ride?.dropPoints, ride?.destination || 'Arrival City', 'Arrival')

  return {
    pickupPoints,
    dropPoints,
    routeStops: [...pickupPoints, ...dropPoints],
  }
}

// ─── Mock Bookings ─────────────────────────────────────────────────────────
export const MOCK_USER_BOOKINGS = [
  {
    id: 'booking-101',
    rideId: 'ride-1',
    driverName: 'Demo Driver',
    driverPhone: '+91 98765 43210',
    vehicleModel: 'Tata Nexon',
    vehicleType: 'suv',
    vehicleNumber: 'KA 01 AB 1234',
    pickupPoint: 'Kengeri Bus Station',
    dropPoint: 'Mysuru Suburban Bus Stand',
    seatId: 'front',
    seatLabel: 'Front Passenger',
    hasTrolley: false,
    seatsBooked: 1,
    fare: 350,
    advance: 50,
    carpeCommission: 10,
    driverAdvance: 40,
    remainingToPay: 300,
    date: '2026-08-09',
    time: '08:30 AM',
    otp: '4829',
    status: 'Confirmed',
    gender: 'male',
    rated: false,
  },
]

// ─── Mock Driver Data ──────────────────────────────────────────────────────
export const MOCK_DRIVER_RIDES = [
  {
    id: 'dride-1',
    origin: 'Electronic City',
    destination: 'Mysuru',
    date: '2026-08-09',
    time: '08:30 AM',
    status: 'upcoming',
    vehicleNumber: 'KA 01 AB 1234',
    vehicleModel: 'Tata Nexon',
    passengers: [
      { name: 'Ananya R.', phone: '+91 98760 11111', pickup: 'Kengeri Bus Station', drop: 'Mysuru Suburban Bus Stand', seat: 'Front Passenger', otp: '4829', otpVerified: false, advance: 40, fare: 350 },
    ],
    totalEarnings: 350,
    advanceReceived: 40,
    depositStatus: 'paid',
    depositAmount: 100,
    commission: 10,
  },
  {
    id: 'dride-2',
    origin: 'Electronic City',
    destination: 'Coimbatore',
    date: '2026-08-05',
    time: '07:00 AM',
    status: 'completed',
    vehicleNumber: 'KA 01 AB 1234',
    vehicleModel: 'Tata Nexon',
    passengers: [
      { name: 'Suresh M.', phone: '+91 98760 22222', pickup: 'Electronic City', drop: 'Salem Bypass', seat: 'Rear Left', otp: '7731', otpVerified: true, advance: 40, fare: 420 },
      { name: 'Deepa K.', phone: '+91 98760 33333', pickup: 'Electronic City', drop: 'Coimbatore Central', seat: 'Rear Right', otp: '5522', otpVerified: true, advance: 40, fare: 560 },
    ],
    totalEarnings: 980,
    advanceReceived: 80,
    depositStatus: 'refunded',
    depositAmount: 100,
    commission: 20,
  },
]

export const MOCK_DRIVER_VEHICLES = [
  {
    id: 'veh-1',
    registrationNumber: 'KA 01 AB 1234',
    vehicleType: 'suv',
    vehicleModel: 'Tata Nexon',
    vehicleColor: 'Purple',
    fuelType: 'petrol',
    rcDetails: 'RC valid until 2031',
    verificationStatus: 'VERIFIED',
    photos: { front: true, back: true, left: true, right: true, dashboard: false, frontSeats: false, rearSeats: false, boot: false },
  },
  {
    id: 'veh-2',
    registrationNumber: 'KA 07 CD 4444',
    vehicleType: 'sedan',
    vehicleModel: 'Honda City',
    vehicleColor: 'Blue',
    fuelType: 'petrol',
    rcDetails: 'RC valid until 2030',
    verificationStatus: 'VERIFIED',
    photos: {},
  },
  {
    id: 'veh-3',
    registrationNumber: 'KA 02 EF 5555',
    vehicleType: 'suv',
    vehicleModel: 'Hyundai Creta',
    vehicleColor: 'White',
    fuelType: 'diesel',
    rcDetails: 'RC valid until 2029',
    verificationStatus: 'VERIFIED',
    photos: {},
  },
  {
    id: 'veh-4',
    registrationNumber: 'KA 03 GH 6666',
    vehicleType: 'mpv',
    vehicleModel: 'Maruti Ertiga',
    vehicleColor: 'Silver',
    fuelType: 'petrol',
    rcDetails: 'RC valid until 2032',
    verificationStatus: 'VERIFIED',
    photos: {},
  },
  {
    id: 'veh-5',
    registrationNumber: 'KA 04 IJ 7777',
    vehicleType: 'mpv',
    vehicleModel: 'Toyota Innova',
    vehicleColor: 'Black',
    fuelType: 'diesel',
    rcDetails: 'RC valid until 2028',
    verificationStatus: 'VERIFIED',
    photos: {},
  },
  {
    id: 'veh-6',
    registrationNumber: 'KA 05 KL 8888',
    vehicleType: 'mpv',
    vehicleModel: 'Mini Bus',
    vehicleColor: 'White',
    fuelType: 'diesel',
    rcDetails: 'RC valid until 2027',
    verificationStatus: 'VERIFIED',
    photos: {},
  },
]

export const MOCK_DRIVER_EARNINGS = {
  totalEarnings: 1330,
  totalAdvanceReceived: 120,
  totalCommissionDeducted: 30,
  rides: [
    { date: '2026-08-05', route: 'Electronic City → Coimbatore', passengers: 2, earnings: 980, advance: 80, commission: 20, depositRefunded: true },
    { date: '2026-07-28', route: 'Bengaluru → Mysuru', passengers: 1, earnings: 350, advance: 40, commission: 10, depositRefunded: true },
  ],
}

// ─── Route Nodes Demo ──────────────────────────────────────────────────────
export const ROUTE_NODES_DEMO = [
  { name: 'Electronic City', time: '08:30 AM', status: 'completed', distance: '0 km' },
  { name: 'Electronic City Phase 1', time: '08:38 AM', status: 'current', distance: '4 km' },
  { name: 'Bommasandra', time: '08:46 AM', status: 'upcoming', distance: '9 km' },
  { name: 'Hebbagodi', time: '08:54 AM', status: 'upcoming', distance: '13 km' },
  { name: 'Chandapura', time: '09:02 AM', status: 'upcoming', distance: '18 km' },
  { name: 'Attibele', time: '09:12 AM', status: 'upcoming', distance: '25 km' },
  { name: 'Srirangapatna', time: '10:18 AM', status: 'upcoming', distance: '118 km' },
  { name: 'Columbia Asia Mysuru', time: '10:35 AM', status: 'upcoming', distance: '130 km' },
  { name: 'Mysuru Junction', time: '10:45 AM', status: 'upcoming', distance: '136 km' },
  { name: 'Kuvempunagar', time: '10:53 AM', status: 'upcoming', distance: '140 km' },
  { name: 'Mysuru Bus Stand', time: '11:00 AM', status: 'upcoming', distance: '144 km' },
]
