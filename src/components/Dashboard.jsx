import { useEffect, useState } from 'react'
import { apiGet, apiPost } from './api'

export default function Dashboard({ role }) {
  const [plants, setPlants] = useState([])
  const [users, setUsers] = useState([])
  const [duties, setDuties] = useState([])
  const [plantName, setPlantName] = useState('India Agro Tech Plant')
  const [plantLocation, setPlantLocation] = useState('')

  useEffect(() => {
    load()
  }, [role])

  async function load() {
    try {
      const d = await apiGet('/duties' + (role ? `?role=${role}` : ''))
      setDuties(d)
      if (role === 'super_admin' || role === 'admin') {
        const p = await apiGet('/plants', { role })
        setPlants(p)
        const u = await apiGet('/users', { role })
        setUsers(u)
      }
    } catch (e) {
      console.error(e)
    }
  }

  async function createPlant() {
    try {
      const res = await apiPost('/plants', { name: plantName, location: plantLocation }, { role: 'super_admin' })
      await load()
      alert('Plant created: ' + res.id)
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <section className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Your Role</h2>
        <p className="text-gray-700">You are signed in as: <span className="font-medium">{role}</span></p>
      </section>

      <section className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Duties</h3>
        <ul className="list-disc pl-6 text-gray-700">
          {duties.map((d, i) => (
            <li key={i}><span className="font-medium">{d.title}</span> — {d.description}</li>
          ))}
        </ul>
      </section>

      {(role === 'super_admin') && (
        <section className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Plants</h3>
          <div className="flex gap-2 mb-3">
            <input className="border rounded px-3 py-2 flex-1" placeholder="Plant name" value={plantName} onChange={(e)=>setPlantName(e.target.value)} />
            <input className="border rounded px-3 py-2 flex-1" placeholder="Location" value={plantLocation} onChange={(e)=>setPlantLocation(e.target.value)} />
            <button onClick={createPlant} className="bg-blue-600 text-white px-4 py-2 rounded">Create Plant</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">Name</th>
                  <th className="py-2">Location</th>
                  <th className="py-2">Code</th>
                </tr>
              </thead>
              <tbody>
                {plants.map((p, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-2">{p.name}</td>
                    <td className="py-2">{p.location || '-'}</td>
                    <td className="py-2">{p.code || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {(role === 'super_admin' || role === 'admin') && (
        <section className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Users</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Role</th>
                  <th className="py-2">Plant</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-2">{u.full_name}</td>
                    <td className="py-2">{u.email}</td>
                    <td className="py-2">{u.role}</td>
                    <td className="py-2">{u.plant_id || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  )
}
