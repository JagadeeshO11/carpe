# CarPe – Existing Project Enhancement & Missing Feature Implementation

You are working on an **existing CarPe intercity ride-sharing / carpooling application**.

## IMPORTANT INSTRUCTION

**DO NOT rebuild the project from scratch.**

First, inspect the complete existing codebase, database/schema, APIs, authentication, frontend pages, components, services, routes, controllers, middleware, and existing functionality.

Your job is to:

1. Understand what has already been implemented.
2. Identify which CarPe requirements already exist.
3. Identify which requirements are partially implemented.
4. Identify which requirements are completely missing.
5. Implement only the missing or incomplete functionality.
6. Preserve all existing working functionality.
7. Do not unnecessarily change existing architecture, UI, APIs, database structure, or naming conventions.
8. Reuse existing components, utilities, services, hooks, middleware, and database models wherever possible.
9. If an existing implementation conflicts with the requirements below, modify it carefully instead of duplicating functionality.
10. Do not create duplicate models, routes, components, functions, validations, or APIs.

---

# PHASE 1 – CODEBASE AUDIT

Before making changes, inspect:

- Frontend structure
- Backend structure
- Database schema
- Authentication
- OTP system
- User model
- Driver functionality
- Passenger functionality
- Vehicle functionality
- Ride functionality
- Booking functionality
- Payment functionality
- Maps integration
- Notifications
- Rating system
- Emergency functionality
- Admin functionality
- Existing validations
- Existing APIs
- Existing UI

Create an internal implementation checklist mapping every requirement below to:

- ✅ Already implemented
- 🟡 Partially implemented
- ❌ Missing
- 🔧 Needs modification

Do not stop after the audit. Continue implementing the missing functionality.

---

# CARPE CORE REQUIREMENTS

## 1. USER / PASSENGER REGISTRATION

Every user can operate as both:

- Passenger
- Driver

Passenger registration requires:

- Mobile number
- OTP verification
- Three trusted emergency contacts

Trusted contacts must be editable later.

Validate:

- Valid mobile number
- OTP
- Required emergency contacts
- Duplicate account handling

---

# 2. DRIVER VERIFICATION

A passenger can become a driver later.

Driver verification must require:

- Full name
- Mobile number
- OTP verification
- Driving Licence
- Profile photo
- Vehicle registration number
- Vehicle type
- Fuel type
- RC details where applicable
- Vehicle photos

Driver verification should have an appropriate status such as:

- PENDING
- VERIFIED
- REJECTED

Only verified drivers should be allowed to post rides.

---

# 3. VEHICLE MANAGEMENT

A driver can register a maximum of **3 vehicles**.

For every vehicle store:

- Vehicle registration number
- Vehicle type
- Fuel type
- RC details
- Front photo
- Left side photo
- Right side photo
- Rear photo
- Dashboard photo
- Front seats photo
- Rear seats photo
- Boot space photo

Vehicle registration number must be globally unique.

### Critical rule

The same vehicle registration number must NEVER belong to two different user accounts.

Implement:

- Database unique constraint
- Backend validation
- Appropriate error response
- Frontend validation/message

Before creating a ride, driver must select one of their verified registered vehicles.

---

# 4. VEHICLE TYPES

Support at minimum:

### Sedan
Passenger seats:

- Front Passenger = 1
- Rear Left = 1
- Rear Right = 1

Total = 3 passengers

Rear middle seat must NOT be bookable.

### Hatchback

Same seating model as Sedan.

### Compact SUV

Same seating model as Sedan.

### MPV / Large SUV

Examples:

- Innova
- Ertiga

Passenger seats:

- Front Passenger = 1
- Second Row Left = 1
- Second Row Right = 1
- Third Row Left = 1
- Third Row Right = 1

Total = 5 passengers.

Middle seats must NOT be bookable.

---

# 5. RIDE CREATION

A verified driver must select:

- Registered vehicle
- Journey date
- Journey time
- Origin city
- Destination city

Driver can define:

- Maximum 5 pickup points
- Maximum 5 drop points

Pickup/drop points must follow the actual journey route sequentially.

Example:

Hyderabad
↓
Secunderabad
↓
Uppal
↓
LB Nagar
↓
Vanasthalipuram
↓
Nandigama
↓
Vijayawada
↓
Gannavaram
↓
Hanuman Junction
↓
Nuzividu

