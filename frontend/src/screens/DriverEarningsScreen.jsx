import { Wallet, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react'
import ScreenHeader from '../components/ScreenHeader'
import { CARPE_COMMISSION, PASSENGER_ADVANCE, DRIVER_DEPOSIT } from '../data/carpoolData'

export default function DriverEarningsScreen({ earnings, onBack }) {
  if (!earnings) return (
    <div className="flex min-h-full flex-col">
      <ScreenHeader title="My Earnings" onBack={onBack} />
      <div className="flex flex-1 items-center justify-center text-[#a29ca6] text-[12px]">No earnings data yet.</div>
    </div>
  )

  return (
    <div className="flex min-h-full flex-col">
      <ScreenHeader title="My Earnings" onBack={onBack} />

      <div className="flex-1 space-y-4 px-5 pb-6 pt-4">
        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-brand-purple/20 bg-gradient-to-br from-brand-lavender to-white p-3 text-center">
            <Wallet size={18} className="mx-auto text-brand-purple mb-1" />
            <p className="text-[20px] font-extrabold text-brand-purple">₹{earnings.totalEarnings}</p>
            <p className="text-[9px] text-[#77717b]">Total Earned</p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center">
            <TrendingUp size={18} className="mx-auto text-emerald-600 mb-1" />
            <p className="text-[20px] font-extrabold text-emerald-700">₹{earnings.totalAdvanceReceived}</p>
            <p className="text-[9px] text-[#77717b]">Advance Received</p>
          </div>
        </div>

        {/* Commission summary */}
        <div className="rounded-xl border border-brand-border bg-white p-3 text-[10px] space-y-1.5">
          <p className="text-[11px] font-bold text-[#312b35]">Platform Summary</p>
          <div className="flex justify-between text-[#554e5b]">
            <span>CarPe commission deducted</span>
            <span className="font-bold text-rose-600">-₹{earnings.totalCommissionDeducted}</span>
          </div>
          <div className="flex justify-between text-[#554e5b]">
            <span>Normal commission rate</span>
            <span>₹{CARPE_COMMISSION}/ride</span>
          </div>
          <div className="flex justify-between border-t border-brand-border pt-1.5 font-bold text-[#312b35]">
            <span>Net earnings (excl. advances)</span>
            <span className="text-emerald-700">₹{earnings.totalEarnings - earnings.totalCommissionDeducted}</span>
          </div>
        </div>

        {/* Per-ride breakdown */}
        <div>
          <p className="text-[11px] font-bold text-[#312b35] mb-2">Per Ride Breakdown</p>
          <div className="space-y-3">
            {earnings.rides.map((ride, i) => (
              <div key={i} className="rounded-xl border border-[#eee8f3] bg-white p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold text-[#312b35]">{ride.route}</p>
                  <span className="text-[9px] text-[#a29ca6]">{ride.date}</span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[10px] text-[#554e5b]">
                  <div>Passengers: <strong>{ride.passengers}</strong></div>
                  <div>Fare earned: <strong className="text-brand-purple">₹{ride.earnings}</strong></div>
                  <div>Advance received: <strong className="text-emerald-700">₹{ride.advance}</strong></div>
                  <div>Commission: <strong className="text-rose-600">-₹{ride.commission}</strong></div>
                </div>
                <div className={`flex items-center gap-1.5 rounded-lg px-2 py-1 text-[9px] font-bold ${ride.depositRefunded ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'}`}>
                  {ride.depositRefunded
                    ? <><CheckCircle2 size={11} /> ₹{DRIVER_DEPOSIT} deposit refunded</>
                    : <><AlertCircle size={11} /> ₹{DRIVER_DEPOSIT} deposit forfeited</>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How earnings work */}
        <div className="rounded-xl border border-brand-border bg-white p-3.5 text-[10px] text-[#554e5b] space-y-1.5">
          <p className="text-[11px] font-bold text-[#312b35]">How Earnings Work</p>
          <p>• Passenger pays <strong>₹50 advance</strong> at booking.</p>
          <p>• You receive <strong>₹40</strong> from each advance (₹10 goes to CarPe).</p>
          <p>• Remaining fare is paid by passenger directly to you at pickup.</p>
          <p>• Your <strong>₹{DRIVER_DEPOSIT} deposit</strong> is refunded on ride completion.</p>
          <p>• Low driver rating (≤3 stars) raises next-ride commission to ₹20.</p>
        </div>
      </div>
    </div>
  )
}
