import { useState } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard'

function App() {
  const [role, setRole] = useState('super_admin')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
      <Header currentRole={role} onRoleChange={setRole} />
      <main className="py-6">
        <Dashboard role={role} />
      </main>
    </div>
  )
}

export default App