Do not allow arbitrary points that are significantly off-route.

Use the existing Google Maps integration if already available.

If Google Maps integration does not exist, design the implementation so it can be integrated cleanly without hardcoding route distances.

---

# 6. ROUTE VALIDATION

Pickup and drop points must be validated against the selected route.

Rules:

- Pickup must occur before drop.
- Pickup points must follow route order.
- Drop points must follow route order.
- Maximum 5 pickup points.
- Maximum 5 drop points.
- Prevent duplicate points.
- Prevent reverse-direction points.
- Prevent locations significantly outside the route.

If Google Maps Directions API already exists in the project, reuse it.

Do not create a second maps integration.

---

# 7. SEARCH LOGIC

Passenger searches:

Origin → Destination

The search must return rides that pass through the requested journey.

Example:

Driver route:

Hyderabad
→ Vijayawada
→ Nuzividu

Passenger searches:

Hyderabad → Vijayawada

The ride MUST appear.

Passenger searches:

Hyderabad → Nuzividu

The ride MUST appear.

Passenger searches:

Hyderabad → intermediate city

The ride should appear when that city exists sequentially on the route.

Also support:

Passenger origin = intermediate pickup point

Passenger destination = later point on the same route.

Do not restrict matching only to the driver's exact origin and destination.

---

# 8. COMPANY-CONTROLLED FARE

Drivers must NOT manually set passenger fares.

CarPe controls pricing.

Fare must depend on:

- Passenger pickup point
- Passenger drop point
- Distance
- Vehicle fuel type
- CarPe pricing algorithm

Create/use a centralized pricing service.

Do not duplicate fare calculations across controllers/components.

The same fare calculation should be used for:

- Search
- Booking
- Booking confirmation
- Driver earnings
- Admin reporting

---

# 9. FARE / COMMISSION

Default CarPe commission:

**₹10 per passenger**

Example:

Passenger fare = ₹200

Driver receives:

₹190

CarPe:

₹10

However, passenger booking advance works differently.

Passenger pays:

**₹50 advance**

From this:

Normal ride:

- ₹10 CarPe commission
- ₹40 driver advance

Remaining fare is paid directly to driver.

Example:

Total fare = ₹200

Advance = ₹50

At booking:

CarPe receives ₹50

After successful ride:

- ₹10 → CarPe
- ₹40 → Driver
- Remaining ₹150 → Driver directly from passenger

Make the financial calculation consistent throughout the system.

---

# 10. DRIVER RIDE DEPOSIT

Every ride posting requires:

**₹100 refundable deposit**

Rules:

Ride completed:

₹100 refunded to driver.

Driver cancels:

₹100 forfeited.

Implement proper ride/deposit status tracking.

Do not simply delete the deposit record.

Maintain transaction history.

---

# 11. PASSENGER BOOKING ADVANCE

Passenger pays:

**₹50 advance**

Purpose:

Prevent fake bookings.

If ride is completed:

- ₹10 → CarPe
- ₹40 → Driver
- Remaining fare → Driver directly from passenger

If passenger performs a late cancellation:

₹50 is forfeited.

Implement cancellation rules clearly and centrally.

---

# 12. DIGITAL SEAT SELECTION

Create a digital seat map similar to RedBus.

Seat availability must come from actual bookings.

Available seats:

- Selectable
- Clearly visible

Occupied seats:

- Disabled
- Non-selectable

Do NOT allow double booking.

Seat booking must be transaction-safe.

Use database transaction/locking where necessary.

---

# 13. WOMEN SEAT ALLOCATION

Implement the following rules.

### Sedan / Hatchback / Compact SUV

If one female passenger books:

Automatically allocate:

**Front Passenger Seat**

If two female passengers book:

Automatically allocate:

**Rear Left + Rear Right**

Female passengers should not be seated beside male passengers.

### Exception

If the booking is husband + wife:

Normal seat allocation applies.

Do not blindly force female seat allocation in husband-wife bookings.

Design the data model so the relationship/exception can be explicitly handled rather than relying on fragile frontend logic.

---

# 14. MPV / LARGE SUV SEATING

Seat map:

Front Passenger
Second Row Left
Second Row Right
Third Row Left
Third Row Right

Total:

**5 passengers**

Middle seats must remain unavailable.

