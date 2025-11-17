import { useState } from 'react'

export default function Header({ currentRole, onRoleChange }) {
  const roles = ['super_admin', 'admin', 'farmer', 'feeder', 'tester']
  const [role, setRole] = useState(currentRole || 'super_admin')

  return (
    <header className="w-full bg-white/80 backdrop-blur sticky top-0 z-40 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold">India Agro Tech</div>
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Simulate Role:</label>
          <select
            value={role}
            onChange={(e) => { setRole(e.target.value); onRoleChange?.(e.target.value) }}
            className="border rounded px-3 py-1 text-sm"
          >
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>
    </header>
  )
}
