import { LockKeyhole, ShieldCheck, UserRound } from 'lucide-react'
import { useState } from 'react'
import RegistrationLayout from '../components/RegistrationLayout'

export default function AdminLoginScreen({ onBack, onAdminLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = () => {
    if (!onAdminLogin(username, password)) setError('Use the demo credentials shown below.')
  }

  return (
    <RegistrationLayout title="Admin sign in" subtitle="Secure access to the CarPe administration panel." showProgress={false} onBack={onBack} actionLabel="Sign in" onAction={submit} actionHint={error} className="auth-panel auth-panel--admin">
      <div className="auth-panel__hero">
        <span className="auth-panel__icon"><ShieldCheck aria-hidden="true" size={35} /></span>
        <h2>Administration</h2>
        <p>Sign in to manage the CarPe platform.</p>
      </div>
      <div className="auth-panel__card">
        <label htmlFor="admin-user" className="registration-field-label registration-field-label--left">Username</label>
        <div className="auth-panel__input-with-icon"><UserRound aria-hidden="true" size={20} /><input id="admin-user" value={username} onChange={(event) => { setUsername(event.target.value); setError('') }} autoComplete="username" placeholder="Enter username" /></div>
        <label htmlFor="admin-password" className="registration-field-label registration-field-label--left auth-panel__password-label">Password</label>
        <div className="auth-panel__input-with-icon"><LockKeyhole aria-hidden="true" size={20} /><input id="admin-password" type="password" value={password} onChange={(event) => { setPassword(event.target.value); setError('') }} autoComplete="current-password" placeholder="Enter password" /></div>
        <p className="auth-panel__demo"><strong>Demo credentials</strong><br />Username: <code>admin</code><br />Password: <code>admin123</code></p>
      </div>
    </RegistrationLayout>
  )
}