---

# 15. BOOT SPACE RESERVATION

Passengers must specify whether they are carrying trolley luggage.

Rule:

One passenger can reserve:

**Maximum 1 trolley**

Boot space must be digitally allocated.

If passenger does not reserve boot space:

They cannot later claim reserved boot capacity.

Small personal bags can remain with passenger.

Booking should store:

- Has trolley
- Trolley count
- Boot reservation status

Prevent over-allocation.

---

# 16. VEHICLE VISIBILITY

Before booking, passenger must be able to view actual vehicle photos.

Display:

- Front
- Left
- Right
- Rear
- Dashboard
- Front seats
- Rear seats
- Boot

Do not use generic vehicle images if actual registered vehicle photos exist.

---

# 17. JOURNEY OTP VERIFICATION

Before journey begins:

Passenger receives a journey OTP.

Passenger gives OTP to driver.

Driver enters OTP.

Ride starts only after successful OTP verification.

Implement states such as:

BOOKED
→ OTP_PENDING
→ VERIFIED
→ JOURNEY_STARTED
→ COMPLETED

Prevent:

- Wrong OTP
- Reusing OTP
- Starting ride without verification
- Starting ride before allowed journey time

---

# 18. EMERGENCY BUTTON

Passenger must have an Emergency button during an active ride.

When pressed:

Immediately obtain passenger's live/current location.

Share location with:

- Trusted Contact 1
- Trusted Contact 2
- Trusted Contact 3

Record:

- Emergency timestamp
- Passenger
- Ride
- Latitude
- Longitude
- Emergency status

Design the system so location sharing can later support real-time tracking if required.

Do not expose sensitive emergency data unnecessarily.

---

# 19. AIR CONDITIONING POLICY

All vehicles are considered AC by default.

Fare assumes AC usage.

Exceptions may apply during:

- Winter
- Heavy rain
- Mutual agreement among passengers

Store this policy cleanly and display it during ride/booking where appropriate.

Do not allow drivers to alter the base fare because of AC usage.

---

# 20. ETA CALCULATION

Use Google Maps for:

- Journey duration
- Estimated arrival
- Estimated drop time

Reuse existing Google Maps integration if available.

If not available, isolate the Maps service behind a backend service/interface.

Do not place API keys in frontend code.

---

# 21. 40-MINUTE PICKUP FLEXIBILITY

Every ride has a 40-minute pickup window.

Example:

Ride time:

4:00 PM

Pickup window:

4:00 PM – 4:40 PM

Passengers must see this before booking.

The system should calculate/display:

- Scheduled time
- Earliest pickup
- Latest pickup
- ETA where available

Do not treat 4:40 PM as a separate ride time.

---

# 22. DRIVER RATING SYSTEM

Passengers rate drivers:

**1–5 stars**

If a passenger gives:

**3 stars or below**

The driver's NEXT ride gets special commission handling.

Normal:

₹10 CarPe commission

Next ride:

₹20 CarPe commission

Therefore driver receives:

₹30 instead of ₹40 from the ₹50 booking advance.

After that next ride:

Commission returns to:

₹10

Important:

The penalty applies only to the **next eligible ride**, not permanently.

Implement this as a clear state/flag or commission rule.

Do not calculate it based only on frontend state.

---

# 23. PASSENGER CONDUCT

After booking confirmation, display passenger rules:

- No loud music.
- No loud videos.
- Use earphones for personal audio.
- Respect other passengers.
- Follow driver safety instructions.

This should be shown during/after booking confirmation.

---

# 24. DRIVER AND PASSENGER DUAL ROLE

Every registered user can be:

- Passenger
- Driver

Do not create separate accounts for driver and passenger.

A passenger can later complete driver verification.

Driver capabilities should unlock only after verification.

---

# 25. DRIVER RIDE POSTING VALIDATION

A driver cannot post a ride unless:

- Account exists
- Mobile is verified
- Driver verification is approved
- At least one verified vehicle exists
- Vehicle belongs to that driver
- Selected vehicle is valid
- Vehicle has required photos
- Journey date is valid
- Journey time is valid
- Origin is valid
- Destination is valid
- Route is valid
- Pickup/drop points are valid
- ₹100 ride deposit is successfully processed

---

# 26. VEHICLE OWNERSHIP SECURITY

