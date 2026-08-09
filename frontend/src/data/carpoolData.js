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
    driverName: 'Jagadeesh O.',
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

// ─── Mock Bookings ─────────────────────────────────────────────────────────
export const MOCK_USER_BOOKINGS = [
  {
    id: 'booking-101',
    rideId: 'ride-1',
    driverName: 'Jagadeesh O.',
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
  { name: 'Kengeri Bus Station', time: '08:55 AM', status: 'current', distance: '18 km' },
  { name: 'Ramanagara Bypass', time: '09:30 AM', status: 'upcoming', distance: '45 km' },
  { name: 'Mandya Circle', time: '10:15 AM', status: 'upcoming', distance: '82 km' },
  { name: 'Mysuru Bus Stand', time: '11:00 AM', status: 'upcoming', distance: '140 km' },
]
