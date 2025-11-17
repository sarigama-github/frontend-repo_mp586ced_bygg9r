const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export async function apiGet(path, { role, plantId, userId } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(role ? { 'x-role': role } : {}),
      ...(plantId ? { 'x-plant-id': plantId } : {}),
      ...(userId ? { 'x-user-id': userId } : {}),
    },
  })
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`)
  return res.json()
}

export async function apiPost(path, body, { role, plantId, userId } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(role ? { 'x-role': role } : {}),
      ...(plantId ? { 'x-plant-id': plantId } : {}),
      ...(userId ? { 'x-user-id': userId } : {}),
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`)
  return res.json()
}

export { BASE_URL }