A driver must NEVER be able to:

- Select another driver's vehicle
- Post a ride using another driver's vehicle
- Modify another driver's vehicle
- Delete another driver's vehicle
- Change ownership through frontend manipulation

Always validate ownership on the backend.

Never trust vehicle IDs coming from the frontend.

---

# 27. BOOKING SECURITY

Prevent:

- Double seat booking
- Booking unavailable seat
- Booking after ride starts
- Booking after ride is full
- Invalid pickup/drop combination
- Booking outside route
- Duplicate active booking by same passenger where prohibited
- Manipulation of fare from frontend
- Manipulation of seat availability from frontend

All important business rules must be enforced server-side.

---

# 28. DATABASE REQUIREMENTS

Inspect the existing database first.

Only add missing models/fields/enums.

Potential entities include:

User
DriverProfile
Vehicle
VehiclePhoto
TrustedContact
Ride
RideRoutePoint
Booking
Seat
SeatAllocation
BootReservation
Payment
Transaction
RideDeposit
Rating
JourneyOTP
EmergencyEvent
PricingRule

Do NOT blindly create all of these if equivalent models already exist.

Reuse existing models whenever possible.

Add proper:

- Primary keys
- Foreign keys
- Unique constraints
- Indexes
- Enums
- Timestamps
- Status fields

Especially ensure:

**Vehicle.registrationNumber = UNIQUE**

---

# 29. ADMIN REQUIREMENTS

If an admin module already exists, extend it instead of creating another admin system.

Admin should be able to manage:

### Driver verification

- View applications
- View licence
- View profile
- Approve
- Reject

### Vehicles

- View vehicle
- View vehicle photos
- View owner
- Verification/status

### Rides

- View rides
- View route
- View vehicle
- View bookings
- View cancellation
- View deposit

### Pricing

Manage pricing configuration if the existing architecture supports admin-controlled pricing.

### Ratings

View low-rated drivers.

### Emergency events

Provide restricted access to emergency records where appropriate.

---

# 30. FRONTEND REQUIREMENTS

First inspect existing UI and follow its current design system.

Do NOT redesign the entire application.

Add missing screens/components only.

Required functionality may include:

### Passenger

- Registration
- OTP
- Trusted contacts
- Search rides
- Ride details
- Vehicle gallery
- Seat selection
- Boot reservation
- Fare breakdown
- Booking
- Booking confirmation
- Journey OTP
- Active ride
- Emergency button
- Ride history
- Rating

### Driver

- Driver verification
- Vehicle management
- Add vehicle
- Vehicle photo upload
- Ride creation
- Route/pickup/drop management
- Fare preview
- Deposit payment
- Ride management
- Passenger list
- OTP verification
- Earnings
- Ratings

---

# 31. FILE UPLOADS

If file/image upload already exists, reuse it.

Vehicle photos should be stored securely.

Validate:

- File type
- File size
- Required images
- Upload status

Do not store huge raw images directly in the database unless the existing architecture already does so intentionally.

---

# 32. API DESIGN

Before creating an endpoint:

Search the existing project for an equivalent endpoint.

Do not create duplicate APIs.

Follow the existing architecture.

For every new API:

- Validate authentication
- Validate authorization
- Validate input
- Validate ownership
- Validate business rules
- Return consistent errors
- Handle database failures
- Avoid leaking sensitive information

---

# 33. PAYMENT ARCHITECTURE

Inspect the existing payment implementation first.

If payment integration exists:

Reuse it.

If payment integration is incomplete:

Create a clean abstraction for:

- ₹100 driver deposit
- ₹50 passenger advance
- Refund
- Forfeiture
- Commission
- Driver amount

Never trust payment amount sent by frontend.

Calculate the amount on the backend.

---

# 34. BUSINESS RULE CENTRALIZATION

Create reusable services for important calculations.

For example:

PricingService
RouteService
SeatAllocationService
BookingService
CommissionService
DepositService
RatingService
JourneyVerificationService

Do not duplicate business logic in React components.

---

# 35. TRANSACTION SAFETY

Critical operations should use database transactions.

Especially:

### Booking

Check availability
→ Allocate seat
→ Allocate boot
→ Create booking
→ Create payment record

### Ride completion

Complete ride
→ Process deposit refund
→ Finalize commission

### Cancellation

