import React, { useEffect, useState } from 'react'
import { fetchAllUsers } from './api'
import UserTable from './components/UserTable'
import Spinner from './components/Spinner'

export default function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)

    fetchAllUsers()
      .then((data) => {
        if (!mounted) return
        setUsers(data)
        setError(null)
      })
      .catch((err) => {
        if (!mounted) return
        setError(err.message || 'Failed to fetch users')
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '700', color: 'white', marginBottom: '8px', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>👥 User Directory</h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>Manage and explore user profiles</p>
        </div>

        {/* Main Content Card */}
        <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          {loading ? (
            <Spinner />
          ) : error ? (
            <div style={{ color: '#dc2626', padding: '20px', border: '2px solid #fca5a5', backgroundColor: '#fef2f2', borderRadius: '12px', textAlign: 'center' }}>
              <strong style={{ fontSize: '18px' }}>⚠️ Error:</strong>
              <p style={{ marginTop: '8px' }}>{error}</p>
            </div>
          ) : (
            <UserTable users={users} loading={loading} />
          )}
        </div>

        {/* Footer */}
        <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '16px', color: 'white', fontWeight: '500' }}>
          Made with ❤️ by <span style={{ fontWeight: '700', fontSize: '18px' }}>Vikas</span>
        </div>
      </div>
    </div>
  )
}

/* Original code - will restore after test
export default function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    console.log('App mounted, fetching users...')

    fetchAllUsers()
      .then((data) => {
        if (!mounted) return
        console.log('Users fetched:', data)
        setUsers(data)
        setError(null)
      })
      .catch((err) => {
        if (!mounted) return
        console.error('Error fetching users:', err)
        setError(err.message || 'Failed to fetch users')
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container-max mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-4">User Directory</h1>
        
        {console.log('Render state:', { loading, error, usersCount: users.length })}

        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="text-red-600 p-4 border border-red-300 bg-red-50 rounded">
            <strong>Error:</strong> {error}
          </div>
        ) : (
          <UserTable users={users} loading={loading} />
        )}

        <div className="mt-6 text-sm text-gray-500">
          Data from{' '}
          <a
            className="underline"
            href="https://reqres.in/api/users"
            target="_blank"
            rel="noreferrer"
          >
            reqres.in
          </a>
        </div>
      </div>
    </div>
  )
}
*/