import { useState } from 'react'
import { CheckCircle2, X, FileText, Users, Car } from 'lucide-react'
import ScreenHeader from '../components/ScreenHeader'
import PrimaryButton from '../components/PrimaryButton'
import BarChart, { Sparkline } from '../components/MiniChart'
import { MOCK_RIDES, MOCK_DRIVER_VEHICLES, MOCK_DRIVER_RIDES } from '../data/carpoolData'

export default function AdminDashboard() {
  const [section, setSection] = useState('overview')
  const [rides, setRides] = useState(MOCK_RIDES)
  const [vehicles, setVehicles] = useState(MOCK_DRIVER_VEHICLES)
  const [driverRides] = useState(MOCK_DRIVER_RIDES)

  const approveVehicle = (id) => {
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, verificationStatus: 'VERIFIED' } : v))
  }

  const rejectVehicle = (id) => {
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, verificationStatus: 'REJECTED' } : v))
  }

  return (
    <div className="flex min-h-full flex-col">
      <ScreenHeader title="Admin Panel" onBack={() => {}} />

      <div className="flex-1 space-y-4 px-5 pb-6 pt-4">
        <div className="flex gap-2 mb-2">
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'riders', label: 'Riders' },
            { key: 'offers', label: 'Offers' },
            { key: 'customers', label: 'Customers' },
            { key: 'dashboards', label: 'Dashboards' },
          ].map(tab => (
            <button key={tab.key} onClick={() => setSection(tab.key)}
              className={`rounded-full px-3 py-1 text-[11px] font-semibold ${section === tab.key ? 'bg-brand-purple text-white' : 'bg-white border border-brand-border text-[#6e6872]'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {section === 'overview' && (
          <div className="rounded-xl border border-brand-border bg-white p-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><FileText /><h3 className="text-[13px] font-bold">Overview</h3></div>
              <div className="text-[11px] text-[#6e6872]">Rides: {rides.length} · Vehicles: {vehicles.length} · Driver Rides: {driverRides.length}</div>
            </div>
          </div>
        )}

        {section === 'riders' && (
          <section className="rounded-xl border border-brand-border bg-white p-3.5">
            <h4 className="text-[12px] font-bold mb-2">Riders</h4>
            <div className="space-y-2">
              {rides.map(r => (
                <div key={r.id} className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <div className="text-[11px] font-bold">{r.origin} → {r.destination}</div>
                    <div className="text-[9px] text-[#6e6872]">{r.date} · {r.time}</div>
                  </div>
                  <div className="text-[10px]">Seats left: {r.seatsAvailable}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {section === 'offers' && (
          <section className="rounded-xl border border-brand-border bg-white p-3.5">
            <h4 className="text-[12px] font-bold mb-2">Offers</h4>
            <div className="space-y-2">
              {rides.slice(0,5).map(r => (
                <div key={r.id} className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <div className="text-[11px] font-bold">{r.driverName} — {r.origin} → {r.destination}</div>
                    <div className="text-[9px] text-[#6e6872]">{r.date} · {r.time}</div>
                  </div>
                  <div className="text-[10px]">Price: ₹{r.pricePerSeat}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {section === 'customers' && (
          <section className="rounded-xl border border-brand-border bg-white p-3.5">
            <h4 className="text-[12px] font-bold mb-2">Customers / Bookings</h4>
            <div className="space-y-2">
              {driverRides.flatMap(d => d.passengers).map((p, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <div className="text-[11px] font-bold">{p.name}</div>
                    <div className="text-[9px] text-[#6e6872]">Pickup: {p.pickup} · Drop: {p.drop}</div>
                  </div>
                  <div className="text-[10px]">Seat: {p.seat}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {section === 'dashboards' && (
          <section className="rounded-xl border border-brand-border bg-white p-3.5">
            <h4 className="text-[12px] font-bold mb-2">Dashboards</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border p-3 text-[11px]">Total Rides: <strong>{rides.length}</strong></div>
                <div className="rounded-xl border p-3 text-[11px]">Vehicles: <strong>{vehicles.length}</strong></div>
                <div className="rounded-xl border p-3 text-[11px]">Active Bookings: <strong>{driverRides.reduce((s,d)=>s+d.passengers.length,0)}</strong></div>
                <div className="rounded-xl border p-3 text-[11px]">Commission Collected: <strong>₹{driverRides.reduce((s,d)=>s + (d.commission||0),0)}</strong></div>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3">
                <div className="rounded-xl border p-3 bg-white w-full">
                  <h5 className="text-[11px] font-bold mb-2">Rides by Date</h5>
                  {(() => {
                    const counts = {}
                    rides.forEach(r => { counts[r.date] = (counts[r.date] || 0) + 1 })
                    const labels = Object.keys(counts).slice(-7)
                    const data = labels.map(d => counts[d])
                    return <div className="w-full"><BarChart data={data} labels={labels.map(l => l.slice(5))} vbWidth={360} vbHeight={88} /></div>
                  })()}
                </div>

                <div className="rounded-xl border p-3 bg-white w-full">
                  <h5 className="text-[11px] font-bold mb-2">Commission Trend (recent)</h5>
                  {(() => {
                    const data = driverRides.map(d => d.commission || 0)
                    return <div className="w-full"><Sparkline data={data} vbWidth={360} vbHeight={60} stroke="#5b16a6" /></div>
                  })()}
                </div>
              </div>
          </section>
        )}

      </div>
    </div>
  )
}