Update booking
→ Apply cancellation rule
→ Update seat
→ Update boot
→ Process financial consequence

Prevent race conditions.

---

# 36. VALIDATION PRIORITY

Business rules must be enforced in this order:

Frontend validation
+
Backend validation
+
Database constraints where applicable

Frontend validation alone is NOT sufficient.

---

# 37. TESTING

After implementation, test all major flows.

## Passenger

- Register
- OTP
- Add 3 contacts
- Edit contacts
- Search ride
- Search intermediate route
- View vehicle
- Select seat
- Reserve boot
- Pay ₹50
- Cancel
- Journey OTP
- Emergency button
- Complete ride
- Rate driver

## Driver

- Register
- Verify
- Add vehicle
- Try duplicate vehicle number
- Add 4th vehicle
- Post ride
- Select vehicle
- Add pickup/drop points
- Invalid route
- Pay ₹100 deposit
- Accept passengers
- Verify journey OTP
- Complete ride
- Receive deposit refund
- Driver cancellation
- Check commission penalty after low rating

---

# 38. EDGE CASES

Explicitly test:

- Two drivers registering same vehicle number
- Driver trying to use another driver's vehicle
- More than 3 vehicles
- More than 5 pickup points
- More than 5 drop points
- Pickup after destination
- Reverse route
- Duplicate route point
- Off-route point
- Full ride
- Double seat booking
- Two female passengers
- Female passenger + male passenger
- Husband + wife
- MPV seating
- Trolley already reserved
- Passenger tries second trolley
- Passenger books after ride starts
- Driver cancels
- Passenger cancels
- Low driver rating
- Next ride commission
- OTP reuse
- Wrong OTP
- Emergency event
- Missing vehicle photos
- Unverified driver attempting ride posting

---

# 39. IMPORTANT DEVELOPMENT RULES

### Do NOT:

- Rewrite the entire project
- Replace the existing framework
- Replace the database
- Replace authentication
- Replace working APIs
- Duplicate existing components
- Duplicate existing models
- Hardcode fare values throughout the application
- Trust frontend fare values
- Trust frontend seat availability
- Trust frontend vehicle ownership
- Put secret API keys in frontend
- Remove existing functionality just to simplify implementation

### DO:

- Inspect first
- Reuse existing code
- Extend existing architecture
- Keep changes modular
- Add database migrations
- Add backend validation
- Add frontend validation
- Handle errors properly
- Preserve existing UI style
- Maintain responsive design
- Keep security in mind
- Test after every major feature

---

# 40. IMPLEMENTATION WORKFLOW

Follow this exact workflow:

### STEP 1
Inspect the entire repository.

### STEP 2
Identify existing implementations.

### STEP 3
Create a requirement-to-code mapping.

### STEP 4
Identify:

- Missing database fields
- Missing models
- Missing APIs
- Missing services
- Missing frontend pages
- Missing validations
- Missing business rules

### STEP 5
Implement database changes first.

### STEP 6
Implement backend services/business rules.

### STEP 7
Implement/update APIs.

### STEP 8
Implement frontend functionality.

### STEP 9
Connect frontend to backend.

### STEP 10
Run/build/test the project.

### STEP 11
Fix errors and regressions.

### STEP 12
Perform final requirement audit.

---

# 41. FINAL REPORT

After completing the implementation, provide a concise report:

## Already Existing

List features that were already implemented.

## Added

List newly implemented features.

## Modified

List existing features that required changes.

## Database Changes

List:

- New models
- New fields
- New enums
- New constraints
- New indexes

## Backend Changes

List:

- APIs
- Services
- Controllers
- Middleware
- Validations

## Frontend Changes

List:

- Pages
- Components
- Hooks
- UI changes

## Integrations

List:

- Google Maps
- OTP
- Payment
- Storage
- Notifications

## Remaining Limitations

Clearly identify anything that cannot be fully implemented because required external credentials/services/configuration are missing.

---

# MOST IMPORTANT

**Do not assume that everything listed above is missing.**

The existing CarPe project may already contain many of these features.

Your primary responsibility is to **inspect → compare → preserve → extend → test**.

Do not rebuild functionality that already works.

If an existing implementation is 80% complete, improve that implementation instead of creating a second 100% implementation beside it.

Keep the final codebase clean, modular, secure, maintainable, and production-ready.